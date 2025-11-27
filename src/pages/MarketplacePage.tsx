import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { marketplaceOffers } from '@/lib/mock-data-energy';
import { toast } from 'sonner';
export function MarketplacePage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-display tracking-tight text-foreground sm:text-5xl">
              Marketplace de Aliados
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Descubre ofertas y promociones exclusivas para usuarios de VoltIQ.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketplaceOffers.map(offer => (
              <Card key={offer.id} className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-video bg-muted center">
                    {/* In a real app, this would be an <img /> tag */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{offer.title}</CardTitle>
                    <Badge variant={offer.category === 'Taller' ? 'default' : 'secondary'}>{offer.category}</Badge>
                  </div>
                  <CardDescription>{offer.partner}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{offer.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.success(`Oferta "${offer.title}" canjeada.`)}>Canjear Oferta</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}