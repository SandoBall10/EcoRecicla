import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, Clock, MapPin, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import './Pickup.css';

const Pickup = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('request');
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    materialType: '',
    estimatedQuantity: '',
    pickupAddress: profile?.address || '',
    pickupDate: '',
    pickupTime: ''
  });

  useEffect(() => {
    if (profile) {
      loadPickups();
      setFormData(prev => ({ ...prev, pickupAddress: profile.address || '' }));
    }
  }, [profile]);

  const loadPickups = async () => {
    try {
      const { data, error } = await supabase
        .from('pickups')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPickups(data || []);
    } catch (error) {
      console.error('Error loading pickups:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { error } = await supabase
        .from('pickups')
        .insert([{
          user_id: profile.id,
          material_type: formData.materialType,
          estimated_quantity: formData.estimatedQuantity,
          pickup_address: formData.pickupAddress,
          pickup_date: formData.pickupDate,
          pickup_time: formData.pickupTime,
          status: 'pending'
        }]);

      if (error) throw error;

      setSuccess('¡Solicitud de recojo enviada exitosamente!');
      setFormData({
        materialType: '',
        estimatedQuantity: '',
        pickupAddress: profile?.address || '',
        pickupDate: '',
        pickupTime: ''
      });
      loadPickups();
      setTimeout(() => setActiveTab('history'), 2000);
    } catch (error) {
      setError('Error al solicitar recojo. Intenta de nuevo.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      in_transit: '#3b82f6',
      completed: '#22c55e',
      cancelled: '#ef4444'
    };
    return colors[status] || '#64748b';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pendiente',
      in_transit: 'En Camino',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };
    return labels[status] || status;
  };

  return (
    <div className="pickup-page">
      <motion.div
        className="pickup-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Package size={32} color="#f97316" />
        <div>
          <h1>Recojo a Domicilio</h1>
          <p>Solicita la recolección de tus materiales reciclables</p>
        </div>
      </motion.div>

      <div className="pickup-tabs">
        <button
          className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          <Package size={20} />
          Nueva Solicitud
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Truck size={20} />
          Mis Recojos ({pickups.length})
        </button>
      </div>

      {activeTab === 'request' ? (
        <motion.div
          className="request-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <form onSubmit={handleSubmit} className="pickup-form">
            {success && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={20} />
                <span>{success}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <AlertCircle size={20} />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="input-group">
              <label htmlFor="materialType">Tipo de Material *</label>
              <select
                id="materialType"
                name="materialType"
                value={formData.materialType}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="plastic">Plástico</option>
                <option value="glass">Vidrio</option>
                <option value="paper">Papel y Cartón</option>
                <option value="metal">Metal</option>
                <option value="electronics">Electrónicos</option>
                <option value="mixed">Mixto</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="estimatedQuantity">Cantidad Estimada *</label>
              <select
                id="estimatedQuantity"
                name="estimatedQuantity"
                value={formData.estimatedQuantity}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una cantidad</option>
                <option value="small">Pequeña (hasta 5 kg)</option>
                <option value="medium">Mediana (5-15 kg)</option>
                <option value="large">Grande (15-30 kg)</option>
                <option value="xlarge">Muy Grande (más de 30 kg)</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="pickupAddress">Dirección de Recojo *</label>
              <textarea
                id="pickupAddress"
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                placeholder="Ingresa tu dirección completa"
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="pickupDate">Fecha de Recojo *</label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="pickupTime">Hora de Recojo *</label>
                <input
                  type="time"
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? 'Enviando solicitud...' : 'Solicitar Recojo'}
            </button>
          </form>

          <div className="info-card">
            <h3>Información Importante</h3>
            <ul>
              <li>El servicio de recojo está disponible de lunes a sábado</li>
              <li>Recibirás una notificación cuando el vehículo esté en camino</li>
              <li>Asegúrate de tener los materiales listos y separados</li>
              <li>Ganarás puntos según el peso de material reciclado</li>
            </ul>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="history-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {pickups.length === 0 ? (
            <div className="empty-state">
              <Package size={64} color="#cbd5e1" />
              <h3>No tienes recojos registrados</h3>
              <p>Solicita tu primer recojo para comenzar a acumular puntos</p>
              <button
                className="btn-primary"
                onClick={() => setActiveTab('request')}
              >
                Solicitar Recojo
              </button>
            </div>
          ) : (
            <div className="pickups-grid">
              {pickups.map((pickup) => (
                <motion.div
                  key={pickup.id}
                  className="pickup-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="pickup-status-badge" style={{ background: getStatusColor(pickup.status) }}>
                    {getStatusLabel(pickup.status)}
                  </div>

                  <div className="pickup-info">
                    <div className="info-row">
                      <Package size={18} />
                      <span className="info-label">Material:</span>
                      <span className="info-value">{pickup.material_type}</span>
                    </div>

                    <div className="info-row">
                      <MapPin size={18} />
                      <span className="info-label">Dirección:</span>
                      <span className="info-value">{pickup.pickup_address}</span>
                    </div>

                    <div className="info-row">
                      <Calendar size={18} />
                      <span className="info-label">Fecha:</span>
                      <span className="info-value">
                        {new Date(pickup.pickup_date).toLocaleDateString('es-ES')}
                      </span>
                    </div>

                    <div className="info-row">
                      <Clock size={18} />
                      <span className="info-label">Hora:</span>
                      <span className="info-value">{pickup.pickup_time}</span>
                    </div>

                    {pickup.points_earned > 0 && (
                      <div className="points-earned">
                        +{pickup.points_earned} puntos ganados
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Pickup;
