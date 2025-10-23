import { motion } from 'framer-motion';
import { BookOpen, Trash2, Droplet, Newspaper, Cpu, Leaf, AlertTriangle, CheckCircle } from 'lucide-react';
import './Learn.css';

const Learn = () => {
  const categories = [
    {
      icon: Droplet,
      title: 'Plástico',
      color: '#3b82f6',
      items: ['Botellas PET', 'Envases de detergente', 'Bolsas plásticas', 'Tapas de plástico'],
      tips: 'Enjuaga bien antes de reciclar y retira las etiquetas cuando sea posible.',
      avoid: 'No recicles plásticos con restos de comida o envases de productos químicos.'
    },
    {
      icon: Trash2,
      title: 'Vidrio',
      color: '#06b6d4',
      items: ['Botellas de vidrio', 'Frascos', 'Tarros', 'Envases de conservas'],
      tips: 'Retira las tapas metálicas o plásticas antes de reciclar.',
      avoid: 'No recicles espejos, cristales de ventanas o bombillas.'
    },
    {
      icon: Newspaper,
      title: 'Papel y Cartón',
      color: '#f59e0b',
      items: ['Periódicos', 'Revistas', 'Cajas de cartón', 'Papel de oficina'],
      tips: 'Aplana las cajas para ahorrar espacio y mantén el papel seco.',
      avoid: 'No recicles papel encerado, plastificado o con restos de comida.'
    },
    {
      icon: Trash2,
      title: 'Metal',
      color: '#6366f1',
      items: ['Latas de aluminio', 'Latas de conserva', 'Papel aluminio', 'Tapas metálicas'],
      tips: 'Enjuaga las latas y aplástalas si es posible.',
      avoid: 'No recicles metales con pintura, grasa o productos químicos.'
    },
    {
      icon: Cpu,
      title: 'Electrónicos',
      color: '#8b5cf6',
      items: ['Celulares viejos', 'Baterías', 'Cables', 'Electrodomésticos pequeños'],
      tips: 'Lleva los electrónicos a puntos especializados de reciclaje.',
      avoid: 'Nunca los tires a la basura común, contienen materiales peligrosos.'
    },
    {
      icon: Leaf,
      title: 'Orgánicos',
      color: '#22c55e',
      items: ['Restos de frutas', 'Verduras', 'Cáscaras de huevo', 'Café y té'],
      tips: 'Haz compost en casa para crear abono natural.',
      avoid: 'No incluyas carne, lácteos o aceites en el compost casero.'
    }
  ];

  const ecoTips = [
    'Lleva tu propia bolsa reutilizable al hacer compras',
    'Usa botellas de agua rellenables en lugar de desechables',
    'Separa tus residuos desde casa en diferentes contenedores',
    'Dona o vende lo que ya no uses en lugar de tirarlo',
    'Prefiere productos con menos empaquetado',
    'Repara antes de reemplazar objetos dañados'
  ];

  return (
    <div className="learn-page">
      <motion.div
        className="learn-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BookOpen size={32} color="#22c55e" />
        <div>
          <h1>Aprende a Segregar Correctamente</h1>
          <p>Conoce cómo clasificar tus residuos y contribuir al medio ambiente</p>
        </div>
      </motion.div>

      <div className="categories-grid">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={index}
              className="category-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, translateY: -4 }}
            >
              <div className="category-header" style={{ background: category.color }}>
                <Icon size={32} />
                <h3>{category.title}</h3>
              </div>

              <div className="category-content">
                <div className="items-section">
                  <h4>¿Qué puedes reciclar?</h4>
                  <ul className="items-list">
                    {category.items.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tips-section">
                  <div className="tip-box tip-good">
                    <CheckCircle size={18} />
                    <p>{category.tips}</p>
                  </div>
                  <div className="tip-box tip-bad">
                    <AlertTriangle size={18} />
                    <p>{category.avoid}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="eco-tips-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2>Consejos Ecológicos</h2>
        <p className="section-subtitle">Pequeñas acciones que generan un gran impacto</p>

        <div className="tips-grid">
          {ecoTips.map((tip, index) => (
            <motion.div
              key={index}
              className="tip-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="tip-number">{index + 1}</div>
              <p>{tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="impact-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h3>¿Por qué es importante reciclar?</h3>
        <div className="impact-stats">
          <div className="impact-stat">
            <div className="stat-value">75%</div>
            <p>de residuos son reciclables</p>
          </div>
          <div className="impact-stat">
            <div className="stat-value">95%</div>
            <p>menos energía al reciclar aluminio</p>
          </div>
          <div className="impact-stat">
            <div className="stat-value">70%</div>
            <p>menos contaminación del agua</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Learn;
