import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin, Filter, Phone, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const Map = () => {
  const [recyclingPoints, setRecyclingPoints] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [loading, setLoading] = useState(true);

  const materials = [
    { value: 'all', label: 'Todos', color: '#22c55e' },
    { value: 'plastic', label: 'Plástico', color: '#3b82f6' },
    { value: 'glass', label: 'Vidrio', color: '#06b6d4' },
    { value: 'paper', label: 'Papel', color: '#f59e0b' },
    { value: 'metal', label: 'Metal', color: '#6366f1' },
    { value: 'electronics', label: 'Electrónicos', color: '#8b5cf6' }
  ];

  useEffect(() => {
    loadRecyclingPoints();
  }, []);

  useEffect(() => {
    filterPoints();
  }, [selectedMaterial, recyclingPoints]);

  const loadRecyclingPoints = async () => {
    try {
      const { data, error } = await supabase
        .from('recycling_points')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setRecyclingPoints(data || []);
    } catch (error) {
      console.error('Error loading recycling points:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPoints = () => {
    if (selectedMaterial === 'all') {
      setFilteredPoints(recyclingPoints);
    } else {
      setFilteredPoints(
        recyclingPoints.filter(point =>
          point.accepted_materials.includes(selectedMaterial)
        )
      );
    }
  };

  const getMaterialBadges = (materials) => {
    return materials.map(mat => {
      const material = materials.find(m => m.value === mat);
      return material?.label || mat;
    });
  };

  if (loading) {
    return (
      <div className="map-page">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="map-page">
      <motion.div
        className="map-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <MapPin size={32} color="#22c55e" />
          <div>
            <h1>Puntos de Reciclaje</h1>
            <p>Encuentra centros cercanos para reciclar tus materiales</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="filter-section"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Filter size={20} />
        <span className="filter-label">Filtrar por material:</span>
        <div className="filter-buttons">
          {materials.map((material) => (
            <button
              key={material.value}
              onClick={() => setSelectedMaterial(material.value)}
              className={`filter-btn ${selectedMaterial === material.value ? 'active' : ''}`}
              style={
                selectedMaterial === material.value
                  ? { background: material.color, color: 'white' }
                  : {}
              }
            >
              {material.label}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="map-container-wrapper"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <MapContainer
          center={[-12.046374, -77.042793]}
          zoom={12}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredPoints.map((point) => (
            <Marker
              key={point.id}
              position={[point.latitude, point.longitude]}
            >
              <Popup>
                <div className="map-popup">
                  <h3>{point.name}</h3>
                  <p className="popup-address">
                    <MapPin size={16} />
                    {point.address}
                  </p>

                  <div className="popup-materials">
                    <strong>Materiales aceptados:</strong>
                    <div className="material-tags">
                      {point.accepted_materials.map((mat, idx) => (
                        <span key={idx} className="material-tag">
                          {materials.find(m => m.value === mat)?.label || mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {point.phone && (
                    <p className="popup-info">
                      <Phone size={16} />
                      {point.phone}
                    </p>
                  )}

                  {point.hours && (
                    <p className="popup-info">
                      <Clock size={16} />
                      {point.hours}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>

      <motion.div
        className="points-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2>Puntos Disponibles ({filteredPoints.length})</h2>
        <div className="points-grid">
          {filteredPoints.map((point) => (
            <div key={point.id} className="point-card">
              <div className="point-header">
                <div className="point-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3>{point.name}</h3>
                  <p>{point.address}</p>
                </div>
              </div>

              <div className="point-materials">
                {point.accepted_materials.map((mat, idx) => {
                  const material = materials.find(m => m.value === mat);
                  return (
                    <span
                      key={idx}
                      className="point-material-badge"
                      style={{ background: material?.color || '#22c55e' }}
                    >
                      {material?.label || mat}
                    </span>
                  );
                })}
              </div>

              {point.hours && (
                <div className="point-info">
                  <Clock size={16} />
                  <span>{point.hours}</span>
                </div>
              )}

              {point.phone && (
                <div className="point-info">
                  <Phone size={16} />
                  <span>{point.phone}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Map;
