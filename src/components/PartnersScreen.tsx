import { motion } from "motion/react";
import { Store, MapPin, Star, Gift, ArrowRight, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PartnersScreenProps {
  onNavigate: (screen: string) => void;
}

const partners = [
  {
    id: 1,
    name: "GreenCoffee",
    category: "Cafetería",
    description: "Café orgánico y sostenible",
    benefit: "10% de descuento con tus puntos",
    distance: "0.5 km",
    rating: 4.8,
    points: 100,
    logo: "☕",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400",
  },
  {
    id: 2,
    name: "EcoMarket",
    category: "Supermercado",
    description: "Productos ecológicos y locales",
    benefit: "Descuentos hasta 20%",
    distance: "1.2 km",
    rating: 4.9,
    points: 150,
    logo: "🛒",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
  },
  {
    id: 3,
    name: "VeganBistro",
    category: "Restaurante",
    description: "Cocina vegana y sustentable",
    benefit: "Postre gratis con tu compra",
    distance: "0.8 km",
    rating: 4.7,
    points: 120,
    logo: "🥗",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
  },
  {
    id: 4,
    name: "BioTienda",
    category: "Tienda",
    description: "Productos naturales y orgánicos",
    benefit: "15% en productos seleccionados",
    distance: "2.1 km",
    rating: 4.6,
    points: 130,
    logo: "🌿",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400",
  },
  {
    id: 5,
    name: "ZenStudio",
    category: "Bienestar",
    description: "Yoga y meditación",
    benefit: "Clase gratis al canjear puntos",
    distance: "1.5 km",
    rating: 4.9,
    points: 200,
    logo: "🧘",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
  },
  {
    id: 6,
    name: "CineVerde",
    category: "Entretenimiento",
    description: "Cine consciente y sostenible",
    benefit: "Entrada 2x1 los jueves",
    distance: "3.0 km",
    rating: 4.5,
    points: 250,
    logo: "🎬",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400",
  },
];

export function PartnersScreen({ onNavigate }: PartnersScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 p-4 pb-24">
      <div className="max-w-6xl mx-auto py-6 space-y-6">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-green-600 mb-2">Tiendas asociadas</h2>
          <p className="text-gray-600">
            Descubre beneficios exclusivos en nuestros comercios aliados
          </p>
        </motion.div>

        {/* Barra de búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar tiendas, beneficios..."
              className="pl-10 rounded-xl bg-gray-50"
            />
          </div>
        </motion.div>

        {/* Categorías rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {[
            { label: "Todos", icon: "🏪" },
            { label: "Comida", icon: "🍽️" },
            { label: "Cafeterías", icon: "☕" },
            { label: "Tiendas", icon: "🛍️" },
            { label: "Bienestar", icon: "💆" },
            { label: "Entretenimiento", icon: "🎭" },
          ].map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={`rounded-full whitespace-nowrap flex-shrink-0 ${
                index === 0
                  ? "bg-green-500 hover:bg-green-600"
                  : "border-2 hover:border-green-300"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Lista de tiendas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-green-300 transition-all"
            >
              {/* Imagen */}
              <div className="relative h-40 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
                <ImageWithFallback
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-lg flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-green-600" />
                  <span className="text-xs">{partner.distance}</span>
                </div>
                <div className="absolute top-3 left-3 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-2xl">
                  {partner.logo}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5">
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="truncate">{partner.name}</h4>
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{partner.rating}</span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-600 text-xs"
                  >
                    {partner.category}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {partner.description}
                </p>

                {/* Beneficio destacado */}
                <div className="bg-orange-50 rounded-xl p-3 mb-4 border border-orange-200">
                  <div className="flex items-start gap-2">
                    <Gift className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-900">{partner.benefit}</p>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 rounded-xl border-2"
                  >
                    Ver más
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-green-500 hover:bg-green-600 rounded-xl"
                    onClick={() => onNavigate("rewards")}
                  >
                    Canjear
                    <Star className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-3">
                  Desde {partner.points} puntos
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner de llamada a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl shadow-xl p-8 text-white text-center"
        >
          <div className="max-w-2xl mx-auto">
            <Store className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-white mb-3">
              ¿Tienes un negocio sostenible?
            </h3>
            <p className="text-orange-100 mb-6">
              Únete a nuestra red de comercios asociados y apoya el reciclaje en
              tu comunidad
            </p>
            <Button className="bg-white text-orange-600 hover:bg-orange-50 rounded-xl px-8">
              Conviértete en aliado
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
        >
          <h3 className="text-center mb-6">
            Nuestra red de comercios sostenibles
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <p className="text-3xl text-green-600">150+</p>
              <p className="text-sm text-gray-600">Comercios aliados</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl text-orange-600">5000+</p>
              <p className="text-sm text-gray-600">Beneficios canjeados</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl text-blue-600">25+</p>
              <p className="text-sm text-gray-600">Ciudades</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
