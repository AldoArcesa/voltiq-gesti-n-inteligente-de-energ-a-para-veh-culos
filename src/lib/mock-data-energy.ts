import { Car, Zap, Fuel, ShieldCheck, Award, ShoppingCart, Wrench, MapPin } from 'lucide-react';
export const vehicles = [
  { id: 'v1', name: 'Tesla Model Y', type: 'EV', consumption: 15, ecoScore: 92, avatar: Zap },
  { id: 'v2', name: 'Toyota Corolla', type: 'Gasoline', consumption: 7.5, ecoScore: 68, avatar: Fuel },
  { id: 'v3', name: 'Ford F-150', type: 'Gasoline', consumption: 12.5, ecoScore: 45, avatar: Fuel },
];
export const monthlyConsumptionData = [
  { month: 'Jan', v1: 300, v2: 150 },
  { month: 'Feb', v1: 280, v2: 160 },
  { month: 'Mar', v1: 320, v2: 155 },
  { month: 'Apr', v1: 290, v2: 165 },
  { month: 'May', v1: 310, v2: 170 },
  { month: 'Jun', v1: 330, v2: 160 },
];
export const alerts = [
  { id: 'a1', title: 'Anomalía en Consumo', description: 'Consumo 15% superior al promedio en tu Model Y.', severity: 'high', icon: ShieldCheck, date: 'Hace 2 horas' },
  { id: 'a2', title: 'Mantenimiento Preventivo', description: 'Revisión de frenos recomendada para tu Corolla.', severity: 'medium', icon: Wrench, date: 'Hace 1 día' },
  { id: 'a3', title: 'Oportunidad de Carga', description: 'Precios bajos en la estación "EcoCharge" a 2km.', severity: 'low', icon: Zap, date: 'Hace 3 días' },
];
export const challenges = [
  { id: 'c1', title: 'Eco-Driver Semanal', description: 'Mantén un Eco-Score sobre 80 por 7 días.', progress: 60, reward: 100, icon: Award },
  { id: 'c2', title: 'Viajero Eficiente', description: 'Completa un viaje de 100km con consumo optimizado.', progress: 25, reward: 50, icon: MapPin },
  { id: 'c3', title: 'Racha de Carga Inteligente', description: 'Carga en horas de baja demanda 3 veces seguidas.', progress: 100, reward: 75, icon: Zap },
];
export const rewards = [
  { id: 'r1', title: '10% Descuento en Carga', partner: 'EcoCharge', points: 500, icon: Zap },
  { id: 'r2', title: 'Lavado de Auto Gratis', partner: 'CarClean', points: 1000, icon: Car },
  { id: 'r3', title: 'Café Gratis', partner: 'Gas & Go', points: 250, icon: Fuel },
];
export const marketplaceOffers = [
  { id: 'm1', title: 'Revisión de Neumáticos', partner: 'TireWorld', category: 'Taller', image: '/placeholder.svg', description: 'Inspección y rotación de neumáticos con 20% de descuento.' },
  { id: 'm2', title: 'Carga R��pida a Mitad de Precio', partner: 'VoltPoint', category: 'Estación de Carga', image: '/placeholder.svg', description: 'Válido los fines de semana de 2pm a 5pm.' },
  { id: 'm3', title: 'Snack + Bebida', partner: 'QuickStop', category: 'Promoción', image: '/placeholder.svg', description: 'Obtén un combo gratis al cargar más de 20 kWh.' },
  { id: 'm4', title: 'Cambio de Aceite Sintético', partner: 'AutoFix', category: 'Taller', image: '/placeholder.svg', description: 'Servicio premium con aceite sintético a precio especial.' },
];
export const fleetVehicles = [
    { id: 'f1', name: 'Van de Reparto 1', driver: 'Ana P��rez', status: 'En Ruta', kpi: 8.2, alerts: 0 },
    { id: 'f2', name: 'Sedán Ejecutivo', driver: 'Carlos Rivas', status: 'Estacionado', kpi: 6.5, alerts: 1 },
    { id: 'f3', name: 'Camión Ligero', driver: 'Sofía Castro', status: 'En Taller', kpi: 15.1, alerts: 3 },
];