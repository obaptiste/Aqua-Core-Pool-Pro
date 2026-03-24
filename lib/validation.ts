import { PoolReading } from '@/types';

export function validateReading(data: Partial<PoolReading>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (data.date === undefined || data.date === '') {
    errors.date = 'Date is required';
  }

  if (data.chlorine === undefined || isNaN(data.chlorine)) {
    errors.chlorine = 'Chlorine is required';
  } else if (data.chlorine < 0 || data.chlorine > 20) {
    errors.chlorine = 'Chlorine must be between 0 and 20 ppm';
  }

  if (data.ph === undefined || isNaN(data.ph)) {
    errors.ph = 'pH is required';
  } else if (data.ph < 6 || data.ph > 9) {
    errors.ph = 'pH must be between 6 and 9';
  }

  if (data.alkalinity === undefined || isNaN(data.alkalinity)) {
    errors.alkalinity = 'Alkalinity is required';
  } else if (data.alkalinity < 0 || data.alkalinity > 500) {
    errors.alkalinity = 'Alkalinity must be between 0 and 500 ppm';
  }

  if (data.temperature === undefined || isNaN(data.temperature)) {
    errors.temperature = 'Temperature is required';
  } else if (data.temperature < 0 || data.temperature > 50) {
    errors.temperature = 'Temperature must be between 0 and 50°C';
  }

  return errors;
}
