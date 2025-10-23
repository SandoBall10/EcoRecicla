import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, MapPin, Gift, TrendingUp, Heart } from 'lucide-react';
import './Welcome.css';

const Welcome = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Puntos de Reciclaje',
      description: 'Encuentra centros cercanos en el mapa interactivo'
    },
    {
      icon: Recycle,
      title: 'Recojo a Domicilio',
      description: 'Solicita que recojan tus materiales en casa'
    },
    {
      icon: Gift,
      title: 'Recompensas',
      description: 'Gana puntos y descuentos en locales aliados'
    },
    {
      icon: TrendingUp,
      title: 'Mide tu Impacto',
      description: 'Ve cuánto has contribuido al medio ambiente'
    }
  ];

  return (
    <div className="welcome-page">
      <div className="welcome-hero">
        <motion.div
          className="hero-logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8
          }}
        >
          <Leaf size={64} />
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          EcoRecicla
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Recicla hoy, cuida el mañana
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link to="/login" className="btn-primary btn-icon">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn-secondary btn-icon">
            Registrarse
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <h2 className="features-title">¿Por qué EcoRecicla?</h2>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
              >
                <div className="feature-icon">
                  <Icon size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        className="impact-banner"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <Heart className="impact-icon" size={28} />
        <p className="impact-text">
          Únete a nuestra comunidad y comienza a hacer la diferencia
        </p>
      </motion.div>

      <div className="welcome-footer">
        <div className="floating-leaves">
          <motion.div
            className="leaf leaf-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf size={24} />
          </motion.div>
          <motion.div
            className="leaf leaf-2"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <Leaf size={20} />
          </motion.div>
          <motion.div
            className="leaf leaf-3"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 15, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Leaf size={28} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
