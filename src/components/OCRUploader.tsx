import React, { useState, useCallback, useRef } from 'react';
import { UploadCloud, FileText, Loader2, Wand2, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
type ParsedData = {
  liters: string;
  price: string;
  date: string;
  odometer: string;
};
export function OCRUploader({ onParsed }: { onParsed: (data: ParsedData) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [parsedData, setParsedData] = useState<ParsedData>({ liters: '', price: '', date: '', odometer: '' });
  const inputRef = useRef<HTMLInputElement>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setStatus('uploading');
      // Simulate processing
      setTimeout(() => {
        setStatus('processing');
        toast.info('Extrayendo datos del recibo...');
        // Simulate OCR processing with mock data
        setTimeout(() => {
          const mockParsedData = {
            liters: (Math.random() * 40 + 10).toFixed(2),
            price: (Math.random() * 50 + 20).toFixed(2),
            date: new Date().toISOString().split('T')[0],
            odometer: Math.floor(Math.random() * 50000 + 10000).toString(),
          };
          setParsedData(mockParsedData);
          setStatus('success');
          toast.success('¡Datos extraídos con éxito! Por favor, verifica la información.');
        }, 2000);
      }, 1000);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParsedData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    toast.success('Registro de combustible guardado.');
    onParsed(parsedData);
    // Reset state
    setFile(null);
    setPreview(null);
    setStatus('idle');
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText /> Cargar Recibo (OCR)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'idle' && (
          <div {...getRootProps()} className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-accent' : 'border-border'}`}>
            <input {...getInputProps()} ref={inputRef} />
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Arrastra una foto de tu recibo aquí, o haz clic para seleccionar</p>
          </div>
        )}
        {preview && (
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-lg overflow-hidden border">
            <img src={preview} alt="Vista previa del recibo" className="object-cover w-full h-full" />
          </div>
        )}
        {status === 'processing' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center text-primary gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Procesando con IA...</span>
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}
        {status === 'success' && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="liters">Litros</Label>
                <Input id="liters" name="liters" value={parsedData.liters} onChange={handleFieldChange} />
              </div>
              <div>
                <Label htmlFor="price">Precio Total (€)</Label>
                <Input id="price" name="price" value={parsedData.price} onChange={handleFieldChange} />
              </div>
              <div>
                <Label htmlFor="date">Fecha</Label>
                <Input id="date" name="date" type="date" value={parsedData.date} onChange={handleFieldChange} />
              </div>
              <div>
                <Label htmlFor="odometer">Kilometraje</Label>
                <Input id="odometer" name="odometer" value={parsedData.odometer} onChange={handleFieldChange} />
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full btn-gradient">
              <Wand2 className="mr-2 h-4 w-4" /> Confirmar y Guardar
            </Button>
          </div>
        )}
        {status === 'error' && (
            <div className="text-destructive-foreground bg-destructive p-4 rounded-md flex items-center gap-2">
                <AlertCircle />
                <span>No se pudo procesar la imagen. Inténtalo de nuevo.</span>
            </div>
        )}
      </CardContent>
    </Card>
  );
}