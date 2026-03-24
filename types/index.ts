export interface PoolReading {
  id: string;
  date: string;
  chlorine: number; // ppm
  ph: number;
  alkalinity: number; // ppm
  temperature: number; // Celsius
  notes: string;
  // Checkboxes
  visualClarityChecked: boolean;
  pumpRoomInspected: boolean;
  backwashCompleted: boolean;
  weeklyAlkalinityCheck: boolean;
  // Computed
  warnings: Warning[];
  createdAt: string;
}

export interface Warning {
  field: string;
  level: 'warning' | 'critical';
  message: string;
}

export type ReadingStatus = 'good' | 'warning' | 'critical';
