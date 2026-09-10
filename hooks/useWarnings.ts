import { useMemo } from 'react';
import { PoolReading, Warning } from '@/types';
import { getWarnings } from '@/lib/warnings';

export function useWarnings(reading: Partial<PoolReading>): Warning[] {
  return useMemo(() => getWarnings(reading), [reading]);
}
