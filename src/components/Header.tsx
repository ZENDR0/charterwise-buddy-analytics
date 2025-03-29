
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            <Link to="/">CharterWise</Link>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
