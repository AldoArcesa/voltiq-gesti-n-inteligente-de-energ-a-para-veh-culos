import type { User, Chat, ChatMessage } from './types';
// Original mock data
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
// VoltIQ specific mock data (can be moved to a separate file later)
export interface Vehicle {
  id: string;
  name: string;
  type: 'EV' | 'Gasoline' | 'Hybrid';
}
export const MOCK_VEHICLES: Vehicle[] = [
    { id: 'v1', name: 'Tesla Model Y', type: 'EV' },
    { id: 'v2', name: 'Toyota Corolla', type: 'Gasoline' },
];