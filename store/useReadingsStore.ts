import { create } from 'zustand';
import { PoolReading } from '@/types';
import { saveReadings, loadReadings } from '@/lib/storage';
import { getWarnings } from '@/lib/warnings';

function getDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

const seedReadings: PoolReading[] = [
  {
    id: 'seed-1',
    date: getDaysAgo(2),
    chlorine: 2.0,
    ph: 7.4,
    alkalinity: 100,
    temperature: 28,
    notes: 'Routine check, all good.',
    visualClarityChecked: true,
    pumpRoomInspected: true,
    backwashCompleted: true,
    weeklyAlkalinityCheck: true,
    warnings: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-2',
    date: getDaysAgo(1),
    chlorine: 0.8,
    ph: 7.7,
    alkalinity: 75,
    temperature: 27,
    notes: 'Noticed water looking slightly hazy.',
    visualClarityChecked: false,
    pumpRoomInspected: false,
    backwashCompleted: false,
    weeklyAlkalinityCheck: false,
    warnings: getWarnings({ chlorine: 0.8, ph: 7.7, alkalinity: 75 }),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-3',
    date: getDaysAgo(0),
    chlorine: 1.5,
    ph: 7.3,
    alkalinity: 95,
    temperature: 28,
    notes: 'Added chlorine yesterday, readings recovered.',
    visualClarityChecked: true,
    pumpRoomInspected: true,
    backwashCompleted: true,
    weeklyAlkalinityCheck: true,
    warnings: [],
    createdAt: new Date().toISOString(),
  },
];

interface ReadingsStore {
  readings: PoolReading[];
  addReading: (reading: PoolReading) => void;
  removeReading: (id: string) => void;
  loadFromStorage: () => void;
}

export const useReadingsStore = create<ReadingsStore>((set) => ({
  readings: [],
  addReading: (reading) =>
    set((state) => {
      const next = [reading, ...state.readings];
      saveReadings(next);
      return { readings: next };
    }),
  removeReading: (id) =>
    set((state) => {
      const next = state.readings.filter((r) => r.id !== id);
      saveReadings(next);
      return { readings: next };
    }),
  loadFromStorage: () => {
    const stored = loadReadings();
    if (stored.length > 0) {
      set({ readings: stored });
    } else {
      saveReadings(seedReadings);
      set({ readings: seedReadings });
    }
  },
}));
