"use client";

import { useState } from "react";
import type { Race } from "@/drizzle/schema";

interface Props {
  race: Race;
  defaultSide: "A" | "B";
  onClose: () => void;
  onSuccess: (totalA: number, totalB: number) => void;
}

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

export function DonateModal({ race, defaultSide, onClose, onSuccess }: Props) {
  const [side] = useState<"A" | "B">(defaultSide);
  const [amountDollars, setAmountDollars] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    donorName: "",
    donorAddress: "",
    donorCity: "",
    donorState: "",
    donorZip: "",
    donorEmployer: "",
    donorOccupation: "",
    usCitizenConfirm: false,
  });

  const candidate = side === "A" ? race.candidateA : race.candidateB;
  const sideColor = side === "A" ? "red" : "blue";

  const effectiveDollars = useCustom ? parseFloat(customAmount || "0") : amountDollars;
  const effectiveCents = Math.round(effectiveDollars * 100);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (effectiveCents < 100) {
      setError("Minimum donation is $1.00");
      return;
    }
    if (effectiveCents > 330000) {
      setError("Maximum donation is $3,300 per FEC rules");
      return;
    }
    if (!form.usCitizenConfirm) {
      setError("You must confirm US citizenship or permanent residency");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          raceId: race.id,
          side,
          amountCents: effectiveCents,
          ...form,
        }),
      });
      const data = await res.json() as { error?: string; totalA: number; totalB: number };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      onSuccess(data.totalA, data.totalB);
      onClose();
    } catch {
      setError("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className={`p-5 rounded-t-2xl bg-${sideColor}-50 border-b border-${sideColor}-100`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              Donate for{" "}
              <span className={`text-${sideColor}-700`}>{candidate}</span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Opposing donations cancel out — the matched amount goes to the St. Jude Children's Research Hospital.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold mb-2">Amount</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setAmountDollars(amt); setUseCustom(false); }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    !useCustom && amountDollars === amt
                      ? `bg-${sideColor}-600 text-white border-${sideColor}-600`
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  ${amt}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setUseCustom(true)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  useCustom ? `bg-${sideColor}-600 text-white border-${sideColor}-600` : "border-gray-300 hover:border-gray-400"
                }`}
              >
                Other
              </button>
            </div>
            {useCustom && (
              <div className="flex items-center border rounded-lg overflow-hidden">
                <span className="pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  min="1"
                  max="3300"
                  step="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Amount"
                  className="flex-1 px-2 py-2 outline-none"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Donor info */}
          <div>
            <label className="block text-sm font-semibold mb-2">Your Information <span className="text-gray-400 font-normal">(required by federal law)</span></label>
            <div className="space-y-2">
              <input
                required
                placeholder="Full name"
                value={form.donorName}
                onChange={(e) => setForm({ ...form, donorName: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
              />
              <input
                required
                placeholder="Street address"
                value={form.donorAddress}
                onChange={(e) => setForm({ ...form, donorAddress: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
              />
              <div className="grid grid-cols-5 gap-2">
                <input
                  required
                  placeholder="City"
                  value={form.donorCity}
                  onChange={(e) => setForm({ ...form, donorCity: e.target.value })}
                  className="col-span-2 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                />
                <input
                  required
                  placeholder="ST"
                  maxLength={2}
                  value={form.donorState}
                  onChange={(e) => setForm({ ...form, donorState: e.target.value.toUpperCase() })}
                  className="col-span-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                />
                <input
                  required
                  placeholder="ZIP"
                  maxLength={10}
                  value={form.donorZip}
                  onChange={(e) => setForm({ ...form, donorZip: e.target.value })}
                  className="col-span-2 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <input
                required
                placeholder="Employer"
                value={form.donorEmployer}
                onChange={(e) => setForm({ ...form, donorEmployer: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
              />
              <input
                required
                placeholder="Occupation"
                value={form.donorOccupation}
                onChange={(e) => setForm({ ...form, donorOccupation: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Citizenship */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.usCitizenConfirm}
              onChange={(e) => setForm({ ...form, usCitizenConfirm: e.target.checked })}
              className="mt-0.5 h-4 w-4 flex-shrink-0"
            />
            <span className="text-sm text-gray-600">
              I am a US citizen or lawfully admitted permanent resident. I am making this
              contribution with my own funds and not on behalf of another.
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-opacity ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            } bg-${sideColor}-600 hover:bg-${sideColor}-700`}
          >
            {submitting ? "Processing…" : `Donate $${effectiveDollars} for ${candidate}`}
          </button>

          <p className="text-xs text-gray-400 text-center">
            This is a PoC — no real money is processed.
          </p>
        </form>
      </div>
    </div>
  );
}
