import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ContentDetail from './pages/ContentDetail';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function AuthHandler() {
  const location = useLocation();
  const { login } = React.useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      login(token, {});
      window.history.replaceState({}, document.title, '/');
    }
  }, [location, login]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthHandler />
        <div className="min-h-screen bg-dark flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/content/:id" element={<ContentDetail />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;