import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Award, Trophy, Gift } from 'lucide-react';
import { challenges, rewards } from '@/lib/mock-data-energy';
import { toast } from 'sonner';
export function GamificationPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-display tracking-tight text-foreground sm:text-5xl">
              Gamificación
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Completa retos, gana insignias y canjea recompensas.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Challenges Section */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><Trophy /> Retos Activos</h2>
              {challenges.map(challenge => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2"><challenge.icon className="text-primary" /> {challenge.title}</CardTitle>
                        <CardDescription>{challenge.description}</CardDescription>
                      </div>
                      <span className="text-sm font-bold text-primary">+{challenge.reward} pts</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={challenge.progress} className="mb-2" />
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Progreso: {challenge.progress}%</span>
                      {challenge.progress < 100 ? (
                        <Button size="sm" onClick={() => toast.info(`¡Reto "${challenge.title}" aceptado!`)}>Participar</Button>
                      ) : (
                        <span className="text-green-500 font-semibold">¡Completado!</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Rewards Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><Gift /> Recompensas</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Mis Puntos</CardTitle>
                  <div className="text-3xl font-bold text-primary flex items-center gap-2">
                    <Award className="text-yellow-500" /> 1,250 Puntos
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rewards.map(reward => (
                    <div key={reward.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <reward.icon className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-semibold">{reward.title}</p>
                          <p className="text-xs text-muted-foreground">{reward.partner}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => toast.success(`Has canjeado "${reward.title}"`)}>{reward.points} pts</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}