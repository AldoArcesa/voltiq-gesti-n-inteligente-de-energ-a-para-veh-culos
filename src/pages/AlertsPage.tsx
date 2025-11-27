import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ShieldCheck, Wrench, MapPin } from 'lucide-react';
import { alerts } from '@/lib/mock-data-energy';
import { cn } from '@/lib/utils';
const severityConfig = {
  high: {
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/50',
  },
  medium: {
    icon: Wrench,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/50',
  },
  low: {
    icon: ShieldCheck,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/50',
  },
};
export function AlertsPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-display tracking-tight text-foreground sm:text-5xl">
              Alertas Predictivas
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Mantente informado sobre el estado y rendimiento de tu vehículo.
            </p>
          </div>
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {alerts.map((alert) => {
                  const config = severityConfig[alert.severity];
                  return (
                    <AccordionItem value={alert.id} key={alert.id} className={cn("border-l-4", config.borderColor)}>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-4 text-left">
                          <config.icon className={cn("h-6 w-6 flex-shrink-0", config.color)} />
                          <div>
                            <p className="font-semibold">{alert.title}</p>
                            <p className="text-sm text-muted-foreground">{alert.date}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className={cn("px-6 pb-6", config.bgColor)}>
                        <div className="border-t pt-4 space-y-4">
                          <p>{alert.description}</p>
                          <div className="flex gap-2">
                            <Button size="sm"><MapPin className="mr-2 h-4 w-4" /> Ver Ruta</Button>
                            <Button size="sm" variant="outline">Marcar como Leído</Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}