import React, { useState, useEffect } from 'react';
import { Bluetooth, Zap, Gauge, Wind, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
type OBDData = {
  speed: number;
  rpm: number;
  fuelFlow: number;
  batteryKWh: number;
};
export function OBDMockConnector({ onConnected }: { onConnected: (data: OBDData) => void }) {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [data, setData] = useState<OBDData>({ speed: 0, rpm: 0, fuelFlow: 0, batteryKWh: 100 });
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (status === 'connected') {
      intervalId = setInterval(() => {
        setData(prev => ({
          speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 5),
          rpm: Math.max(0, prev.rpm + (Math.random() - 0.5) * 200),
          fuelFlow: Math.max(0, prev.fuelFlow + (Math.random() - 0.5) * 0.1),
          batteryKWh: Math.max(0, Math.min(100, prev.batteryKWh - 0.01)),
        }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [status]);
  const handleConnect = () => {
    setStatus('connecting');
    toast.info('Buscando dispositivo OBD-II...');
    setTimeout(() => {
      setStatus('connected');
      toast.success('¡Conectado a VoltIQ Link!');
      onConnected(data);
    }, 2500);
  };
  const handleDisconnect = () => {
    setStatus('disconnected');
    setData({ speed: 0, rpm: 0, fuelFlow: 0, batteryKWh: 100 });
    toast.success('Dispositivo desconectado.');
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Bluetooth /> Conector OBD-II</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'disconnected' && (
          <Button onClick={handleConnect} className="w-full">
            <Bluetooth className="mr-2 h-4 w-4" /> Conectar Vehículo
          </Button>
        )}
        {status === 'connecting' && (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Conectando...
          </Button>
        )}
        {status === 'connected' && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center text-green-600 flex items-center justify-center gap-2">
                <CheckCircle />
                <span>Conectado a: Tesla Model Y</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2"><Gauge /> Velocidad: {data.speed.toFixed(0)} km/h</div>
              <div className="flex items-center gap-2"><Wind /> RPM: {data.rpm.toFixed(0)}</div>
              <div className="flex items-center gap-2"><Zap /> Batería: {data.batteryKWh.toFixed(1)}%</div>
            </div>
            <Progress value={data.batteryKWh} className="w-full" />
            <Button onClick={handleDisconnect} variant="destructive" className="w-full">
              Desconectar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}