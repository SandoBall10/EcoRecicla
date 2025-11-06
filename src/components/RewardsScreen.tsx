import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Star, Trophy, ArrowRight, Sparkles, Zap, Target, Users, Share2, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface RewardsScreenProps {
  username: string;
}

const availableRewards = [
  {
    id: 1,
    title: "Descuento 20% en café",
    shop: "GreenCoffee",
    points: 100,
    category: "food",
    icon: "☕",
    color: "from-amber-100 to-orange-200",
  },
  {
    id: 2,
    title: "Producto gratis",
    shop: "EcoMarket",
    points: 200,
    category: "shop",
    icon: "🛒",
    color: "from-green-100 to-emerald-200",
  },
  {
    id: 3,
    title: "15% en tu próxima compra",
    shop: "BioTienda",
    points: 150,
    category: "shop",
    icon: "🌿",
    color: "from-lime-100 to-green-200",
  },
  {
    id: 4,
    title: "Entrada 2x1 al cine",
    shop: "CineVerde",
    points: 300,
    category: "entertainment",
    icon: "🎬",
    color: "from-purple-100 to-pink-200",
  },
  {
    id: 5,
    title: "Descuento 25% en comida",
    shop: "VeganBistro",
    points: 180,
    category: "food",
    icon: "🥗",
    color: "from-green-100 to-teal-200",
  },
  {
    id: 6,
    title: "Clase de yoga gratis",
    shop: "ZenStudio",
    points: 120,
    category: "wellness",
    icon: "🧘",
    color: "from-blue-100 to-cyan-200",
  },
];

const myRewards = [
  {
    id: 1,
    title: "10% en café",
    shop: "GreenCoffee",
    code: "ECO2025",
    validUntil: "30 Nov 2025",
    icon: "☕",
  },
  {
    id: 2,
    title: "Descuento 15% EcoMarket",
    shop: "EcoMarket",
    code: "GREEN15",
    validUntil: "25 Nov 2025",
    icon: "🛒",
  },
];

export function RewardsScreen({ username }: RewardsScreenProps) {
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [hoveredReward, setHoveredReward] = useState<number | null>(null);
  const monthlyGoal = 2000;
  const goalProgress = (currentPoints / monthlyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 pb-24 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute text-8xl opacity-5"
          style={{
            left: `${10 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
        >
          {["🎁", "⭐", "💎", "🏆", "✨", "🎯"][i]}
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto py-6 space-y-6 relative z-10">
        {/* Encabezado con puntos - mejorado */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-3xl shadow-2xl p-8 text-white overflow-hidden"
        >
          {/* Efectos de fondo */}
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
                <p className="text-orange-100 mb-1 text-sm">Tus puntos EcoRecicla</p>
                <motion.h1
                  className="text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.span
                    key={currentPoints}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    {currentPoints}
                  </motion.span>{" "}
                  puntos
                </motion.h1>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  Nivel: Eco Guardián 🌿
                </Badge>
              </div>
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
                className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg"
              >
                <Sparkles className="w-12 h-12" />
              </motion.div>
            </div>

            {/* Barra de progreso mejorada */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-100">Meta mensual</span>
                <span className="text-white">
                  {currentPoints} / {monthlyGoal}
                </span>
              </div>
              <div className="relative h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goalProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full relative"
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
              <p className="text-orange-100 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                ¡Solo {monthlyGoal - currentPoints} puntos más para tu siguiente recompensa premium!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pestañas de recompensas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
              <TabsTrigger value="available" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-600 data-[state=active]:text-white">
                <Gift className="w-4 h-4 mr-2" />
                Disponibles
              </TabsTrigger>
              <TabsTrigger value="my-rewards" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                <Trophy className="w-4 h-4 mr-2" />
                Mis recompensas
              </TabsTrigger>
            </TabsList>

            {/* Recompensas disponibles - mejoradas */}
            <TabsContent value="available" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {availableRewards.map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    onHoverStart={() => setHoveredReward(reward.id)}
                    onHoverEnd={() => setHoveredReward(null)}
                    className={`relative bg-white rounded-2xl shadow-lg p-6 border-2 transition-all overflow-hidden ${
                      currentPoints >= reward.points
                        ? "border-orange-300 hover:border-orange-400"
                        : "border-gray-200 opacity-75"
                    }`}
                  >
                    {/* Efecto de brillo al hover */}
                    <AnimatePresence>
                      {hoveredReward === reward.id && currentPoints >= reward.points && (
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          exit={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent"
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          animate={{
                            rotate: hoveredReward === reward.id ? [0, -10, 10, 0] : 0,
                            scale: hoveredReward === reward.id ? 1.1 : 1,
                          }}
                          className={`w-20 h-20 bg-gradient-to-br ${reward.color} rounded-2xl flex items-center justify-center flex-shrink-0 text-4xl shadow-md`}
                        >
                          {reward.icon}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm mb-1 truncate">{reward.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{reward.shop}</p>
                          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0">
                            <Star className="w-3 h-3 mr-1" />
                            {reward.points} pts
                          </Badge>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          disabled={currentPoints < reward.points}
                          className={`w-full rounded-xl shadow-md ${
                            currentPoints >= reward.points
                              ? "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {currentPoints >= reward.points ? "Canjear ahora" : `Faltan ${reward.points - currentPoints} pts`}
                          {currentPoints >= reward.points && (
                            <ArrowRight className="ml-2 w-4 h-4" />
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Mis recompensas - mejoradas */}
            <TabsContent value="my-rewards" className="space-y-4">
              {myRewards.length > 0 ? (
                <div className="space-y-4">
                  {myRewards.map((reward, index) => (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="relative bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200 overflow-hidden"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.05, 0.1, 0.05],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full blur-2xl"
                      />

                      <div className="relative z-10 flex items-start gap-4">
                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center flex-shrink-0 text-4xl shadow-md"
                        >
                          {reward.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">{reward.title}</h4>
                          <p className="text-xs text-gray-600 mb-4">
                            {reward.shop}
                          </p>

                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4 border-2 border-green-200">
                            <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Código de descuento
                            </p>
                            <motion.p
                              whileHover={{ scale: 1.05 }}
                              className="text-2xl text-green-600 tracking-wider font-mono cursor-pointer"
                            >
                              {reward.code}
                            </motion.p>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <span>⏰</span>
                              Válido hasta: {reward.validUntil}
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                                Usar ahora
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl shadow-lg p-12 text-center"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl"
                  >
                    🎁
                  </motion.div>
                  <h3 className="mb-2">No tienes recompensas canjeadas</h3>
                  <p className="text-gray-600 mb-6">
                    Canjea tus puntos por increíbles beneficios en la pestaña de "Disponibles"
                  </p>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Cómo ganar más puntos - mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-orange-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md"
            >
              <Trophy className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-gray-800">Cómo ganar más puntos</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Zap,
                emoji: "♻️",
                title: "Recicla materiales",
                points: "+10 pts por kg",
                color: "from-green-50 to-emerald-50",
                borderColor: "border-green-200",
              },
              {
                icon: Target,
                emoji: "🚗",
                title: "Solicita recojos",
                points: "+50 pts por recojo",
                color: "from-orange-50 to-amber-50",
                borderColor: "border-orange-200",
              },
              {
                icon: Star,
                emoji: "📍",
                title: "Visita puntos verdes",
                points: "+25 pts por visita",
                color: "from-blue-50 to-cyan-50",
                borderColor: "border-blue-200",
              },
              {
                icon: Users,
                emoji: "👥",
                title: "Invita amigos",
                points: "+100 pts por amigo",
                color: "from-purple-50 to-pink-50",
                borderColor: "border-purple-200",
              },
              {
                icon: Share2,
                emoji: "📱",
                title: "Comparte en redes",
                points: "+15 pts por publicación",
                color: "from-cyan-50 to-teal-50",
                borderColor: "border-cyan-200",
              },
              {
                icon: Award,
                emoji: "🌟",
                title: "Completa desafíos",
                points: "+200 pts por desafío",
                color: "from-yellow-50 to-orange-50",
                borderColor: "border-yellow-200",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-5 text-center border-2 ${item.borderColor} shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="relative inline-block mb-3"
                  >
                    <div className="text-5xl">{item.emoji}</div>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-current rounded-full opacity-20"
                    />
                  </motion.div>
                  <p className="text-sm mb-2">{item.title}</p>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 text-xs">
                    {item.points}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Banner motivacional - mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 text-white text-center overflow-hidden"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.5, 1],
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity },
            }}
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
          />

          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🌟
            </motion.div>
            <h3 className="text-white mb-2">
              ¡Sigue reciclando, {username}!
            </h3>
            <p className="text-green-100 mb-6 max-w-md mx-auto">
              Cada punto cuenta para un planeta más verde. ¡Estás haciendo la diferencia! 🌍
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white text-green-600 hover:bg-green-50 rounded-xl px-8 py-6 shadow-lg">
                Ver todas las recompensas
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
