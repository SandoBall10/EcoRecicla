import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, User, Phone, CreditCard, MapPin, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dni: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData);
      navigate('/home');
    } catch (err) {
      if (err.message.includes('already registered')) {
        setError('Este correo ya está registrado');
      } else if (err.message.includes('dni')) {
        setError('Este DNI ya está registrado');
      } else {
        setError('Error al crear la cuenta. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="floating-leaf leaf-1">
          <Leaf size={40} />
        </div>
        <div className="floating-leaf leaf-2">
          <Leaf size={30} />
        </div>
        <div className="floating-leaf leaf-3">
          <Leaf size={35} />
        </div>
      </div>

      <motion.div
        className="auth-container register-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <div className="auth-logo">
            <Leaf size={40} />
          </div>
          <h1 className="auth-title">Únete a EcoRecicla</h1>
          <p className="auth-subtitle">Comienza tu viaje hacia un futuro más verde</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
            <label htmlFor="fullName">Nombre Completo *</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Juan Pérez"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Correo Electrónico *</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="dni">DNI *</label>
              <div className="input-wrapper">
                <CreditCard className="input-icon" size={20} />
                <input
                  id="dni"
                  name="dni"
                  type="text"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="12345678"
                  required
                  maxLength="8"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="phone">Teléfono *</label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={20} />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="999 888 777"
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="address">Dirección (opcional)</label>
            <div className="input-wrapper">
              <MapPin className="input-icon" size={20} />
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Av. Principal 123, Lima"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength="6"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength="6"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="auth-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
