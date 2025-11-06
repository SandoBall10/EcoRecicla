import { motion } from "motion/react";
import {
  Recycle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Droplet,
  Leaf,
  Box,
  Lightbulb,
} from "lucide-react";
import { Card } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface MaterialCategory {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
  examples: string[];
  tips: string[];
  doList: string[];
  dontList: string[];
}

const materials: MaterialCategory[] = [
  {
    id: "plastic",
    name: "Plástico",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: "♻️",
    description: "Botellas, envases, bolsas y contenedores plásticos",
    examples: [
      "Botellas de agua y bebidas (PET)",
      "Envases de productos de limpieza",
      "Bolsas plásticas limpias",
      "Tapas y tapones plásticos",
      "Envases de yogurt y margarina",
    ],
    tips: [
      "Enjuaga los envases antes de reciclar",
      "Retira las etiquetas cuando sea posible",
      "Aplasta las botellas para ahorrar espacio",
      "Separa las tapas del cuerpo del envase",
    ],
    doList: [
      "Botellas PET limpias y secas",
      "Envases de champú vacíos",
      "Bolsas plásticas sin residuos",
      "Envases de productos lácteos limpios",
    ],
    dontList: [
      "Plásticos con restos de comida",
      "Empaques de alimentos sucios",
      "Plásticos mezclados con otros materiales",
      "Film plástico muy sucio o contaminado",
    ],
  },
  {
    id: "paper",
    name: "Papel y Cartón",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: "📄",
    description: "Periódicos, revistas, cajas y papel de oficina",
    examples: [
      "Periódicos y revistas",
      "Cajas de cartón",
      "Papel de oficina y cuadernos",
      "Folletos y catálogos",
      "Cartón de embalaje",
    ],
    tips: [
      "Mantén el papel seco y limpio",
      "Aplana las cajas de cartón",
      "Retira cintas adhesivas y grapas",
      "Agrupa papeles similares juntos",
    ],
    doList: [
      "Periódicos y revistas secas",
      "Cajas de cartón aplanadas",
      "Papel de oficina usado",
      "Sobres sin ventanas de plástico",
    ],
    dontList: [
      "Papel con grasa o aceite",
      "Servilletas o papel higiénico usado",
      "Papel carbón o térmico",
      "Cartón mojado o con moho",
    ],
  },
  {
    id: "glass",
    name: "Vidrio",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: "🍾",
    description: "Botellas, frascos y envases de vidrio",
    examples: [
      "Botellas de bebidas",
      "Frascos de conservas",
      "Envases de perfumes",
      "Botellas de vino y cerveza",
      "Tarros de mermelada",
    ],
    tips: [
      "Enjuaga el vidrio antes de reciclar",
      "Retira tapas y corchos",
      "Separa por colores si es posible",
      "No es necesario quitar etiquetas",
    ],
    doList: [
      "Botellas y frascos limpios",
      "Vidrio transparente o de color",
      "Envases de alimentos de vidrio",
      "Botellas de bebidas vacías",
    ],
    dontList: [
      "Vidrio roto (entrega en punto específico)",
      "Espejos y cristales de ventanas",
      "Bombillas y fluorescentes",
      "Cerámica o porcelana",
    ],
  },
  {
    id: "metal",
    name: "Metal y Latas",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    icon: "🥫",
    description: "Latas de aluminio, hojalata y metales",
    examples: [
      "Latas de bebidas (aluminio)",
      "Latas de conservas (hojalata)",
      "Tapas metálicas",
      "Papel aluminio limpio",
      "Envases de aerosol vacíos",
    ],
    tips: [
      "Enjuaga las latas antes de reciclar",
      "Aplasta las latas para ahorrar espacio",
      "Retira restos de comida completamente",
      "Separa aluminio de otros metales si es posible",
    ],
    doList: [
      "Latas de bebidas limpias",
      "Latas de conservas vacías",
      "Tapas y tapones metálicos",
      "Papel aluminio sin residuos",
    ],
    dontList: [
      "Latas con restos de comida",
      "Aerosoles sin vaciar completamente",
      "Latas oxidadas o dañadas",
      "Objetos metálicos mezclados con plástico",
    ],
  },
  {
    id: "organic",
    name: "Orgánicos",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: "🌱",
    description: "Restos de frutas, verduras y residuos compostables",
    examples: [
      "Cáscaras de frutas y verduras",
      "Restos de café y té",
      "Hojas secas y ramas pequeñas",
      "Cáscaras de huevo",
      "Restos de comida no procesada",
    ],
    tips: [
      "Mantén separado de otros residuos",
      "Usa bolsas compostables o biodegradables",
      "Evita mezclar con aceites o grasas en exceso",
      "Considera hacer compost en casa",
    ],
    doList: [
      "Cáscaras y restos vegetales",
      "Restos de café y bolsitas de té",
      "Hojas y residuos de jardín",
      "Cáscaras de huevo trituradas",
    ],
    dontList: [
      "Carnes, huesos o productos de origen animal",
      "Comida procesada o con salsas",
      "Aceites y grasas en exceso",
      "Plantas enfermas o tratadas con químicos",
    ],
  },
];

export function SegregationGuideContent() {
  return (
    <ScrollArea className="h-[calc(80vh-100px)] pr-4">
      <div className="space-y-6 pb-6">
        {/* Introducción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg border-2 border-green-200">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl shadow-md"
              >
                💚
              </motion.div>
              <div className="flex-1">
                <h3 className="mb-2 text-green-600">¿Por qué segregar correctamente?</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  La segregación adecuada de residuos es fundamental para el reciclaje efectivo.
                  Al separar correctamente, ayudas a reducir la contaminación, conservar recursos
                  naturales y proteger el medio ambiente para las futuras generaciones.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm"
                  >
                    <Recycle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Mejora el reciclaje</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm"
                  >
                    <Droplet className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Reduce contaminación</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm"
                  >
                    <Leaf className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Protege el planeta</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Categorías de materiales */}
        <div className="space-y-4">
          <h3 className="text-gray-800 flex items-center gap-2">
            <Box className="w-6 h-6 text-green-600" />
            Categorías de Residuos
          </h3>

          {materials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className={`overflow-hidden border-2 ${material.borderColor} shadow-md hover:shadow-lg transition-shadow`}>
                <div className={`${material.bgColor} p-4 border-b-2 ${material.borderColor}`}>
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-4xl"
                    >
                      {material.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className={material.color}>{material.name}</h4>
                      <p className="text-sm text-gray-600">{material.description}</p>
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="examples" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Ejemplos de materiales</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {material.examples.map((example, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{example}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tips" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">Consejos importantes</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {material.tips.map((tip, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="text-yellow-500 flex-shrink-0">💡</span>
                            <span>{tip}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="do-dont" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Recycle className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Qué SÍ y qué NO incluir</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-green-500">SÍ incluir ✓</Badge>
                          </div>
                          <ul className="space-y-2">
                            {material.doList.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-2 text-sm text-gray-700"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-red-500">NO incluir ✗</Badge>
                          </div>
                          <ul className="space-y-2">
                            {material.dontList.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-2 text-sm text-gray-700"
                              >
                                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Reglas generales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg">
            <h3 className="text-orange-600 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Reglas de Oro del Reciclaje
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Limpio y seco",
                  desc: "Los materiales deben estar limpios y secos antes de reciclar",
                  icon: "💧",
                },
                {
                  title: "Sin mezclas",
                  desc: "Separa los materiales por tipo, no mezcles diferentes categorías",
                  icon: "🔀",
                },
                {
                  title: "Etiquetas y tapas",
                  desc: "Retira etiquetas y tapas cuando sea posible, o sepáralas por material",
                  icon: "🏷️",
                },
                {
                  title: "Aplasta y compacta",
                  desc: "Reduce el volumen de envases y cajas para optimizar el espacio",
                  icon: "📦",
                },
                {
                  title: "Sin restos orgánicos",
                  desc: "Los residuos con restos de comida contaminan otros materiales reciclables",
                  icon: "🍽️",
                },
                {
                  title: "Duda = Consulta",
                  desc: "Si no estás seguro de cómo clasificar algo, consulta o sepáralo aparte",
                  icon: "❓",
                },
              ].map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-orange-200"
                >
                  <div className="flex gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="text-2xl flex-shrink-0"
                    >
                      {rule.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-sm text-gray-800 mb-1">{rule.title}</h4>
                      <p className="text-xs text-gray-600">{rule.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl border-0">
            <div className="max-w-2xl mx-auto space-y-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                🌍
              </motion.div>
              <h3 className="text-white">¡Comienza a segregar hoy!</h3>
              <p className="text-green-100">
                Cada material que segregas correctamente es un paso hacia un planeta más limpio y
                sostenible. Tu participación hace la diferencia.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </ScrollArea>
  );
}
