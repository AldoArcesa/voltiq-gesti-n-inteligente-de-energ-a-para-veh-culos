import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OCRUploader } from '@/components/OCRUploader';
import { QRScanner } from '@/components/QRScanner';
import { OBDMockConnector } from '@/components/OBDMockConnector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { postFuelLog } from '@/lib/energy-api';
export function RegisterPage() {
  const navigate = useNavigate();
  const [manualData, setManualData] = useState({ vehicle: 'Tesla Model Y', liters: '', price: '' });
  const handleParsed = (data: any) => {
    console.log('OCR/QR/OBD Data:', data);
    // Here you would typically post to your backend
    postFuelLog(data).then(() => {
        toast.success('Registro añadido. Redirigiendo al dashboard...');
        setTimeout(() => navigate('/dashboard'), 1500);
    }).catch(err => toast.error(`Error: ${err.message}`));
  };
  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleParsed(manualData);
  };
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold font-display tracking-tight text-foreground sm:text-5xl">
              Registra tu Consumo
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Elige tu método preferido para añadir un nuevo registro de combustible o carga.
            </p>
          </div>
          <div className="mt-10 max-w-3xl mx-auto">
            <Tabs defaultValue="ocr" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ocr">OCR de Recibo</TabsTrigger>
                <TabsTrigger value="qr">Escanear QR</TabsTrigger>
                <TabsTrigger value="manual">Entrada Manual</TabsTrigger>
              </TabsList>
              <TabsContent value="ocr" className="mt-6">
                <OCRUploader onParsed={handleParsed} />
              </TabsContent>
              <TabsContent value="qr" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Escanear en Estación Aliada</CardTitle>
                    <CardDescription>Usa la cámara de tu dispositivo para escanear el código QR en la bomba de combustible o cargador.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center gap-4">
                    <QRScanner onScanned={(stationId) => handleParsed({ stationId, type: 'qr' })} />
                    <OBDMockConnector onConnected={(obdData) => handleParsed({ ...obdData, type: 'obd' })} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="manual" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Registro Manual</CardTitle>
                    <CardDescription>Introduce los detalles de tu último repostaje o carga.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleManualSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="vehicle">Vehículo</Label>
                        <Input id="vehicle" name="vehicle" value={manualData.vehicle} onChange={handleManualChange} disabled />
                      </div>
                      <div>
                        <Label htmlFor="liters">Litros / kWh</Label>
                        <Input id="liters" name="liters" type="number" placeholder="Ej: 35.5" value={manualData.liters} onChange={handleManualChange} required />
                      </div>
                      <div>
                        <Label htmlFor="price">Precio Total (€)</Label>
                        <Input id="price" name="price" type="number" placeholder="Ej: 50.25" value={manualData.price} onChange={handleManualChange} required />
                      </div>
                      <Button type="submit" className="w-full">Guardar Registro</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}