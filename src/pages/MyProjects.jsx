import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const MyProjects = () => {
  const { getUserProjects, addProject, updateProject, deleteProject } = useProjects();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    if (user) {
      const projects = getUserProjects();
      setUserProjects(projects);
    }
  }, [user, getUserProjects]);

  const openModal = (project = null) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentProject(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProject = {
      id: currentProject ? currentProject.id : Date.now(),
      title: formData.get('title'),
      description: formData.get('description'),
      link: formData.get('link'),
      stage: formData.get('stage'),
      fundingNeeded: formData.get('fundingNeeded'),
      tags: formData.get('tags').split(',').map(tag => tag.trim()),
      image: formData.get('image') ? URL.createObjectURL(formData.get('image')) : (currentProject?.image || '/placeholder.svg'),
      userId: user.id,
    };

    if (currentProject) {
      updateProject(newProject);
    } else {
      addProject(newProject);
    }
    closeModal();
    // Refresh the user's projects after adding or updating
    setUserProjects(getUserProjects());
  };

  const openDeleteDialog = (project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
      // Refresh the user's projects after deleting
      setUserProjects(getUserProjects());
    }
  };

  if (!user) {
    return <div>Please log in to view your projects.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      <Button onClick={() => openModal()} className="mb-6">Add New Project</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProjects.map(project => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">{project.description}</p>
              <p className="text-sm">Stage: {project.stage}</p>
              <p className="text-sm">Funding Needed: KSh {project.fundingNeeded}</p>
              {project.link && (
                <p className="text-sm mt-2">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Project Link
                  </a>
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{tag}</span>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button onClick={() => openModal(project)}>Edit</Button>
                <Button variant="destructive" onClick={() => openDeleteDialog(project)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input name="title" placeholder="Project Title" defaultValue={currentProject?.title} required />
              <Textarea name="description" placeholder="Project Description" defaultValue={currentProject?.description} required />
              <Input name="link" placeholder="Project Link" defaultValue={currentProject?.link} />
              <Select name="stage" defaultValue={currentProject?.stage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="prototype">Prototype</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                </SelectContent>
              </Select>
              <Input name="fundingNeeded" placeholder="Funding Needed (KSh)" defaultValue={currentProject?.fundingNeeded} />
              <Input name="tags" placeholder="Tags (comma-separated)" defaultValue={currentProject?.tags?.join(', ')} />
              <Input name="image" type="file" accept="image/*" />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyProjects;