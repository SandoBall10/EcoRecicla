import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, MapPin, Tag, Store, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import './Rewards.css';

const Rewards = () => {
  const { profile } = useAuth();
  const [partnerStores, setPartnerStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'Todos', icon: Store },
    { value: 'cafe', label: 'Cafeterías', icon: Gift },
    { value: 'restaurant', label: 'Restaurantes', icon: Gift },
    { value: 'retail', label: 'Tiendas', icon: Gift },
    { value: 'services', label: 'Servicios', icon: Gift }
  ];

  useEffect(() => {
    loadPartnerStores();
  }, []);

  const loadPartnerStores = async () => {
    try {
      const { data, error } = await supabase
        .from('partner_stores')
        .select('*')
        .eq('is_active', true)
        .order('points_required', { ascending: true });

      if (error) throw error;
      setPartnerStores(data || []);
    } catch (error) {
      console.error('Error loading partner stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = selectedCategory === 'all'
    ? partnerStores
    : partnerStores.filter(store => store.category === selectedCategory);

  const canRedeem = (pointsRequired) => {
    return (profile?.total_points || 0) >= pointsRequired;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      cafe: '☕',
      restaurant: '🍽️',
      retail: '🛒',
      services: '🔧'
    };
    return icons[category] || '🏪';
  };

  if (loading) {
    return (
      <div className="rewards-page">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="rewards-page">
      <motion.div
        className="rewards-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Gift size={32} color="#f97316" />
        <div>
          <h1>Recompensas</h1>
          <p>Canjea tus puntos por descuentos en locales aliados</p>
        </div>
      </motion.div>

      <motion.div
        className="points-banner"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="banner-content">
          <TrendingUp size={36} />
          <div>
            <h2>Tus Puntos Disponibles</h2>
            <div className="points-value">{profile?.total_points || 0} puntos</div>
          </div>
        </div>
        <p className="banner-subtitle">
          Sigue reciclando para ganar más puntos y desbloquear más recompensas
        </p>
      </motion.div>

      <div className="category-filter">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
            >
              <Icon size={20} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {filteredStores.length === 0 ? (
        <div className="empty-state">
          <Store size={64} color="#cbd5e1" />
          <h3>No hay tiendas en esta categoría</h3>
          <p>Selecciona otra categoría para ver más opciones</p>
        </div>
      ) : (
        <div className="stores-grid">
          {filteredStores.map((store, index) => {
            const canUse = canRedeem(store.points_required);
            return (
              <motion.div
                key={store.id}
                className={`store-card ${canUse ? 'available' : 'locked'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={canUse ? { scale: 1.03, translateY: -4 } : {}}
              >
                <div className="store-badge" style={{
                  background: canUse ? 'var(--primary-green)' : 'var(--text-muted)'
                }}>
                  {canUse ? 'Disponible' : 'Bloqueado'}
                </div>

                <div className="store-icon">
                  {getCategoryIcon(store.category)}
                </div>

                <h3>{store.name}</h3>
                <p className="store-description">{store.description}</p>

                <div className="store-discount">
                  <Tag size={20} />
                  <span>{store.discount_description}</span>
                </div>

                <div className="store-address">
                  <MapPin size={16} />
                  <span>{store.address}</span>
                </div>

                <div className="store-footer">
                  <div className="points-required">
                    <Gift size={18} />
                    <span>{store.points_required} puntos</span>
                  </div>
                  {canUse ? (
                    <span className="can-redeem">✓ Puedes canjear</span>
                  ) : (
                    <span className="cannot-redeem">
                      Necesitas {store.points_required - (profile?.total_points || 0)} más
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <motion.div
        className="rewards-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3>¿Cómo funciona?</h3>
        <div className="info-steps">
          <div className="info-step">
            <div className="step-number">1</div>
            <div>
              <h4>Recicla y Gana Puntos</h4>
              <p>Completa recojos y acumula puntos por cada kilogramo reciclado</p>
            </div>
          </div>
          <div className="info-step">
            <div className="step-number">2</div>
            <div>
              <h4>Elige tu Recompensa</h4>
              <p>Selecciona el local aliado donde quieres usar tus puntos</p>
            </div>
          </div>
          <div className="info-step">
            <div className="step-number">3</div>
            <div>
              <h4>Muestra tu Perfil</h4>
              <p>Presenta tu perfil de EcoRecicla en el local para aplicar el descuento</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Rewards;
