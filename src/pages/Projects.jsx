import React, { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProjects } from '../context/ProjectContext';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, Grid, List } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = useProjects();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [filterBy, setFilterBy] = useState('all');

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const filteredAndSortedProjects = useMemo(() => {
    return projects
      .filter(project => 
        (filterBy === 'all' || project.stage === filterBy) &&
        (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         project.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'lastUpdated':
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
          case 'fundingNeeded':
            return b.fundingNeeded - a.fundingNeeded;
          case 'title':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [projects, searchTerm, sortBy, filterBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Projects</h1>
      
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          icon={<Search className="h-4 w-4" />}
        />
        
        <Select onValueChange={setSortBy} defaultValue="lastUpdated">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastUpdated">Last Updated</SelectItem>
            <SelectItem value="fundingNeeded">Funding Needed</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={setFilterBy} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="idea">Idea</SelectItem>
            <SelectItem value="prototype">Prototype</SelectItem>
            <SelectItem value="mvp">MVP</SelectItem>
            <SelectItem value="growth">Growth</SelectItem>
          </SelectContent>
        </Select>
        
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredAndSortedProjects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onLearnMore={() => openProjectModal(project)}
            viewMode={viewMode}
          />
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img src={selectedProject?.image} alt={selectedProject?.title} className="w-full h-48 object-cover mb-4 rounded" />
            <p className="mb-2"><strong>Stage:</strong> {selectedProject?.stage}</p>
            <p className="mb-2"><strong>Funding Needed:</strong> KSh {selectedProject?.fundingNeeded}</p>
            <p className="mb-2"><strong>Last Updated:</strong> {new Date(selectedProject?.lastUpdated).toLocaleDateString()}</p>
            <p className="mb-4">{selectedProject?.description}</p>
            <div className="mb-4">
              <strong>Tags:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedProject?.tags && selectedProject.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            {selectedProject?.link && (
              <Button variant="outline" className="w-full" asChild>
                <a href={selectedProject?.link} target="_blank" rel="noopener noreferrer">Visit Project Website</a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;