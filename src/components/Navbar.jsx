import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme } = useTheme();
  
  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-brand">Employee Management</div>
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;