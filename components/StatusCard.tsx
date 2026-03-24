'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ReadingStatus } from '@/types';

interface StatusCardProps {
  label: string;
  value: number | string;
  unit: string;
  status: ReadingStatus;
}

const statusStyles: Record<ReadingStatus, string> = {
  good: 'border-green-500 bg-green-50 dark:bg-green-950',
  warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
  critical: 'border-red-500 bg-red-50 dark:bg-red-950',
};

const valueStyles: Record<ReadingStatus, string> = {
  good: 'text-green-700 dark:text-green-300',
  warning: 'text-yellow-700 dark:text-yellow-300',
  critical: 'text-red-700 dark:text-red-300',
};

export function StatusCard({ label, value, unit, status }: StatusCardProps) {
  return (
    <Card className={`border-2 ${statusStyles[status]}`}>
      <CardContent className="p-4">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold ${valueStyles[status]}`}>
          {value}
          <span className="text-sm font-normal ml-1">{unit}</span>
        </p>
      </CardContent>
    </Card>
  );
}
