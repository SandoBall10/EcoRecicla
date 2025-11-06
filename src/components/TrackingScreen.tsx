import { motion } from "motion/react";
import { MapPin, Phone, MessageCircle, Clock, User } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";

interface TrackingScreenProps {
  onNavigate: (screen: string) => void;
}

export function TrackingScreen({ onNavigate }: TrackingScreenProps) {
  const progress = 65;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 p-4">
      <div className="max-w-2xl mx-auto py-6 space-y-6">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-green-600 mb-1">Seguimiento en tiempo real</h2>
          <p className="text-gray-600">Tu recolector está en camino</p>
        </motion.div>

        {/* Mapa de seguimiento */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Mapa simulado */}
          <div className="h-80 bg-gradient-to-br from-green-100 via-emerald-50 to-blue-50 relative overflow-hidden">
            {/* Grid de fondo */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            {/* Ruta animada */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d="M 100 300 Q 200 200 350 150"
                stroke="#22c55e"
                strokeWidth="4"
                strokeDasharray="10,5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>

            {/* Vehículo en movimiento */}
            <motion.div
              animate={{
                x: [50, 300],
                y: [250, 100],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute"
            >
              <div className="relative">
                <div className="text-4xl filter drop-shadow-lg">🚗</div>
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-green-500 rounded-full blur-sm opacity-50"
                />
              </div>
            </motion.div>

            {/* Destino */}
            <div className="absolute bottom-8 right-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Indicador de tiempo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-sm">12 minutos</span>
              </div>
            </motion.div>
          </div>

          {/* Información del progreso */}
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progreso del recojo</span>
                <span className="text-green-600">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="space-y-1">
                <div
                  className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                    progress >= 33
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  ✓
                </div>
                <p className="text-xs text-gray-600">Confirmado</p>
              </div>
              <div className="space-y-1">
                <div
                  className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                    progress >= 66
                      ? "bg-green-500 text-white"
                      : progress >= 33
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  🚗
                </div>
                <p className="text-xs text-gray-600">En camino</p>
              </div>
              <div className="space-y-1">
                <div
                  className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                    progress >= 100
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  📦
                </div>
                <p className="text-xs text-gray-600">Recogido</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Información del recolector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="mb-4">Información del recolector</h3>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=driver" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4>Juan Pérez</h4>
              <p className="text-sm text-gray-600">Recolector certificado</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm">4.9 (234 recolecciones)</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-green-500 hover:bg-green-600 rounded-xl gap-2">
              <Phone className="w-4 h-4" />
              Llamar
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl gap-2 border-2"
            >
              <MessageCircle className="w-4 h-4" />
              Mensaje
            </Button>
          </div>
        </motion.div>

        {/* Detalles del pedido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-3"
        >
          <h3 className="mb-4">Detalles del recojo</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Dirección</p>
                <p>Calle Verde 123, Ciudad Ecológica</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex-shrink-0 mt-0.5">📦</div>
              <div>
                <p className="text-sm text-gray-600">Material</p>
                <p>Plástico y cartón (Media, 5-15 kg)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Hora programada</p>
                <p>Hoy, 15:00 - 16:00</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Button
            onClick={() => onNavigate("rewards")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-6"
          >
            Ver mis recompensas
          </Button>
          <Button
            onClick={() => onNavigate("map")}
            variant="outline"
            className="w-full rounded-xl py-6"
          >
            Volver al mapa
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
