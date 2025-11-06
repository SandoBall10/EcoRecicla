import { useState } from "react";
import { Home, MapPin, Package, Gift, User, Bell, Recycle, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LandingPage } from "./components/LandingPage";
import { AuthScreen } from "./components/AuthScreen";
import { MapScreen } from "./components/MapScreen";
import { PickupRequest } from "./components/PickupRequest";
import { TrackingScreen } from "./components/TrackingScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { RewardsScreen } from "./components/RewardsScreen";
import { PartnersScreen } from "./components/PartnersScreen";
import { SegregationGuide } from "./components/SegregationGuide";
import { SegregationGuideContent } from "./components/SegregationGuideContent";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

type Screen =
  | "landing"
  | "auth"
  | "home"
  | "map"
  | "pickup"
  | "tracking"
  | "rewards"
  | "partners"
  | "profile"
  | "segregation";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("EcoUsuario");
  const [notifications, setNotifications] = useState(3);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleAuth = (name: string) => {
    setUsername(name);
    setIsAuthenticated(true);
    setCurrentScreen("home");
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const navigationItems = [
    { id: "home" as Screen, icon: Home, label: "Inicio" },
    { id: "map" as Screen, icon: MapPin, label: "Mapa" },
    { id: "pickup" as Screen, icon: Package, label: "Recojo" },
    { id: "rewards" as Screen, icon: Gift, label: "Recompensas" },
    { id: "profile" as Screen, icon: User, label: "Perfil" },
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case "landing":
        return <LandingPage onNavigate={handleNavigate} />;
      case "auth":
        return <AuthScreen onNavigate={handleNavigate} onAuth={handleAuth} />;
      case "home":
        return <HomeScreen onNavigate={handleNavigate} username={username} />;
      case "map":
        return <MapScreen onNavigate={handleNavigate} />;
      case "pickup":
        return <PickupRequest onNavigate={handleNavigate} />;
      case "tracking":
        return <TrackingScreen onNavigate={handleNavigate} />;
      case "rewards":
        return <RewardsScreen username={username} />;
      case "partners":
        return <PartnersScreen onNavigate={handleNavigate} />;
      case "profile":
        return <ProfileScreen username={username} />;
      case "segregation":
        return <SegregationGuide onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Botón flotante de guía de segregación */}
      {isAuthenticated && currentScreen === "home" && (
        <Dialog open={isGuideOpen} onOpenChange={setIsGuideOpen}>
          <DialogTrigger asChild>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="fixed bottom-24 right-4 z-40"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity },
                }}
              >
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full shadow-2xl px-6 py-7 gap-2 overflow-hidden group"
                >
                  {/* Efecto de brillo */}
                  <motion.div
                    animate={{
                      x: [-200, 200],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  
                  {/* Icono con animación */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="relative z-10"
                  >
                    <BookOpen className="w-6 h-6" />
                  </motion.div>
                  
                  <span className="relative z-10 hidden sm:inline">Guía de Segregación</span>
                  
                  {/* Badge de nuevo/importante */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Recycle className="w-3 h-3 text-white" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-green-600 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Recycle className="w-6 h-6" />
                </motion.div>
                Guía de Segregación
              </DialogTitle>
              <DialogDescription>
                Aprende a separar correctamente tus residuos para maximizar tu impacto ambiental
              </DialogDescription>
            </DialogHeader>
            <div className="px-6">
              <SegregationGuideContent />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Barra de navegación inferior (solo para usuarios autenticados) */}
      {isAuthenticated && !["landing", "auth"].includes(currentScreen) && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
        >
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-around py-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[60px]"
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className={`relative ${
                        isActive ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      {item.id === "profile" && notifications > 0 && (
                        <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                          {notifications}
                        </Badge>
                      )}
                    </div>
                    <span
                      className={`text-xs mt-1 ${
                        isActive ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </div>
  );
}

// Componente de pantalla de inicio
function HomeScreen({
  onNavigate,
  username,
}: {
  onNavigate: (screen: Screen) => void;
  username: string;
}) {
  const [recycleCount, setRecycleCount] = useState(0);
  const [pointsCount, setPointsCount] = useState(0);

  // Animación de contador
  useState(() => {
    const recycleInterval = setInterval(() => {
      setRecycleCount((prev) => {
        if (prev < 25) return prev + 1;
        clearInterval(recycleInterval);
        return prev;
      });
    }, 50);

    const pointsInterval = setInterval(() => {
      setPointsCount((prev) => {
        if (prev < 350) return prev + 10;
        clearInterval(pointsInterval);
        return prev;
      });
    }, 20);

    return () => {
      clearInterval(recycleInterval);
      clearInterval(pointsInterval);
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 pb-24 relative overflow-hidden">
      {/* Elementos decorativos flotantes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 text-6xl opacity-10"
      >
        ♻️
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-40 left-10 text-5xl opacity-10"
      >
        🌱
      </motion.div>
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 text-4xl opacity-10"
      >
        🌿
      </motion.div>

      <div className="max-w-4xl mx-auto py-6 space-y-6 relative z-10">
        {/* Encabezado mejorado */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative"
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-green-600 mb-1"
              >
                ¡Hola, {username}! 👋
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600"
              >
                ¿Qué deseas reciclar hoy?
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="icon"
                variant="outline"
                className="rounded-full relative shadow-lg border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Bell className="w-5 h-5 text-green-600" />
                </motion.div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full text-white text-xs flex items-center justify-center shadow-lg"
                >
                  3
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero card con nivel del usuario */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-3xl p-8 shadow-2xl overflow-hidden">
            {/* Fondo animado con brillo */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
            />

            <div className="relative z-10 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-green-100 text-sm mb-1">Tu nivel actual</p>
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="text-4xl"
                    >
                      🌿
                    </motion.span>
                    <h3 className="text-white">Eco Guardián</h3>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2"
                >
                  <p className="text-2xl">Nivel 5</p>
                </motion.div>
              </div>

              {/* Barra de progreso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-100">Progreso al siguiente nivel</span>
                  <span className="text-white">75%</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full relative"
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
                <p className="text-green-100 text-xs">
                  ¡Solo 125 puntos más para Nivel 6! 🚀
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tarjetas de acción principales - mejoradas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-5"
        >
          <motion.button
            onClick={() => onNavigate("map")}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: -5,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative group bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-left text-white shadow-2xl overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Efecto de brillo al hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
              >
                <MapPin className="w-16 h-16" strokeWidth={2} />
              </motion.div>
              <h3 className="text-white mb-2">Encuentra puntos de reciclaje</h3>
              <p className="text-green-100 text-sm mb-4">
                Localiza centros cercanos en el mapa interactivo
              </p>
              <div className="flex items-center gap-2 text-green-100 text-sm">
                <span>Explorar ahora</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>

            {/* Decoración flotante */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-4 right-4 text-6xl opacity-20"
            >
              📍
            </motion.div>
          </motion.button>

          <motion.button
            onClick={() => onNavigate("pickup")}
            whileHover={{
              scale: 1.05,
              rotateY: -5,
              rotateX: -5,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative group bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-left text-white shadow-2xl overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Efecto de brillo al hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="relative z-10"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
              >
                <Package className="w-16 h-16" strokeWidth={2} />
              </motion.div>
              <h3 className="text-white mb-2">Solicitar recojo</h3>
              <p className="text-orange-100 text-sm mb-4">
                Recogeremos tus reciclables en tu domicilio
              </p>
              <div className="flex items-center gap-2 text-orange-100 text-sm">
                <span>Programar ahora</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>

            {/* Decoración flotante */}
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-4 right-4 text-6xl opacity-20"
            >
              📦
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Estadísticas rápidas - animadas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-green-100"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-gray-800">Tu impacto este mes</h3>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-2xl">🌍</div>
            </motion.div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md border-2 border-green-100 cursor-pointer"
            >
              <motion.p
                className="text-3xl text-green-600 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {recycleCount} kg
              </motion.p>
              <p className="text-xs text-gray-600">Reciclado</p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl mt-2"
              >
                ♻️
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-md border-2 border-blue-100 cursor-pointer"
            >
              <motion.p
                className="text-3xl text-blue-600 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {pointsCount}
              </motion.p>
              <p className="text-xs text-gray-600">Puntos</p>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl mt-2"
              >
                ⭐
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-md border-2 border-orange-100 cursor-pointer"
            >
              <motion.p
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl text-orange-600 mb-1"
              >
                🌿
              </motion.p>
              <p className="text-xs text-gray-600">Eco Guardián</p>
              <p className="text-xs text-orange-600 mt-1">Nivel 5</p>
            </motion.div>
          </div>

          {/* Logros recientes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-5 pt-5 border-t border-gray-100"
          >
            <p className="text-sm text-gray-600 mb-3">Logros recientes 🏆</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { icon: "🎯", name: "Primera Semana", color: "bg-purple-100 text-purple-700" },
                { icon: "💚", name: "Eco Héroe", color: "bg-green-100 text-green-700" },
                { icon: "🔥", name: "Racha 7 días", color: "bg-orange-100 text-orange-700" },
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl ${achievement.color} text-xs whitespace-nowrap shadow-sm`}
                >
                  <span className="text-lg">{achievement.icon}</span>
                  <span>{achievement.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Tiendas destacadas - mejoradas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-orange-100"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                🎁
              </motion.span>
              <h3 className="text-gray-800">Beneficios destacados</h3>
            </div>
            <Button
              onClick={() => onNavigate("partners")}
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              Ver todos →
            </Button>
          </div>

          <div className="space-y-3">
            {[
              { name: "GreenCoffee", benefit: "10% descuento", icon: "☕", points: "50 pts", color: "from-amber-100 to-orange-200" },
              { name: "EcoMarket", benefit: "Producto gratis", icon: "🛒", points: "150 pts", color: "from-green-100 to-emerald-200" },
              { name: "VeganBistro", benefit: "Postre gratis", icon: "🥗", points: "100 pts", color: "from-lime-100 to-green-200" },
            ].map((shop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2 border-gray-100 hover:border-green-200 overflow-hidden group"
                onClick={() => onNavigate("partners")}
              >
                {/* Efecto de brillo al hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`relative z-10 w-16 h-16 bg-gradient-to-br ${shop.color} rounded-2xl flex items-center justify-center text-3xl shadow-md`}
                >
                  {shop.icon}
                </motion.div>
                <div className="flex-1 relative z-10">
                  <p className="text-sm mb-1">{shop.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{shop.benefit}</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
                      {shop.points}
                    </Badge>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-green-600"
                    >
                      Disponible →
                    </motion.span>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.1 }} className="relative z-10">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md px-4 py-2">
                    Canjear
                  </Badge>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Próximos recojos - mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-orange-100"
        >
          <div className="flex items-center gap-2 mb-5">
            <motion.span
              animate={{
                x: [0, 3, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl"
            >
              🚗
            </motion.span>
            <h3 className="text-gray-800">Próximos recojos</h3>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="relative bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100 rounded-2xl p-6 border-2 border-orange-200 overflow-hidden group hover:shadow-lg transition-shadow"
          >
            {/* Animación de fondo pulsante */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-0 right-0 w-32 h-32 bg-orange-300 rounded-full blur-2xl"
            />

            <div className="relative z-10 flex items-start gap-4">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg"
              >
                🚗
              </motion.div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm mb-1">Recojo programado</p>
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-2xl"
                      >
                        ⏰
                      </motion.span>
                      <p className="text-xs text-gray-700">
                        Hoy, 15:00 - 16:00
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="bg-green-500 text-white shadow-md">
                      Confirmado ✓
                    </Badge>
                  </motion.div>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  📍 Jr. Los Pinos 123, San Isidro
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => onNavigate("tracking")}
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-md"
                  >
                    <span>Ver seguimiento en vivo</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-1"
                    >
                      →
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Consejo rápido */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200"
          >
            <div className="flex items-start gap-3">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl flex-shrink-0"
              >
                💡
              </motion.span>
              <div>
                <p className="text-xs mb-1">Tip del día</p>
                <p className="text-xs text-gray-700">
                  Asegúrate de limpiar y secar tus reciclables antes del recojo para maximizar su
                  valor de reciclaje.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
