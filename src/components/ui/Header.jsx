import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice.js';
import { FcAbout } from "react-icons/fc";
import { AiFillMedicineBox } from "react-icons/ai";


const Header = ({ isCollapsed = false }) => {

  const dispatch = useDispatch();

  const loggedUser = useSelector(state => state.user.loggedUser);

   
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { name: 'Home', path: '/home', icon: 'LayoutDashboard' },
    { name: 'Appointments', path: '/appointment-management', icon: 'Calendar' },
    { name: 'Health Records', path: '/health-records', icon: 'FileText' },
    // { name: 'Teleconsultation', path: '/teleconsultation-suite', icon: 'Video' },
    // { name: 'Analytics', path: '/analytics-reportingAbout', icon: 'BarChart3' },
       { name: 'Medicine', path: '/medicines', icon: <AiFillMedicineBox /> },
    { name: 'Symptoms', path: '/symptoms-section', icon: 'Activity' },
    { name: 'About us', path: '/', icon: <FcAbout size={20} /> },
   
  ];

  const secondaryNavItems = [
   
    
    // { name: 'Patient Care', path: '/patient-care-ecosystem', icon: 'Users' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleMoreMenu = () => setIsMoreMenuOpen(!isMoreMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 healthcare-shadow">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-brand-primary to-secondary rounded-lg">
              <Icon name="Heart" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-text-primary">Arogya</span>
              <span className="text-xs text-text-secondary font-medium">Mitra</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium healthcare-transition ${isActivePath(item?.path)
                ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.name}</span>
            </Link>
          ))}

          {/* More Menu */}
          {/* <div className="relative">
            <Button
              variant="ghost"
              onClick={toggleMoreMenu}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${secondaryNavItems?.some(item => isActivePath(item?.path))
                ? 'bg-muted text-text-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              <Icon name="MoreHorizontal" size={18} />
              <span>More</span>
            </Button>

            {isMoreMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg healthcare-shadow-lg z-50">
                {secondaryNavItems?.map((item) => (
                  <a
                    key={item?.path}
                    href={item?.path}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium healthcare-transition first:rounded-t-lg last:rounded-b-lg ${isActivePath(item?.path)
                      ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div> */}
            
           

        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
           <button 
            onClick={() => dispatch(logout())}
            className='hidden sm:block sm:bg-red-500 sm:rounded-md sm:px-6 sm:py-2 sm:text-slate-800 hover:bg-red-700 transition-all duration-100 hover:text-white active:scale-75 hover:shadow-lg'>Logout</button>
          {/* Notifications */}
          <Button variant="ghost" className="relative p-2">
            <Icon name="Bell" size={20} color="var(--color-text-secondary)" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse-slow"></span>
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-secondary to-success rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-medium text-text-primary">{loggedUser.user.role === "Doctor" ? `Dr.${loggedUser.user.name}` : loggedUser.user.name}</span>
              <span className="text-xs text-text-secondary capitalize">{loggedUser.user.role}</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            onClick={toggleMobileMenu}
            className="lg:hidden p-2"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200">
          <nav className="px-6 py-4 space-y-2">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium healthcare-transition ${isActivePath(item?.path)
                  ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            <button
              onClick={() => dispatch(logout())}
              className='block sm:hidden bg-red-500 rounded-md px-4 py-1 text-sm text-slate-900 hover:bg-red-700 transition-all duration-100 hover:text-white active:scale-75 hover:shadow-lg'>Logout</button>
          </nav>
        </div>
      )}
      {/* Overlay for More Menu */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;