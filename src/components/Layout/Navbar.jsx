import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Package, BookOpen, Gift, User, LogOut, Leaf } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: '/home', icon: Home, label: 'Inicio' },
    { path: '/map', icon: Map, label: 'Mapa' },
    { path: '/pickup', icon: Package, label: 'Recojo' },
    { path: '/learn', icon: BookOpen, label: 'Aprende' },
    { path: '/rewards', icon: Gift, label: 'Recompensas' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  return (
    <>
      <nav className="navbar-desktop">
        <div className="navbar-container">
          <Link to="/home" className="navbar-brand">
            <div className="brand-icon">
              <Leaf size={28} />
            </div>
            <span className="brand-text">EcoRecicla</span>
          </Link>

          <div className="navbar-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <button onClick={handleSignOut} className="btn-logout">
            <LogOut size={20} />
            <span>Salir</span>
          </button>
        </div>
      </nav>

      <nav className="navbar-mobile">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link-mobile ${isActive ? 'active' : ''}`}
            >
              <Icon size={24} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
