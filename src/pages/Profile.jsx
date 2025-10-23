import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, CreditCard, MapPin, TrendingUp, Award, Package, Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import './Profile.css';

const Profile = () => {
  const { profile } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [stats, setStats] = useState({
    totalPickups: 0,
    completedPickups: 0,
    carbonSaved: 0,
    waterSaved: 0
  });

  useEffect(() => {
    if (profile) {
      loadAchievements();
      loadUserAchievements();
      loadStats();
    }
  }, [profile]);

  const loadAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('points_required', { ascending: true });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  };

  const loadUserAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', profile.id);

      if (error) throw error;
      setUserAchievements(data?.map(a => a.achievement_id) || []);
    } catch (error) {
      console.error('Error loading user achievements:', error);
    }
  };

  const loadStats = async () => {
    try {
      const { data: pickups } = await supabase
        .from('pickups')
        .select('*')
        .eq('user_id', profile.id);

      const totalPickups = pickups?.length || 0;
      const completedPickups = pickups?.filter(p => p.status === 'completed').length || 0;
      const recycledKg = profile.total_recycled_kg || 0;

      setStats({
        totalPickups,
        completedPickups,
        carbonSaved: (recycledKg * 2.5).toFixed(1),
        waterSaved: Math.round(recycledKg * 15)
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const getEcoLevelInfo = (level) => {
    const levels = {
      beginner: {
        icon: '🌱',
        label: 'Principiante',
        color: '#86efac',
        progress: 33,
        nextLevel: 'Avanzado'
      },
      advanced: {
        icon: '🌿',
        label: 'Avanzado',
        color: '#22c55e',
        progress: 66,
        nextLevel: 'Líder Verde'
      },
      leader: {
        icon: '🌳',
        label: 'Líder Verde',
        color: '#16a34a',
        progress: 100,
        nextLevel: 'Máximo nivel'
      }
    };
    return levels[level] || levels.beginner;
  };

  const levelInfo = getEcoLevelInfo(profile?.eco_level);

  return (
    <div className="profile-page">
      <motion.div
        className="profile-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-avatar" style={{ background: levelInfo.color }}>
          <span className="avatar-icon">{levelInfo.icon}</span>
        </div>
        <div className="profile-info">
          <h1>{profile?.full_name}</h1>
          <div className="eco-level-badge" style={{ background: levelInfo.color }}>
            <span>{levelInfo.icon}</span>
            <span>{levelInfo.label}</span>
          </div>
        </div>
      </motion.div>

      <div className="profile-grid">
        <motion.div
          className="profile-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2>Información Personal</h2>
          <div className="info-list">
            <div className="info-item">
              <Mail size={20} />
              <div>
                <label>Correo Electrónico</label>
                <p>{profile?.id}</p>
              </div>
            </div>
            <div className="info-item">
              <Phone size={20} />
              <div>
                <label>Teléfono</label>
                <p>{profile?.phone}</p>
              </div>
            </div>
            <div className="info-item">
              <CreditCard size={20} />
              <div>
                <label>DNI</label>
                <p>{profile?.dni}</p>
              </div>
            </div>
            {profile?.address && (
              <div className="info-item">
                <MapPin size={20} />
                <div>
                  <label>Dirección</label>
                  <p>{profile.address}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="profile-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Nivel Ecológico</h2>
          <div className="level-progress">
            <div className="level-header">
              <span className="level-current">{levelInfo.label}</span>
              <span className="level-next">Siguiente: {levelInfo.nextLevel}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${levelInfo.progress}%`, background: levelInfo.color }}
              ></div>
            </div>
            <p className="level-description">
              Sigue reciclando para avanzar al siguiente nivel
            </p>
          </div>

          <div className="points-display">
            <TrendingUp size={28} />
            <div>
              <h3>{profile?.total_points || 0}</h3>
              <p>Puntos Acumulados</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="stats-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2>Tu Impacto Ambiental</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <Leaf size={32} />
            <h3>{profile?.total_recycled_kg?.toFixed(1) || '0.0'} kg</h3>
            <p>Material Reciclado</p>
          </div>
          <div className="impact-card">
            <Package size={32} />
            <h3>{stats.completedPickups}</h3>
            <p>Recojos Completados</p>
          </div>
          <div className="impact-card">
            <TrendingUp size={32} />
            <h3>{stats.carbonSaved} kg</h3>
            <p>CO₂ Evitado</p>
          </div>
          <div className="impact-card">
            <Leaf size={32} />
            <h3>{stats.waterSaved} L</h3>
            <p>Agua Ahorrada</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="achievements-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2>
          <Award size={28} />
          Logros
        </h2>
        <div className="achievements-grid">
          {achievements.map((achievement) => {
            const isUnlocked = userAchievements.includes(achievement.id);
            const canUnlock = (profile?.total_points || 0) >= achievement.points_required;

            return (
              <motion.div
                key={achievement.id}
                className={`achievement-card ${isUnlocked ? 'unlocked' : canUnlock ? 'available' : 'locked'}`}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
              >
                <div className="achievement-icon">
                  {isUnlocked ? '🏆' : canUnlock ? '⭐' : '🔒'}
                </div>
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-points">
                  {achievement.points_required} puntos
                </div>
                {isUnlocked && (
                  <div className="unlocked-badge">
                    ¡Desbloqueado!
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
