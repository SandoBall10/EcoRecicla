import { motion } from "motion/react";
import { Camera, Award, TrendingUp, Droplets, TreePine, Share2, Settings, LogOut, ChevronRight, Zap, Target, Star, Medal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface ProfileScreenProps {
  username: string;
}

const recyclingHistory = [
  {
    id: 1,
    date: "15 Oct 2025",
    material: "Plástico y cartón",
    weight: "12 kg",
    points: 120,
    icon: "🍾",
    color: "from-blue-50 to-cyan-50",
  },
  {
    id: 2,
    date: "10 Oct 2025",
    material: "Vidrio",
    weight: "8 kg",
    points: 80,
    icon: "🫙",
    color: "from-cyan-50 to-teal-50",
  },
  {
    id: 3,
    date: "5 Oct 2025",
    material: "Electrónicos",
    weight: "5 kg",
    points: 150,
    icon: "💻",
    color: "from-purple-50 to-pink-50",
  },
  {
    id: 4,
    date: "1 Oct 2025",
    material: "Metal",
    weight: "15 kg",
    points: 200,
    icon: "🥫",
    color: "from-gray-50 to-slate-50",
  },
];

const achievements = [
  { icon: "🏆", name: "Primer recojo", unlocked: true, rarity: "común" },
  { icon: "⭐", name: "10 recojos", unlocked: true, rarity: "común" },
  { icon: "💚", name: "Reciclador del mes", unlocked: true, rarity: "raro" },
  { icon: "🌟", name: "50 recojos", unlocked: false, rarity: "épico" },
  { icon: "👑", name: "Líder verde", unlocked: false, rarity: "legendario" },
  { icon: "🎯", name: "Meta mensual", unlocked: true, rarity: "raro" },
  { icon: "🔥", name: "Racha 7 días", unlocked: false, rarity: "épico" },
  { icon: "💎", name: "VIP Eco", unlocked: false, rarity: "legendario" },
];

export function ProfileScreen({ username }: ProfileScreenProps) {
  const totalPoints = 1250;
  const totalWeight = 40;
  const currentLevel = "🌿 Avanzado";
  const nextLevel = "🌳 Líder Verde";
  const levelProgress = 65;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 pb-24 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute text-8xl opacity-5"
          style={{
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 4) * 25}%`,
          }}
        >
          {["🌿", "🌳", "♻️", "💚", "🌍", "✨", "🌱", "🍃"][i]}
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto py-6 space-y-6 relative z-10">
        {/* Perfil principal - mejorado */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-2 border-green-100"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar mejorado */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Avatar className="w-32 h-32 border-4 border-green-500 shadow-xl">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                    {username[0]}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Badge de nivel flotante */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-2 -right-2 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full p-2 shadow-lg border-2 border-white"
              >
                <Award className="w-5 h-5" />
              </motion.div>

              {/* Botón cámara mejorado */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <Camera className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Información del usuario */}
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-1"
              >
                {username}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mb-3 flex items-center gap-2 justify-center md:justify-start"
              >
                <span>📅</span>
                Miembro desde Enero 2025
              </motion.p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 shadow-md">
                    {currentLevel}
                  </Badge>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Badge className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 shadow-md">
                    ⭐ {totalPoints} puntos
                  </Badge>
                </motion.div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-2 border-gray-300 hover:border-green-500 hover:bg-green-50"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-2 border-gray-300 hover:border-green-500 hover:bg-green-50"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Nivel ecológico - mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 text-white overflow-hidden"
        >
          {/* Efecto de fondo */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-green-100 mb-1 text-sm">Nivel actual</p>
                <motion.h3
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-white"
                >
                  {currentLevel}
                </motion.h3>
              </div>
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg"
              >
                <TreePine className="w-10 h-10" />
              </motion.div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-100">Progreso al siguiente nivel</span>
                <span className="text-white">{levelProgress}%</span>
              </div>
              <div className="relative h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"
                >
                  <motion.div
                    animate={{
                      x: [-20, 100],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  />
                </motion.div>
              </div>
            </div>

            <p className="text-green-100 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Solo 350 puntos más para alcanzar {nextLevel}
            </p>
          </div>
        </motion.div>

        {/* Estadísticas de impacto - mejoradas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-2 border-green-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md"
            >
              <TrendingUp className="w-6 h-6 text-white" />
            </motion.div>
            <h3>Tu impacto ambiental</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 text-center overflow-hidden border-2 border-blue-200 shadow-md"
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 w-24 h-24 bg-blue-400 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-3"
              >
                ♻️
              </motion.div>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="text-4xl text-blue-600 mb-1"
              >
                {totalWeight} kg
              </motion.p>
              <p className="text-sm text-gray-700">Material reciclado</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-gradient-to-br from-cyan-50 to-teal-100 rounded-2xl p-6 text-center overflow-hidden border-2 border-cyan-200 shadow-md"
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute top-0 right-0 w-24 h-24 bg-cyan-400 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-3"
              >
                💧
              </motion.div>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-4xl text-cyan-600 mb-1"
              >
                100 L
              </motion.p>
              <p className="text-sm text-gray-700">Agua ahorrada</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 text-center overflow-hidden border-2 border-green-200 shadow-md"
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-0 right-0 w-24 h-24 bg-green-400 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-5xl mb-3"
              >
                🌳
              </motion.div>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-4xl text-green-600 mb-1"
              >
                8
              </motion.p>
              <p className="text-sm text-gray-700">Árboles salvados</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-5 text-center"
          >
            <p className="text-sm text-gray-700 flex items-center justify-center gap-2 flex-wrap">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                🌍
              </motion.span>
              <span>
                ¡Increíble! Has reducido aproximadamente{" "}
                <span className="text-green-600">45 kg de CO₂</span> de la
                atmósfera
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Logros - mejorados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-2 border-orange-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md"
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3>Logros desbloqueados</h3>
              <p className="text-sm text-gray-600">
                {achievements.filter(a => a.unlocked).length} de {achievements.length} logros
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                whileHover={{ scale: achievement.unlocked ? 1.1 : 1.05, y: -5 }}
                className={`relative rounded-2xl p-4 text-center cursor-pointer overflow-hidden ${
                  achievement.unlocked
                    ? achievement.rarity === "legendario"
                      ? "bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 border-2 border-yellow-400 shadow-lg"
                      : achievement.rarity === "épico"
                        ? "bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-400 shadow-md"
                        : achievement.rarity === "raro"
                          ? "bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-400"
                          : "bg-gradient-to-br from-orange-50 to-amber-100 border-2 border-orange-300"
                    : "bg-gray-100 border-2 border-gray-300 opacity-50"
                }`}
              >
                {achievement.unlocked && (
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0, 0.2],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-white to-transparent"
                  />
                )}
                <motion.div
                  animate={
                    achievement.unlocked
                      ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-2 relative z-10"
                >
                  {achievement.icon}
                </motion.div>
                <p className="text-xs text-gray-700 relative z-10">
                  {achievement.name}
                </p>
                {achievement.unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10"
                  >
                    <Award className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Historial de reciclajes - mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-2 border-green-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3>Historial de reciclajes</h3>
            <Badge className="bg-green-100 text-green-700">
              {recyclingHistory.length} actividades
            </Badge>
          </div>

          <div className="space-y-3">
            {recyclingHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`flex items-center gap-4 p-5 bg-gradient-to-r ${item.color} rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2 border-white`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md text-3xl"
                >
                  {item.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate mb-1">{item.material}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    <span>📅 {item.date}</span>
                    <span>•</span>
                    <span>⚖️ {item.weight}</span>
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md">
                    +{item.points} pts
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="w-full mt-6 rounded-xl border-2 border-green-500 text-green-600 hover:bg-green-50 py-6"
            >
              Ver historial completo
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Botón cerrar sesión */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="w-full rounded-xl border-2 border-red-300 text-red-600 hover:bg-red-50 py-6"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Cerrar sesión
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
