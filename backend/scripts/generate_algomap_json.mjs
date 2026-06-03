import fs from 'fs';
import path from 'path';
import vm from 'vm';

const inputPath = path.resolve('backend/scripts/algomap_sectionQuestions.js');
const outputPath = path.resolve('src/data/algomap100.json');

const src = fs.readFileSync(inputPath, 'utf8');
const startIndex = src.indexOf('window.sectionQuestions =');
const endIndex = src.indexOf('window.sectionPrerequisites =');
if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate sectionQuestions block in source file.');
  process.exit(1);
}

const block = src.slice(startIndex, endIndex);
const code = block.replace('window.sectionQuestions =', 'var data =');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const sectionQuestions = sandbox.data;

const items = [];
let globalIndex = 1;
for (const [category, questions] of Object.entries(sectionQuestions)) {
  for (let i = 0; i < questions.length; i += 1) {
    const q = questions[i];
    const title = q.name;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    const id = `am100-${q.leetcodeId || (globalIndex + '').padStart(3, '0')}`;
    items.push({
      id,
      title,
      slug,
      url: q.code || `https://leetcode.com/problems/${slug}/`,
      difficulty: q.difficulty || 'Medium',
      topics: [category],
      companies: [],
      listMeta: {
        originalIndex: globalIndex,
        module: category,
      },
    });
    globalIndex += 1;
  }
}

fs.writeFileSync(outputPath, JSON.stringify(items, null, 2) + '\n', 'utf8');
console.log('Wrote', items.length, 'items to', outputPath);
