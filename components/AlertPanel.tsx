'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Warning } from '@/types';

interface AlertPanelProps {
  warnings: Warning[];
}

export function AlertPanel({ warnings }: AlertPanelProps) {
  if (warnings.length === 0) {
    return (
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
        <AlertDescription className="text-green-700 dark:text-green-300 font-medium">
          ✓ All readings normal
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-2">
      {warnings.map((warning, index) => (
        <Alert
          key={index}
          className={
            warning.level === 'critical'
              ? 'border-red-500 bg-red-50 dark:bg-red-950'
              : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950'
          }
        >
          <AlertDescription
            className={
              warning.level === 'critical'
                ? 'text-red-700 dark:text-red-300 font-medium'
                : 'text-yellow-700 dark:text-yellow-300 font-medium'
            }
          >
            {warning.level === 'critical' ? '🚨' : '⚠️'} {warning.message}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
