import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, MapPin, Package, TrendingUp, Award, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import './Home.css';

const Home = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalPickups: 0,
    pendingPickups: 0,
    nearbyPoints: 3
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (profile) {
      loadStats();
      loadNotifications();
    }
  }, [profile]);

  const loadStats = async () => {
    try {
      const { data: pickups } = await supabase
        .from('pickups')
        .select('*')
        .eq('user_id', profile.id);

      setStats({
        totalPickups: pickups?.length || 0,
        pendingPickups: pickups?.filter(p => p.status === 'pending').length || 0,
        nearbyPoints: 3
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', profile.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(3);

      setNotifications(data || []);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const getEcoLevelInfo = (level) => {
    const levels = {
      beginner: { icon: '🌱', label: 'Principiante', color: '#86efac' },
      advanced: { icon: '🌿', label: 'Avanzado', color: '#22c55e' },
      leader: { icon: '🌳', label: 'Líder Verde', color: '#16a34a' }
    };
    return levels[level] || levels.beginner;
  };

  const levelInfo = getEcoLevelInfo(profile?.eco_level);

  return (
    <div className="home-page">
      <div className="home-header">
        <motion.div
          className="welcome-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="welcome-content">
            <h1>¡Hola, {profile?.full_name?.split(' ')[0]}! 👋</h1>
            <p>Recicla hoy, cuida el mañana</p>
          </div>
          <div className="eco-badge" style={{ background: levelInfo.color }}>
            <span className="eco-icon">{levelInfo.icon}</span>
            <span className="eco-label">{levelInfo.label}</span>
          </div>
        </motion.div>
      </div>

      <div className="stats-grid">
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            <TrendingUp size={28} color="#22c55e" />
          </div>
          <div className="stat-content">
            <h3>{profile?.total_points || 0}</h3>
            <p>Puntos Acumulados</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon" style={{ background: 'rgba(249, 115, 22, 0.1)' }}>
            <Package size={28} color="#f97316" />
          </div>
          <div className="stat-content">
            <h3>{stats.totalPickups}</h3>
            <p>Recojos Totales</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            <Leaf size={28} color="#22c55e" />
          </div>
          <div className="stat-content">
            <h3>{profile?.total_recycled_kg?.toFixed(1) || '0.0'} kg</h3>
            <p>Material Reciclado</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
            <MapPin size={28} color="#3b82f6" />
          </div>
          <div className="stat-content">
            <h3>{stats.nearbyPoints}</h3>
            <p>Puntos Cercanos</p>
          </div>
        </motion.div>
      </div>

      <div className="action-cards">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/map" className="action-card action-primary">
            <div className="action-icon">
              <MapPin size={32} />
            </div>
            <div className="action-content">
              <h3>Encuentra Puntos de Reciclaje</h3>
              <p>Descubre centros cercanos en el mapa interactivo</p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/pickup" className="action-card action-secondary">
            <div className="action-icon">
              <Package size={32} />
            </div>
            <div className="action-content">
              <h3>Solicitar Recojo a Domicilio</h3>
              <p>Programa la recolección de tus materiales</p>
            </div>
          </Link>
        </motion.div>
      </div>

      {notifications.length > 0 && (
        <motion.div
          className="notifications-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="section-header">
            <Bell size={24} color="#22c55e" />
            <h2>Notificaciones Recientes</h2>
          </div>
          <div className="notifications-list">
            {notifications.map((notif) => (
              <div key={notif.id} className="notification-item">
                <div className="notif-dot"></div>
                <div className="notif-content">
                  <h4>{notif.title}</h4>
                  <p>{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        className="impact-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Award className="impact-icon" size={32} />
        <div className="impact-content">
          <h3>Tu Impacto Ambiental</h3>
          <p>
            Has contribuido al medio ambiente reciclando{' '}
            <strong>{profile?.total_recycled_kg?.toFixed(1) || '0'} kg</strong> de materiales.
            ¡Sigue así!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
