import { PoolReading } from '@/types';

export function exportToCSV(readings: PoolReading[]): void {
  const headers = [
    'Date',
    'Chlorine (ppm)',
    'pH',
    'Alkalinity (ppm)',
    'Temperature (°C)',
    'Visual Clarity',
    'Pump Room Inspected',
    'Backwash Completed',
    'Weekly Alkalinity Check',
    'Warnings',
    'Notes',
    'Created At',
  ];

  const rows = readings.map((r) => [
    r.date,
    r.chlorine,
    r.ph,
    r.alkalinity,
    r.temperature,
    r.visualClarityChecked ? 'Yes' : 'No',
    r.pumpRoomInspected ? 'Yes' : 'No',
    r.backwashCompleted ? 'Yes' : 'No',
    r.weeklyAlkalinityCheck ? 'Yes' : 'No',
    r.warnings.map((w) => w.message).join('; '),
    `"${r.notes.replace(/"/g, '""')}"`,
    r.createdAt,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `poolops-readings-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
