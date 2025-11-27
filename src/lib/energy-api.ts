import { api } from './api-client';
import { vehicles, alerts, rewards, marketplaceOffers, fleetVehicles } from './mock-data-energy';
// In a real app, these types would be in shared/types.ts
type Vehicle = typeof vehicles[0];
type Alert = typeof alerts[0];
type Reward = typeof rewards[0];
type MarketplaceOffer = typeof marketplaceOffers[0];
type FleetVehicle = typeof fleetVehicles[0];
// Phase 1: Use mock data as a fallback if the API fails or is not yet fully implemented.
const withMockFallback = <T>(apiCall: Promise<T>, mockData: T) => {
  return apiCall.catch(error => {
    console.warn('API call failed, using mock data as fallback:', error);
    return mockData;
  });
};
export const getVehicles = () => withMockFallback(api<{ items: Vehicle[] }>('/api/vehicles'), { items: vehicles, next: null });
export const getAlerts = () => withMockFallback(api<Alert[]>('/api/alerts'), alerts);
export const getRewards = () => withMockFallback(api<Reward[]>('/api/rewards'), rewards);
export const getMarketplaceOffers = () => withMockFallback(api<MarketplaceOffer[]>('/api/marketplace'), marketplaceOffers);
export const getFleetVehicles = () => withMockFallback(api<FleetVehicle[]>('/api/fleet'), fleetVehicles);
export const postFuelLog = (data: unknown) => api('/api/fuel-logs', {
  method: 'POST',
  body: JSON.stringify(data),
});