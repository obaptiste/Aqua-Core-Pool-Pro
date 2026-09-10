import { PoolReading } from '@/types';

const STORAGE_KEY = 'poolops_readings';

export function saveReadings(readings: PoolReading[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
}

export function loadReadings(): PoolReading[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as PoolReading[];
  } catch {
    return [];
  }
}
