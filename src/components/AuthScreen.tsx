import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AuthScreenProps {
  onNavigate: (screen: string) => void;
  onAuth: (username: string) => void;
}

export function AuthScreen({ onNavigate, onAuth }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(formData.name || formData.email.split("@")[0]);
  };

  const passwordStrength = formData.password.length > 0 
    ? formData.password.length < 6 
      ? 'weak' 
      : formData.password.length < 10 
        ? 'medium' 
        : 'strong'
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute text-green-300"
            style={{
              left: `${(i * 11) % 100}%`,
              top: `${(i * 13) % 100}%`,
              fontSize: `${2 + (i % 3)}rem`,
            }}
          >
            {["🌿", "♻️", "🌱", "🍃", "🌍", "💚", "🌲", "🌾", "✨", "🌟", "💫", "⭐"][i]}
          </motion.div>
        ))}
      </div>

      {/* Partículas flotantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{
            y: [0, -200],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut",
          }}
          className="absolute pointer-events-none"
          style={{
            left: `${15 + i * 15}%`,
            bottom: 0,
          }}
        >
          <div className="text-2xl">{i % 2 === 0 ? "🍃" : "✨"}</div>
        </motion.div>
      ))}

      <div className="max-w-md w-full relative z-10">
        {/* Botón volver mejorado */}
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate("landing")}
          className="mb-6 flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </motion.button>

        {/* Tarjeta de formulario mejorada */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-white/50 relative overflow-hidden"
        >
          {/* Efecto de brillo de fondo */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10">
            {/* Header con animación */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-4"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-green-600 mb-2"
              >
                {isLogin ? "Bienvenido de nuevo" : "Únete a EcoRecicla"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-sm"
              >
                {isLogin
                  ? "Inicia sesión para continuar reciclando"
                  : "Crea tu cuenta y comienza a cambiar el mundo"}
              </motion.p>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="name" className="text-gray-700">
                      Nombre completo
                    </Label>
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: focusedField === "name" ? 1.05 : 1,
                          color: focusedField === "name" ? "#10b981" : "#9ca3af",
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
                      >
                        <User className="w-5 h-5" />
                      </motion.div>
                      <Input
                        id="name"
                        placeholder="Tu nombre completo"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="pl-10 pr-4 py-6 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:bg-white transition-all"
                      />
                      {formData.name && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: focusedField === "email" ? 1.05 : 1,
                        color: focusedField === "email" ? "#10b981" : "#9ca3af",
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </motion.div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="pl-10 pr-4 py-6 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:bg-white transition-all"
                    />
                    {formData.email && formData.email.includes("@") && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <Check className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: focusedField === "password" ? 1.05 : 1,
                        color: focusedField === "password" ? "#10b981" : "#9ca3af",
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
                    >
                      <Lock className="w-5 h-5" />
                    </motion.div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className="pl-10 pr-12 py-6 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:bg-white transition-all"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>

                  {/* Indicador de fuerza de contraseña */}
                  {!isLogin && formData.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <div className="flex gap-2">
                        {[1, 2, 3].map((level) => (
                          <motion.div
                            key={level}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: level * 0.1 }}
                            className={`h-2 flex-1 rounded-full transition-colors ${
                              level === 1 && passwordStrength
                                ? passwordStrength === 'weak' ? 'bg-red-400' : passwordStrength === 'medium' ? 'bg-yellow-400' : 'bg-green-500'
                                : level === 2 && (passwordStrength === 'medium' || passwordStrength === 'strong')
                                  ? passwordStrength === 'medium' ? 'bg-yellow-400' : 'bg-green-500'
                                  : level === 3 && passwordStrength === 'strong'
                                    ? 'bg-green-500'
                                    : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        {passwordStrength === 'weak' && '⚠️ Contraseña débil'}
                        {passwordStrength === 'medium' && '👍 Contraseña media'}
                        {passwordStrength === 'strong' && '✅ Contraseña fuerte'}
                      </p>
                    </motion.div>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-6 shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                  >
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
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLogin ? "Iniciar sesión" : "Crear cuenta"}
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </motion.form>
            </AnimatePresence>

            {/* Separador con animación */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-4 bg-white text-gray-500"
                  >
                    O continuar con
                  </motion.span>
                </div>
              </div>

              {/* Botones sociales mejorados */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-6 shadow-sm hover:shadow-md transition-all"
                    onClick={() => onAuth("Usuario Google")}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Google</span>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-6 shadow-sm hover:shadow-md transition-all"
                    onClick={() => onAuth("Usuario Facebook")}
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Toggle entre login/registro con animación */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6"
            >
              <p className="text-sm text-gray-600">
                {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                <motion.button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {isLogin ? "Regístrate gratis" : "Inicia sesión"}
                </motion.button>
              </p>
            </motion.div>

            {/* Badge de beneficios si es registro */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
              >
                <p className="text-xs text-center text-gray-700 mb-2">
                  Al registrarte obtienes:
                </p>
                <div className="flex items-center justify-center gap-4 text-xs">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-1 text-green-700"
                  >
                    <span>🎁</span>
                    <span>50 puntos</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-1 text-green-700"
                  >
                    <span>🌟</span>
                    <span>Nivel inicial</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-1 text-green-700"
                  >
                    <span>💚</span>
                    <span>Beneficios</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
