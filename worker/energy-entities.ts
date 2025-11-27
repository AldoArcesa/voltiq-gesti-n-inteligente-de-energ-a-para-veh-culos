import { IndexedEntity } from "./core-utils";
// These types would ideally be in a shared file, e.g., shared/energy-types.ts
// For simplicity in Phase 1, we define them here.
export interface Vehicle {
  id: string;
  name: string;
  type: 'EV' | 'Gasoline' | 'Hybrid';
  consumption: number; // kWh/100km or L/100km
  ecoScore: number;
}
export interface FuelLog {
  id: string;
  vehicleId: string;
  date: number; // timestamp
  liters?: number;
  kwh?: number;
  price: number;
  odometer: number;
}
export interface Fleet {
    id: string;
    name: string;
    vehicleIds: string[];
}
export interface Reward {
    id: string;
    title: string;
    partner: string;
    points: number;
}
// Mock data for seeding the DO
const SEED_VEHICLES: Vehicle[] = [
  { id: 'v1', name: 'Tesla Model Y', type: 'EV', consumption: 15, ecoScore: 92 },
  { id: 'v2', name: 'Toyota Corolla', type: 'Gasoline', consumption: 7.5, ecoScore: 68 },
];
const SEED_FUEL_LOGS: FuelLog[] = [
    { id: 'fl1', vehicleId: 'v2', date: Date.now() - 86400000 * 7, liters: 35, price: 55.50, odometer: 12345 },
];
export class VehicleEntity extends IndexedEntity<Vehicle> {
  static readonly entityName = "vehicle";
  static readonly indexName = "vehicles";
  static readonly initialState: Vehicle = { id: "", name: "", type: 'Gasoline', consumption: 0, ecoScore: 0 };
  static seedData = SEED_VEHICLES;
}
export class FuelLogEntity extends IndexedEntity<FuelLog> {
  static readonly entityName = "fuelLog";
  static readonly indexName = "fuelLogs";
  static readonly initialState: FuelLog = { id: "", vehicleId: "", date: 0, price: 0, odometer: 0 };
  static seedData = SEED_FUEL_LOGS;
}
export class FleetEntity extends IndexedEntity<Fleet> {
  static readonly entityName = "fleet";
  static readonly indexName = "fleets";
  static readonly initialState: Fleet = { id: "", name: "", vehicleIds: [] };
}
export class RewardEntity extends IndexedEntity<Reward> {
  static readonly entityName = "reward";
  static readonly indexName = "rewards";
  static readonly initialState: Reward = { id: "", title: "", partner: "", points: 0 };
}