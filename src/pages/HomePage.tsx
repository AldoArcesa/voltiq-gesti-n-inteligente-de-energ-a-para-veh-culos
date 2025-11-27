import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, ShieldCheck, Users, BarChart, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const FeatureCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <motion.div whileHover={{ y: -5, scale: 1.02 }} className="h-full">
    <Card className="h-full border-border/80 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{children}</p>
      </CardContent>
    </Card>
  </motion.div>
);
const PricingCard = ({ plan, price, features, primary = false }: { plan: string, price: string, features: string[], primary?: boolean }) => (
  <Card className={`flex flex-col ${primary ? 'border-primary shadow-xl -translate-y-4' : ''}`}>
    <CardHeader>
      <CardTitle className="text-2xl">{plan}</CardTitle>
      <p className="text-4xl font-bold">{price}<span className="text-lg font-normal text-muted-foreground">/mes</span></p>
    </CardHeader>
    <CardContent className="flex-grow space-y-4">
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <div className="p-6">
      <Button asChild className={`w-full ${primary ? 'btn-gradient' : 'bg-primary'}`}>
        <Link to="/register">Empezar</Link>
      </Button>
    </div>
  </Card>
);
export function HomePage() {
  return (
    <AppLayout>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative text-center py-24 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-background to-orange-500/10 -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-foreground"
            >
              Gestión <span className="text-gradient">Inteligente</span> de Energía para tu Vehículo
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
            >
              Optimiza tu consumo, ahorra dinero y reduce tu huella de carbono con VoltIQ. La plataforma todo-en-uno para vehículos eléctricos y de gasolina.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex justify-center gap-4"
            >
              <Button asChild size="lg" className="btn-gradient">
                <Link to="/register">Comenzar Ahora <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">Ver Demo</Link>
              </Button>
            </motion.div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold font-display">Todo lo que necesitas, en un solo lugar</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Desde el registro automático de consumo hasta alertas predictivas, VoltIQ te da el control total.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard icon={Zap} title="Registro Automático">
                Conecta tu vehículo o simplemente toma una foto de tu recibo. Nuestra tecnología OCR y conexiones OBD-II hacen el resto.
              </FeatureCard>
              <FeatureCard icon={BarChart} title="Dashboard Analítico">
                Visualiza tendencias, compara vehículos y entiende tus patrones de consumo con gráficos interactivos y fáciles de entender.
              </FeatureCard>
              <FeatureCard icon={ShieldCheck} title="Alertas Predictivas">
                Nuestra IA detecta anomalías y predice necesidades de mantenimiento antes de que se conviertan en un problema.
              </FeatureCard>
              <FeatureCard icon={Gift} title="Gamificación y Recompensas">
                Completa retos de conducción eficiente, gana insignias y canjea recompensas en nuestra red de aliados.
              </FeatureCard>
              <FeatureCard icon={Users} title="Modo Flota para Empresas">
                Gestiona múltiples vehículos, asigna conductores y exporta reportes contables para tu negocio.
              </FeatureCard>
              <FeatureCard icon={Users} title="Marketplace Integrado">
                Encuentra las mejores ofertas en estaciones de carga, talleres y más, directamente en la app.
              </FeatureCard>
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold font-display">Un Plan para Cada Necesidad</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Empieza gratis y escala a medida que creces. Simple, transparente y sin sorpresas.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <PricingCard 
                plan="Freemium" 
                price="€0" 
                features={['Registro manual y OCR', 'Dashboard básico', '1 vehículo']}
              />
              <PricingCard 
                plan="Premium" 
                price="€4.99" 
                features={['Todo en Freemium', 'Conexión OBD-II', 'Alertas predictivas IA', 'Gamificación avanzada', 'Hasta 3 vehículos']}
                primary
              />
              <PricingCard 
                plan="Enterprise" 
                price="€50+" 
                features={['Todo en Premium', 'Modo Flota', 'Reportes fiscales', 'Soporte prioritario', 'Vehículos ilimitados']}
              />
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-secondary/50 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} VoltIQ. Todos los derechos reservados.</p>
              <p className="text-sm mt-1">Built with ❤️ at Cloudflare</p>
            </div>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
}