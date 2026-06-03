import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DSARevisionTracker, Patterns, InterviewRoadmap, Login, SignUp } from "./pages";
import { Navbar } from "./components";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DSARevisionTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patterns"
              element={
                <ProtectedRoute>
                  <Patterns />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmap"
              element={
                <ProtectedRoute>
                  <InterviewRoadmap />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
