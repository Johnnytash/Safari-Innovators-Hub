import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Learning from './pages/Learning';
import Mentorship from './pages/Mentorship';
import Funding from './pages/Funding';
import Projects from './pages/Projects';
import MyProjects from './pages/MyProjects';
import ResourceCenter from './pages/ResourceCenter';
import CommunityForum from './pages/CommunityForum';
import Events from './pages/Events';
import Challenges from './pages/Challenges';
import ProfileEdit from './components/ProfileEdit';
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const RouteTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('lastRoute', location.pathname);
  }, [location]);

  useEffect(() => {
    const lastRoute = localStorage.getItem('lastRoute');
    if (lastRoute) {
      navigate(lastRoute);
    }
  }, []);

  return null;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProjectProvider>
          <Router>
            <RouteTracker />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/mentorship" element={<Mentorship />} />
                <Route path="/funding" element={<Funding />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/resource-center" element={<ResourceCenter />} />
                <Route path="/community-forum" element={<CommunityForum />} />
                <Route path="/events" element={<Events />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/profile-edit" element={<ProfileEdit />} />
              </Routes>
            </Layout>
          </Router>
          <Toaster />
        </ProjectProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;