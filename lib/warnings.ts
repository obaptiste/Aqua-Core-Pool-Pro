import { PoolReading, Warning, ReadingStatus } from '@/types';

export function getWarnings(reading: Partial<PoolReading>): Warning[] {
  const warnings: Warning[] = [];

  const { chlorine, ph, alkalinity } = reading;

  // Combined check first
  if (chlorine !== undefined && ph !== undefined && chlorine < 1 && ph > 7.6) {
    warnings.push({
      field: 'combined',
      level: 'critical',
      message: 'Critical: Sanitiser ineffective — low chlorine and high pH',
    });
  } else {
    // Individual chlorine checks
    if (chlorine !== undefined) {
      if (chlorine < 1) {
        warnings.push({ field: 'chlorine', level: 'critical', message: 'Sanitiser too low' });
      } else if (chlorine > 3) {
        warnings.push({ field: 'chlorine', level: 'warning', message: 'Chlorine too high' });
      }
    }

    // Individual pH checks
    if (ph !== undefined) {
      if (ph < 7.2) {
        warnings.push({ field: 'ph', level: 'critical', message: 'Water may be corrosive' });
      } else if (ph > 7.6) {
        warnings.push({ field: 'ph', level: 'warning', message: 'Chlorine less effective' });
      }
    }
  }

  // Alkalinity checks
  if (alkalinity !== undefined) {
    if (alkalinity < 80) {
      warnings.push({ field: 'alkalinity', level: 'warning', message: 'pH instability risk' });
    } else if (alkalinity > 120) {
      warnings.push({ field: 'alkalinity', level: 'warning', message: 'Difficult to adjust pH' });
    }
  }

  return warnings;
}

export function getFieldStatus(field: string, warnings: Warning[]): ReadingStatus {
  const fieldWarnings = warnings.filter(
    (w) => w.field === field || w.field === 'combined'
  );
  if (fieldWarnings.some((w) => w.level === 'critical')) return 'critical';
  if (fieldWarnings.some((w) => w.level === 'warning')) return 'warning';
  return 'good';
}
