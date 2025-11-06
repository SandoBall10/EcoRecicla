import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, Package, ArrowLeft, Check, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PickupRequestProps {
  onNavigate: (screen: string) => void;
}

export function PickupRequest({ onNavigate }: PickupRequestProps) {
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    address: "",
    material: "",
    quantity: "",
    date: "",
    time: "",
    notes: "",
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Partículas de celebración */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 1, scale: 0 }}
            animate={{
              y: -500,
              opacity: 0,
              scale: 1,
              rotate: 360,
            }}
            transition={{
              duration: 2 + i * 0.1,
              delay: i * 0.1,
              ease: "easeOut",
            }}
            className="absolute"
            style={{
              left: `${10 + i * 6}%`,
              bottom: "50%",
            }}
          >
            <span className="text-3xl">
              {["🎉", "✨", "🌟", "💚", "♻️"][i % 5]}
            </span>
          </motion.div>
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="max-w-md w-full text-center space-y-6 relative z-10"
        >
          {/* Checkmark animado */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-green-400 rounded-full blur-xl"
              />
              <div className="relative w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <Check className="w-14 h-14 text-white" strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-green-600 mb-2">¡Solicitud confirmada!</h2>
            <p className="text-gray-600">
              El recolector está en camino a tu dirección
            </p>
          </motion.div>

          {/* Card del vehículo */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
            className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-green-100"
          >
            <motion.div
              animate={{
                x: [0, 15, 0],
                y: [0, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              🚗💨
            </motion.div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tiempo estimado</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                  className="text-3xl text-green-600"
                >
                  15-20 min
                </motion.p>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </motion.div>

          {/* Detalles de la solicitud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 space-y-2 text-left border-2 border-green-200"
          >
            <p className="text-sm text-gray-700 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Dirección:</strong> {formData.address}</span>
            </p>
            <p className="text-sm text-gray-700 flex items-start gap-2">
              <Package className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Material:</strong> {formData.material}</span>
            </p>
            <p className="text-sm text-gray-700 flex items-start gap-2">
              <Calendar className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span><strong>Cantidad:</strong> {formData.quantity}</span>
            </p>
          </motion.div>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="space-y-3"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => onNavigate("tracking")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-6 shadow-lg"
              >
                Ver seguimiento en tiempo real
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => onNavigate("map")}
                variant="outline"
                className="w-full rounded-xl py-6 border-2"
              >
                Volver al mapa
              </Button>
            </motion.div>
          </motion.div>

          {/* Badge de puntos */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">¡Ganarás +50 puntos con este recojo!</span>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("map")}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </motion.button>

          <div className="text-right">
            <p className="text-xs text-gray-600">Paso {currentStep} de {totalSteps}</p>
            <Progress value={progress} className="h-2 w-32 mt-1" />
          </div>
        </motion.div>

        {/* Indicador de pasos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: currentStep === stepNum ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  currentStep >= stepNum
                    ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {currentStep > stepNum ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span>{stepNum}</span>
                )}
              </motion.div>
              {stepNum < 3 && (
                <div
                  className={`w-12 h-1 rounded-full transition-colors ${
                    currentStep > stepNum ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Formulario con pasos */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-2 border-green-100"
        >
          {/* Header del formulario */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mb-4 shadow-lg"
            >
              <Package className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-green-600 mb-2">Solicitar recojo a domicilio</h2>
            <p className="text-gray-600 text-sm">
              {currentStep === 1 && "Indícanos dónde recoger"}
              {currentStep === 2 && "Detalles del material"}
              {currentStep === 3 && "Programa tu recojo"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Paso 1: Ubicación */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-5 h-5 text-green-600" />
                      Dirección exacta
                    </Label>
                    <Input
                      id="address"
                      placeholder="Ej: Jr. Los Pinos 123, San Isidro"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 py-6"
                      required
                    />
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <p className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-xl">💡</span>
                      <span>
                        Asegúrate de incluir referencias para facilitar la ubicación del recolector
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Paso 2: Material y cantidad */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="material" className="text-gray-700">
                      Tipo de material
                    </Label>
                    <Select
                      value={formData.material}
                      onValueChange={(value) =>
                        setFormData({ ...formData, material: value })
                      }
                    >
                      <SelectTrigger className="rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 py-6">
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plastico">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              🍾
                            </div>
                            <span>Plástico</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="carton">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                              📦
                            </div>
                            <span>Cartón</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="vidrio">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                              🫙
                            </div>
                            <span>Vidrio</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="metal">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              🥫
                            </div>
                            <span>Metal</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="electronicos">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              💻
                            </div>
                            <span>Electrónicos</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="mixto">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              ♻️
                            </div>
                            <span>Mixto</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-gray-700">
                      Cantidad estimada
                    </Label>
                    <Select
                      value={formData.quantity}
                      onValueChange={(value) =>
                        setFormData({ ...formData, quantity: value })
                      }
                    >
                      <SelectTrigger className="rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 py-6">
                        <SelectValue placeholder="Selecciona la cantidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">
                          <div className="flex items-center gap-2">
                            <span>📦</span>
                            <span>Pequeña (1-5 kg)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center gap-2">
                            <span>📦📦</span>
                            <span>Media (5-15 kg)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="large">
                          <div className="flex items-center gap-2">
                            <span>📦📦📦</span>
                            <span>Grande (15-30 kg)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="xlarge">
                          <div className="flex items-center gap-2">
                            <span>📦📦📦📦</span>
                            <span>Muy grande (+30 kg)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {/* Paso 3: Fecha y notas */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-5 h-5 text-green-600" />
                        Fecha preferida
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 py-6"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-gray-700">
                        Hora preferida
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className="rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 py-6"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-gray-700">
                      Notas adicionales (opcional)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Instrucciones especiales, referencias, ubicación exacta del material..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 min-h-32"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botones de navegación */}
            <div className="pt-6 flex gap-3">
              {currentStep > 1 && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="w-full rounded-xl py-6 border-2"
                  >
                    Anterior
                  </Button>
                </motion.div>
              )}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-6"
                    disabled={
                      (currentStep === 1 && !formData.address) ||
                      (currentStep === 2 && (!formData.material || !formData.quantity))
                    }
                  >
                    Continuar
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl py-6"
                    disabled={!formData.date || !formData.time}
                  >
                    Confirmar recojo
                    <Check className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </motion.div>
            </div>
          </form>
        </motion.div>

        {/* Beneficios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: "🎁", text: "Gana puntos por cada recojo", color: "from-orange-50 to-amber-50" },
            { icon: "🌍", text: "Contribuye al medio ambiente", color: "from-green-50 to-emerald-50" },
            { icon: "📱", text: "Seguimiento en tiempo real", color: "from-blue-50 to-cyan-50" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-5 text-center shadow-md border-2 border-white`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                className="text-4xl mb-2"
              >
                {item.icon}
              </motion.div>
              <p className="text-sm text-gray-700">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
