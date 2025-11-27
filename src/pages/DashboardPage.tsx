import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { getVehicles, getAlerts } from '@/lib/energy-api';
import { monthlyConsumptionData } from '@/lib/mock-data-energy';
import { Fuel, Zap, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react';
type Vehicle = { id: string; name: string; type: string; consumption: number; ecoScore: number; };
type Alert = { id: string; title: string; description: string; severity: 'high' | 'medium' | 'low'; icon: React.ElementType; date: string };
export function DashboardPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [vehiclesRes, alertsRes] = await Promise.all([getVehicles(), getAlerts()]);
        setVehicles(vehiclesRes.items);
        setAlerts(alertsRes);
        if (vehiclesRes.items.length > 0) {
          setSelectedVehicle(vehiclesRes.items[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const currentVehicle = vehicles.find(v => v.id === selectedVehicle);
  const kpiCards = [
    { title: 'Consumo Mensual', value: currentVehicle ? `${currentVehicle.consumption} L/100km` : 'N/A', icon: currentVehicle?.type === 'EV' ? Zap : Fuel, change: '+2%' },
    { title: 'Costo Promedio', value: '€1.65/L', icon: TrendingUp, change: '-1%' },
    { title: 'Eco-Score', value: currentVehicle ? currentVehicle.ecoScore : 'N/A', icon: ShieldCheck, change: '+5 pts' },
  ];
  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-80 w-full lg:col-span-2" />
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display">Dashboard</h1>
              <p className="text-muted-foreground">Resumen de tu actividad y rendimiento.</p>
            </div>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Seleccionar vehículo" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map(v => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {kpiCards.map((card, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">{card.change} desde el mes pasado</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Tendencias de Consumo</CardTitle>
                <CardDescription>Consumo (kWh o L) en los últimos 6 meses.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="v1" name="Model Y" stroke="#667EEA" />
                    <Line type="monotone" dataKey="v2" name="Corolla" stroke="#F38020" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Alertas Recientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="flex items-start gap-3">
                    <div className={`mt-1 p-1.5 rounded-full ${alert.severity === 'high' ? 'bg-destructive/20 text-destructive' : alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-600' : 'bg-primary/10'}`}>
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}