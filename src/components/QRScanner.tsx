import React, { useState, useRef, useEffect } from 'react';
import { QrCode, X, CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
// Mock QR scanning logic for the prototype
const useQrScanner = (videoRef: React.RefObject<HTMLVideoElement>, onScan: (data: string) => void) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          setHasPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            // Simulate a scan after a few seconds
            intervalId = setTimeout(() => {
              onScan(`STATION_ID_${Math.random().toString(36).substring(7).toUpperCase()}`);
            }, 3000);
          }
        })
        .catch(err => {
          console.error("Camera permission denied:", err);
          setHasPermission(false);
        });
    }
    return () => {
      if (intervalId) clearTimeout(intervalId);
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef, onScan]);
  return { hasPermission };
};
export function QRScanner({ onScanned }: { onScanned: (data: string) => void }) {
  const [open, setOpen] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleScan = (data: string) => {
    toast.success(`Código escaneado: ${data}`);
    onScanned(data);
    setOpen(false);
  };
  const { hasPermission } = useQrScanner(open ? videoRef : { current: null }, handleScan);
  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      handleScan(manualCode.trim());
    } else {
      toast.error('Por favor, introduce un código.');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <QrCode className="mr-2 h-4 w-4" /> Escanear Código QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Escanear Código de Estación</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-square w-full bg-secondary rounded-md overflow-hidden center">
          {hasPermission === true && <video ref={videoRef} className="w-full h-full object-cover" />}
          {hasPermission === false && (
            <div className="text-center text-muted-foreground p-4">
              <CameraOff className="mx-auto h-12 w-12" />
              <p className="mt-2">Se necesita permiso para usar la cámara.</p>
              <p className="text-xs">Por favor, habilita el acceso en tu navegador.</p>
            </div>
          )}
          {hasPermission === null && <p>Solicitando acceso a la cámara...</p>}
          {/* Scanner overlay */}
          <div className="absolute inset-0 border-8 border-white/20 rounded-md" style={{ clipPath: 'polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)' }} />
        </div>
        <div className="text-center text-sm text-muted-foreground">O introduce el código manualmente</div>
        <div className="flex gap-2">
          <Input 
            placeholder="Ej: STATION_ID_XYZ" 
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
          />
          <Button onClick={handleManualSubmit}>Enviar</Button>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}