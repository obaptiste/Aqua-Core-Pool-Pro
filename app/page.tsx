'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusCard } from '@/components/StatusCard';
import { AlertPanel } from '@/components/AlertPanel';
import { CheatSheetPanel } from '@/components/CheatSheetPanel';
import { useReadingsStore } from '@/store/useReadingsStore';
import { exportToCSV } from '@/lib/export';
import { getFieldStatus } from '@/lib/warnings';
import { formatReadingDate } from '@/lib/utils';
import { ReadingStatus } from '@/types';

function getOverallStatus(warnings: { level: string }[]): ReadingStatus {
  if (warnings.some((w) => w.level === 'critical')) return 'critical';
  if (warnings.some((w) => w.level === 'warning')) return 'warning';
  return 'good';
}

const statusBadgeVariant: Record<ReadingStatus, 'default' | 'secondary' | 'destructive'> = {
  good: 'default',
  warning: 'secondary',
  critical: 'destructive',
};

const statusBadgeLabel: Record<ReadingStatus, string> = {
  good: 'Good',
  warning: 'Warning',
  critical: 'Critical',
};

export default function DashboardPage() {
  const { readings, loadFromStorage } = useReadingsStore();
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const latest = readings[0] ?? null;
  const recent = readings.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-4">
        <h1 className="text-2xl font-bold">PoolOps Dashboard</h1>
        <p className="text-muted-foreground text-sm">Aquatic facility management</p>
      </header>

      <main className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Status Cards */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Latest Reading</h2>
          {latest ? (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                Recorded: {formatReadingDate(latest.date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <StatusCard
                  label="Chlorine"
                  value={latest.chlorine}
                  unit="ppm"
                  status={getFieldStatus('chlorine', latest.warnings)}
                />
                <StatusCard
                  label="pH"
                  value={latest.ph}
                  unit=""
                  status={getFieldStatus('ph', latest.warnings)}
                />
                <StatusCard
                  label="Alkalinity"
                  value={latest.alkalinity}
                  unit="ppm"
                  status={getFieldStatus('alkalinity', latest.warnings)}
                />
                <StatusCard
                  label="Temperature"
                  value={latest.temperature}
                  unit="°C"
                  status="good"
                />
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">No readings yet. Log your first reading!</p>
          )}
        </section>

        {/* Alerts */}
        {latest && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Alerts</h2>
            <AlertPanel warnings={latest.warnings} />
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Button asChild size="lg" className="py-4 text-base w-full">
              <Link href="/readings/new">+ Log Reading</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="py-4 text-base w-full"
              onClick={() => setCheatSheetOpen(true)}
            >
              📋 Cheat Sheet
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="py-4 text-base w-full"
              onClick={() => exportToCSV(readings)}
              disabled={readings.length === 0}
            >
              ⬇ Export Data
            </Button>
          </div>
        </section>

        {/* Recent Readings */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Readings</h2>
          {recent.length === 0 ? (
            <p className="text-muted-foreground">No readings logged yet.</p>
          ) : (
            <div className="space-y-2">
              {recent.map((reading) => {
                const overall = getOverallStatus(reading.warnings);
                return (
                  <Card key={reading.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {formatReadingDate(reading.date)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Cl: {reading.chlorine} | pH: {reading.ph} | Alk: {reading.alkalinity}
                        </p>
                      </div>
                      <Badge variant={statusBadgeVariant[overall]}>
                        {statusBadgeLabel[overall]}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <CheatSheetPanel open={cheatSheetOpen} onOpenChange={setCheatSheetOpen} />
    </div>
  );
}
