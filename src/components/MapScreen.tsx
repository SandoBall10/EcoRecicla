import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Navigation, Filter, Phone, Navigation2, Star, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface MapScreenProps {
  onNavigate: (screen: string) => void;
}

const recyclingCenters = [
  {
    id: 1,
    name: "Centro Verde Principal",
    address: "Av. Ecológica 123",
    materials: ["plástico", "cartón", "vidrio", "metal"],
    distance: "0.8 km",
    hours: "Lun-Sáb 8:00-18:00",
    rating: 4.8,
    lat: 40.7128 + Math.random() * 0.01,
    lng: -74.006 + Math.random() * 0.01,
  },
  {
    id: 2,
    name: "Punto Limpio Norte",
    address: "Calle Sostenible 456",
    materials: ["cartón", "vidrio", "electrónicos"],
    distance: "1.2 km",
    hours: "Lun-Dom 7:00-20:00",
    rating: 4.9,
    lat: 40.7128 + Math.random() * 0.01,
    lng: -74.006 + Math.random() * 0.01,
  },
  {
    id: 3,
    name: "EcoPoint Centro",
    address: "Plaza del Reciclaje 789",
    materials: ["plástico", "metal", "vidrio"],
    distance: "2.1 km",
    hours: "Lun-Vie 9:00-17:00",
    rating: 4.6,
    lat: 40.7128 + Math.random() * 0.01,
    lng: -74.006 + Math.random() * 0.01,
  },
  {
    id: 4,
    name: "Recicla+ Sur",
    address: "Av. Verde 321",
    materials: ["plástico", "cartón", "electrónicos"],
    distance: "3.5 km",
    hours: "Lun-Sáb 8:30-19:00",
    rating: 4.7,
    lat: 40.7128 + Math.random() * 0.01,
    lng: -74.006 + Math.random() * 0.01,
  },
];

const materialColors: Record<string, string> = {
  plástico: "bg-blue-100 text-blue-700",
  cartón: "bg-amber-100 text-amber-700",
  vidrio: "bg-cyan-100 text-cyan-700",
  metal: "bg-gray-100 text-gray-700",
  electrónicos: "bg-purple-100 text-purple-700",
};

const materialEmojis: Record<string, string> = {
  plástico: "🍾",
  cartón: "📦",
  vidrio: "🫙",
  metal: "🥫",
  electrónicos: "💻",
};

export function MapScreen({ onNavigate }: MapScreenProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("todos");
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);

  const filteredCenters =
    selectedMaterial === "todos"
      ? recyclingCenters
      : recyclingCenters.filter((center) =>
          center.materials.includes(selectedMaterial)
        );

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header mejorado */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-md border-b-2 border-green-100 p-4 space-y-3 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-green-600 flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MapPin className="w-6 h-6" />
              </motion.div>
              Centros de reciclaje
            </h3>
            <p className="text-xs text-gray-600">
              {filteredCenters.length} centros disponibles cerca de ti
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              variant="outline"
              className="gap-2 rounded-full border-2 border-green-500 text-green-600 hover:bg-green-50 shadow-md"
              onClick={() => {}}
            >
              <Navigation2 className="w-4 h-4" />
              Mi ubicación
            </Button>
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Filter className="w-5 h-5 text-green-600" />
          </motion.div>
          <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
            <SelectTrigger className="flex-1 rounded-xl border-2 border-green-200 focus:border-green-400">
              <SelectValue placeholder="Filtrar por material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">🌍 Todos los materiales</SelectItem>
              <SelectItem value="plástico">🍾 Plástico</SelectItem>
              <SelectItem value="cartón">📦 Cartón</SelectItem>
              <SelectItem value="vidrio">🫙 Vidrio</SelectItem>
              <SelectItem value="metal">🥫 Metal</SelectItem>
              <SelectItem value="electrónicos">💻 Electrónicos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Mapa mejorado */}
      <div className="flex-1 relative overflow-hidden">
        {/* Fondo animado del mapa */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50"
        />

        {/* Grid de fondo */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ondas decorativas */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.05, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute rounded-full bg-green-500"
            style={{
              left: "50%",
              top: "50%",
              width: "200px",
              height: "200px",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Marcadores de centros mejorados */}
        <AnimatePresence>
          {filteredCenters.map((center, index) => (
            <motion.div
              key={center.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              className="absolute cursor-pointer z-10"
              style={{
                left: `${20 + (index % 3) * 25}%`,
                top: `${20 + Math.floor(index / 3) * 30}%`,
              }}
              onClick={() => setSelectedCenter(center.id === selectedCenter ? null : center.id)}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                <div className="relative">
                  {/* Pin del mapa */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 rounded-full ${
                      selectedCenter === center.id
                        ? "bg-gradient-to-br from-orange-500 to-orange-600"
                        : "bg-gradient-to-br from-green-500 to-emerald-600"
                    } flex items-center justify-center shadow-2xl border-4 border-white relative`}
                  >
                    <MapPin className="w-7 h-7 text-white" />
                    {/* Pulso animado */}
                    <motion.div
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className={`absolute inset-0 rounded-full ${
                        selectedCenter === center.id
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    />
                  </motion.div>

                  {/* Info card del centro */}
                  <AnimatePresence>
                    {selectedCenter === center.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 z-20 border-2 border-orange-200"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
                            🏪
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-1">{center.name}</h4>
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {center.address}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {center.materials.map((material) => (
                            <motion.div
                              key={material}
                              whileHover={{ scale: 1.05 }}
                              className={`${materialColors[material]} text-xs px-2 py-1 rounded-lg flex items-center gap-1`}
                            >
                              <span>{materialEmojis[material]}</span>
                              <span>{material}</span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <Navigation className="w-3 h-3 text-green-600" />
                            {center.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-orange-600" />
                            {center.hours}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(center.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">
                            {center.rating}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-md"
                            >
                              <Navigation2 className="w-4 h-4 mr-1" />
                              Ir aquí
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full rounded-xl border-2 border-green-500 text-green-600 hover:bg-green-50"
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              Llamar
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Usuario en el mapa */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="relative"
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-xl" />
            {/* Ondas de ubicación */}
            <motion.div
              animate={{
                scale: [1, 2.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-blue-500 rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Lista de centros mejorada */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="bg-white/90 backdrop-blur-md border-t-2 border-green-100 max-h-72 overflow-y-auto shadow-2xl"
      >
        <div className="p-4 space-y-3">
          <h4 className="text-sm text-gray-700 flex items-center gap-2">
            <span className="text-lg">📍</span>
            Centros cercanos
          </h4>
          {filteredCenters.map((center, index) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              onClick={() => setSelectedCenter(center.id)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedCenter === center.id
                  ? "border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 shadow-lg"
                  : "border-gray-200 hover:border-green-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm">{center.name}</h4>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {center.distance}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{center.address}</p>
                  <div className="flex flex-wrap gap-1">
                    {center.materials.map((material) => (
                      <span
                        key={material}
                        className={`${materialColors[material]} text-xs px-2 py-0.5 rounded-md`}
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right ml-3">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-600">{center.rating}</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 h-auto hover:bg-green-50"
                    >
                      <Phone className="w-4 h-4 text-green-600" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Botón flotante de solicitar recojo - mejorado */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="absolute bottom-28 right-4"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => onNavigate("pickup")}
            className="relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-2xl px-8 py-7 gap-2 overflow-hidden group"
          >
            <motion.div
              animate={{
                x: [-200, 200],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl"
            >
              🚗
            </motion.span>
            <span className="relative z-10">Solicitar recojo</span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
