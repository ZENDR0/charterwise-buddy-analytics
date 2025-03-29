
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  FileSearch, 
  Users, 
  Calculator, 
  CalendarClock,
  ChartBar,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/taxes', label: 'Taxes', icon: <FileText size={20} /> },
    { path: '/audit', label: 'Audit & Assurance', icon: <FileSearch size={20} /> },
    { path: '/compliance', label: 'Compliance', icon: <Users size={20} /> },
    { path: '/costing', label: 'Costing', icon: <Calculator size={20} /> },
    { path: '/budgeting', label: 'Budgeting', icon: <CalendarClock size={20} /> },
    { path: '/reports', label: 'Reports', icon: <ChartBar size={20} /> },
  ];

  return (
    <aside className="sticky w-64 shrink-0 border-r bg-card h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex flex-col gap-2 p-4">
        <div className="mb-4">
          <h2 className="px-4 text-lg font-semibold tracking-tight">Navigation</h2>
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item, index) => (
            <NavLink 
              key={index} 
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-accent/50 hover:text-accent-foreground'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto">
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                isActive 
                  ? 'bg-accent text-accent-foreground' 
                  : 'hover:bg-accent/50 hover:text-accent-foreground'
              }`
            }
          >
            <Settings size={20} />
            Settings
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
