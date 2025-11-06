import { motion } from "motion/react";
import { Leaf, ArrowRight, Sparkles, Globe, Recycle, Gift, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface LandingPageProps {
  onNavigate: (screen: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo animados */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 text-8xl opacity-10"
      >
        🌍
      </motion.div>
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 text-7xl opacity-10"
      >
        ♻️
      </motion.div>
      <motion.div
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/4 text-6xl opacity-10"
      >
        🌱
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 left-1/4 text-6xl opacity-10"
      >
        🌿
      </motion.div>

      {/* Partículas flotantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            bottom: 0,
          }}
        >
          <div className="text-2xl">
            {i % 3 === 0 ? "🍃" : i % 3 === 1 ? "💚" : "✨"}
          </div>
        </motion.div>
      ))}

      <div className="max-w-lg w-full text-center space-y-8 relative z-10">
        {/* Logo animado ultra mejorado */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            bounce: 0.6,
          }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Anillos pulsantes */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl blur-xl"
            />

            {/* Logo principal */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 p-8 rounded-3xl shadow-2xl"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Leaf className="w-24 h-24 text-white drop-shadow-lg" strokeWidth={2.5} />
              </motion.div>

              {/* Brillo animado */}
              <motion.div
                animate={{
                  x: [-100, 100],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl"
              />
            </motion.div>

            {/* Sparkles decorativos */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-2 -left-2"
            >
              <Sparkles className="w-6 h-6 text-green-400 fill-green-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Título con animación de letras */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-3"
        >
          <motion.h1
            className="text-green-600 relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>EcoRecicla</span>
            <motion.div
              animate={{
                width: ["0%", "100%"],
              }}
              transition={{
                delay: 0.7,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 px-4 text-lg"
          >
            Recicla hoy, cuida el mañana
          </motion.p>

          {/* Badge animado */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg text-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span>+10,000 usuarios activos</span>
          </motion.div>
        </motion.div>

        {/* Características animadas - mejoradas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-4 py-4"
        >
          {[
            {
              icon: Globe,
              emoji: "🌍",
              label: "Planeta",
              color: "from-blue-400 to-cyan-500",
              delay: 0,
            },
            {
              icon: Recycle,
              emoji: "♻️",
              label: "Recicla",
              color: "from-green-400 to-emerald-500",
              delay: 0.1,
            },
            {
              icon: Gift,
              emoji: "🎁",
              label: "Recompensas",
              color: "from-orange-400 to-amber-500",
              delay: 0.2,
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1.1 + item.delay,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-gray-100 hover:border-green-200"
            >
              {/* Brillo de fondo al hacer hover */}
              <motion.div
                animate={{
                  opacity: hoveredCard === index ? 0.1 : 0,
                }}
                className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl`}
              />

              <motion.div
                animate={{
                  rotate: hoveredCard === index ? [0, -10, 10, 0] : 0,
                  scale: hoveredCard === index ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <p className="text-xs text-gray-600">{item.label}</p>
              </motion.div>

              {/* Partículas al hacer hover */}
              {hoveredCard === index && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, opacity: 1, scale: 0 }}
                      animate={{
                        y: -50,
                        opacity: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                      className="absolute"
                      style={{
                        left: `${30 + i * 20}%`,
                        top: "50%",
                      }}
                    >
                      <span className="text-lg">✨</span>
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Estadísticas rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="grid grid-cols-3 gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-2 border-white shadow-lg"
        >
          {[
            { value: "25K", label: "Kg reciclados", icon: "♻️" },
            { value: "5K", label: "Usuarios", icon: "👥" },
            { value: "100+", label: "Tiendas", icon: "🏪" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.4 + index * 0.1,
                type: "spring",
              }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="text-2xl mb-1"
              >
                {stat.icon}
              </motion.div>
              <p className="text-green-600 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Botones mejorados con efectos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="space-y-4 pt-2"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={() => onNavigate("auth")}
              className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full py-7 shadow-2xl hover:shadow-3xl transition-all overflow-hidden group"
            >
              {/* Efecto de brillo animado */}
              <motion.div
                animate={{
                  x: [-200, 200],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />

              <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                Registrarse
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={() => onNavigate("auth")}
              variant="outline"
              className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 rounded-full py-7 text-lg shadow-lg hover:shadow-xl transition-all group"
            >
              <span className="flex items-center justify-center gap-2">
                Iniciar sesión
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Decoración inferior animada */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="pt-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex justify-center items-center gap-3 text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 shadow-md border border-green-100"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl"
            >
              🌱
            </motion.span>
            <span className="font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Juntos por un mundo más verde
            </span>
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-xl"
            >
              🌱
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
