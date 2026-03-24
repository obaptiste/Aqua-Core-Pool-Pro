'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertPanel } from '@/components/AlertPanel';
import { useReadingsStore } from '@/store/useReadingsStore';
import { validateReading } from '@/lib/validation';
import { getWarnings } from '@/lib/warnings';
import { PoolReading } from '@/types';

export function ReadingForm() {
  const router = useRouter();
  const addReading = useReadingsStore((s) => s.addReading);

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    date: today,
    chlorine: '',
    ph: '',
    alkalinity: '',
    temperature: '',
    notes: '',
    visualClarityChecked: false,
    pumpRoomInspected: false,
    backwashCompleted: false,
    weeklyAlkalinityCheck: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const partialReading = {
    chlorine: form.chlorine !== '' ? parseFloat(form.chlorine) : undefined,
    ph: form.ph !== '' ? parseFloat(form.ph) : undefined,
    alkalinity: form.alkalinity !== '' ? parseFloat(form.alkalinity) : undefined,
    temperature: form.temperature !== '' ? parseFloat(form.temperature) : undefined,
  };

  const liveWarnings = getWarnings(partialReading);

  const handleChange = useCallback((field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: Partial<PoolReading> = {
      date: form.date,
      chlorine: form.chlorine !== '' ? parseFloat(form.chlorine) : undefined,
      ph: form.ph !== '' ? parseFloat(form.ph) : undefined,
      alkalinity: form.alkalinity !== '' ? parseFloat(form.alkalinity) : undefined,
      temperature: form.temperature !== '' ? parseFloat(form.temperature) : undefined,
    };

    const validationErrors = validateReading(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newReading: PoolReading = {
      id: uuidv4(),
      date: form.date,
      chlorine: parseFloat(form.chlorine),
      ph: parseFloat(form.ph),
      alkalinity: parseFloat(form.alkalinity),
      temperature: parseFloat(form.temperature),
      notes: form.notes,
      visualClarityChecked: form.visualClarityChecked,
      pumpRoomInspected: form.pumpRoomInspected,
      backwashCompleted: form.backwashCompleted,
      weeklyAlkalinityCheck: form.weeklyAlkalinityCheck,
      warnings: getWarnings(data),
      createdAt: new Date().toISOString(),
    };

    addReading(newReading);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Water Readings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chlorine">Chlorine (ppm)</Label>
              <Input
                id="chlorine"
                type="number"
                step="0.1"
                min="0"
                max="20"
                placeholder="e.g. 2.0"
                value={form.chlorine}
                onChange={(e) => handleChange('chlorine', e.target.value)}
              />
              {errors.chlorine && <p className="text-sm text-red-600">{errors.chlorine}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ph">pH</Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                min="6"
                max="9"
                placeholder="e.g. 7.4"
                value={form.ph}
                onChange={(e) => handleChange('ph', e.target.value)}
              />
              {errors.ph && <p className="text-sm text-red-600">{errors.ph}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="alkalinity">Alkalinity (ppm)</Label>
              <Input
                id="alkalinity"
                type="number"
                step="1"
                min="0"
                max="500"
                placeholder="e.g. 100"
                value={form.alkalinity}
                onChange={(e) => handleChange('alkalinity', e.target.value)}
              />
              {errors.alkalinity && <p className="text-sm text-red-600">{errors.alkalinity}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                min="0"
                max="50"
                placeholder="e.g. 28"
                value={form.temperature}
                onChange={(e) => handleChange('temperature', e.target.value)}
              />
              {errors.temperature && <p className="text-sm text-red-600">{errors.temperature}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Warnings */}
      {(form.chlorine !== '' || form.ph !== '' || form.alkalinity !== '') && (
        <div>
          <h3 className="text-sm font-medium mb-2 text-muted-foreground">Live Warnings</h3>
          <AlertPanel warnings={liveWarnings} />
        </div>
      )}

      {/* Checklists */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: 'visualClarityChecked', label: 'Visual clarity checked' },
            { id: 'pumpRoomInspected', label: 'Pump room inspected' },
            { id: 'backwashCompleted', label: 'Backwash completed' },
            { id: 'weeklyAlkalinityCheck', label: 'Weekly alkalinity check' },
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center gap-3 py-1">
              <Checkbox
                id={id}
                checked={form[id as keyof typeof form] as boolean}
                onCheckedChange={(checked) => handleChange(id, !!checked)}
              />
              <Label htmlFor={id} className="text-base cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Any observations, chemical additions, or other notes..."
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <Button type="submit" className="w-full py-4 text-base" size="lg">
        Save Reading
      </Button>
    </form>
  );
}
