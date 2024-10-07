import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings, LogOut, User, Menu, ChevronDown } from 'lucide-react';

const mainNavItems = [
  { path: '/learning', label: 'Learning' },
  { path: '/mentorship', label: 'Mentorship' },
  { path: '/funding', label: 'Funding' },
  { path: '/projects', label: 'Projects' },
];

const dropdownNavItems = [
  { path: '/my-projects', label: 'My Projects' },
  { path: '/resource-center', label: 'Resource Center' },
  { path: '/community-forum', label: 'Community Forum' },
];

const NavItem = ({ path, label, currentPath, onClick }) => (
  <li>
    <Link
      to={path}
      className={`block hover:text-blue-200 transition-colors duration-200 py-2 px-3 rounded-md ${
        currentPath === path ? 'bg-blue-700 text-white' : ''
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  </li>
);

const UserMenu = ({ user, onLogout, onProfileEdit }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-10 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-200">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            <User className="h-5 w-5 text-blue-500" />
          </AvatarFallback>
        </Avatar>
        <span className="hidden md:inline text-sm font-medium">{user.name}</span>
        <ChevronDown className="h-4 w-4 text-blue-200" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuItem onClick={onProfileEdit} className="cursor-pointer hover:bg-blue-50">
        <Settings className="mr-2 h-4 w-4" />
        <span>Edit Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onLogout} className="cursor-pointer hover:bg-blue-50">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold hover:text-blue-200 transition-colors duration-200">Safari Innovators Hub</Link>
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <nav>
                <ul className="flex space-x-2 items-center">
                  {mainNavItems.map((item) => (
                    <NavItem key={item.path} {...item} currentPath={location.pathname} />
                  ))}
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="hover:bg-blue-700 transition-colors duration-200">
                          More <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {dropdownNavItems.map((item) => (
                          <DropdownMenuItem key={item.path} asChild>
                            <Link to={item.path} className="w-full">
                              {item.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                </ul>
              </nav>
            )}
            {user ? (
              <UserMenu 
                user={user} 
                onLogout={handleLogout} 
                onProfileEdit={() => navigate('/profile-edit')} 
              />
            ) : (
              <Link to="/login" className="hover:text-blue-200 transition-colors duration-200">Login</Link>
            )}
          </div>
          <Button
            variant="ghost"
            className="md:hidden hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white">
          <nav className="container mx-auto py-4">
            <ul className="space-y-2">
              {mainNavItems.concat(dropdownNavItems).map((item) => (
                <NavItem 
                  key={item.path} 
                  {...item} 
                  currentPath={location.pathname} 
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
              {user && (
                <li className="py-2">
                  <UserMenu 
                    user={user} 
                    onLogout={handleLogout} 
                    onProfileEdit={() => {
                      navigate('/profile-edit');
                      setIsMenuOpen(false);
                    }} 
                  />
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          © 2024 Safari Innovators Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
