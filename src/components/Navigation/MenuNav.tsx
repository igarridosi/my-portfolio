import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
];

const MenuNav = () => {
  return (
    <div className="flex items-center justify-center h-12 bg-gray-100 border-b-2 border-gray-800 px-2 gap-2 overflow-x-auto no-scrollbar">
      {navItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            `px-3 py-1 text-xs sm:text-sm font-medium border border-gray-800 whitespace-nowrap transition-colors duration-150 font-mono
            ${isActive
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default MenuNav;
