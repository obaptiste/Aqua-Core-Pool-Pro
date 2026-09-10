'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface CheatSheetPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheatSheetPanel({ open, onOpenChange }: CheatSheetPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Pool Cheat Sheet</SheetTitle>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" disabled title="Coming soon: simplified view">
              Simplify
            </Button>
            <Button variant="outline" size="sm" disabled title="Coming soon: text-to-speech">
              🔊 Read Aloud
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Golden Numbers */}
          <section>
            <h3 className="text-lg font-semibold mb-3">🏆 Golden Numbers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-2 border">Parameter</th>
                    <th className="text-left p-2 border">Ideal Range</th>
                    <th className="text-left p-2 border">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Chlorine</td>
                    <td className="p-2 border">1 – 3</td>
                    <td className="p-2 border">ppm</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="p-2 border">pH</td>
                    <td className="p-2 border">7.2 – 7.6</td>
                    <td className="p-2 border">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Alkalinity</td>
                    <td className="p-2 border">80 – 120</td>
                    <td className="p-2 border">ppm</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="p-2 border">Temperature</td>
                    <td className="p-2 border">26 – 30</td>
                    <td className="p-2 border">°C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Daily Routine */}
          <section>
            <h3 className="text-lg font-semibold mb-3">📋 Daily Routine</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Check chlorine and pH levels',
                'Inspect pump room for leaks or noise',
                'Verify water clarity and colour',
                'Record all readings in PoolOps',
                'Add chemicals as needed and re-test after 1 hour',
                'Check skimmer baskets',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Fast Problem Decoder */}
          <section>
            <h3 className="text-lg font-semibold mb-3">🔍 Fast Problem Decoder</h3>
            <div className="space-y-3 text-sm">
              {[
                {
                  problem: 'Cloudy water',
                  fix: 'Check and raise chlorine, backwash filter, test alkalinity',
                },
                {
                  problem: 'Green water',
                  fix: 'Shock dose chlorine, brush walls, run pump 24 hours',
                },
                {
                  problem: 'Low pH',
                  fix: 'Add sodium carbonate (soda ash) to raise pH',
                },
                {
                  problem: 'High pH',
                  fix: 'Add muriatic acid or sodium bisulphate to lower pH',
                },
                {
                  problem: 'Low chlorine residual',
                  fix: 'Check stabiliser (CYA) levels, shock with chlorine',
                },
                {
                  problem: 'Eye/skin irritation',
                  fix: 'Test pH (too high or low causes irritation), check chloramines',
                },
              ].map((item, i) => (
                <div key={i} className="border rounded p-3">
                  <p className="font-semibold text-red-600">⚠ {item.problem}</p>
                  <p className="text-muted-foreground mt-1">{item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Safety Rules */}
          <section>
            <h3 className="text-lg font-semibold mb-3">🦺 Safety Rules</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Never mix chemicals — add them separately to water',
                'Always add acid to water, never water to acid',
                'Wear PPE: gloves and eye protection when handling chemicals',
                'Store chemicals in a cool, dry, ventilated area',
                'Keep chemicals away from flammable materials',
                'Have an eye wash station accessible in the pump room',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
