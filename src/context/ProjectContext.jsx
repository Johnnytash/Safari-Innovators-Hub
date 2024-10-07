import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    if (!user) return;
    const newProject = { 
      ...project, 
      userId: user.id, 
      lastUpdated: new Date().toISOString(),
      progress: 0
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (updatedProject) => {
    if (!user) return;
    setProjects(projects.map(p => 
      p.id === updatedProject.id 
        ? { ...updatedProject, userId: user.id, lastUpdated: new Date().toISOString() } 
        : p
    ));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const getUserProjects = () => {
    if (!user) return [];
    return projects.filter(project => project.userId === user.id);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, getUserProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);