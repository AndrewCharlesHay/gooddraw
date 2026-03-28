"use client";

import { useState } from "react";
import Link from "next/link";
import { RaceBar } from "@/components/RaceBar";
import type { StateData, Race } from "@/lib/mock-races";

interface Props {
  state: StateData;
  race: Race;
  defaultSide: "D" | "R";
}

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

export function DonatePage({ state, race, defaultSide }: Props) {
  const [side, setSide] = useState<"D" | "R">(defaultSide);
  const [amountDollars, setAmountDollars] = useState(50);
  const [useCustom, setUseCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const candidate = side === "D" ? race.democrat : race.republican;
  const sideLabel = side === "D" ? "Democrat" : "Republican";
  const sideColor = side === "D" ? "blue" : "red";

  const effectiveDollars = useCustom ? parseFloat(customAmount || "0") : amountDollars;
  const effectiveCents = Math.round(effectiveDollars * 100);

  function fmt(cents: number) {
    const n = cents / 100;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n.toFixed(0)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (effectiveCents < 100) { setError("Minimum donation is $1.00"); return; }
    if (effectiveCents > 330000) { setError("Maximum donation is $3,300 per FEC rules"); return; }
    if (!form.usCitizenConfirm) { setError("You must confirm US citizenship or permanent residency"); return; }

    setSubmitting(true);
    // Simulate network delay for demo
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">DONATION Recorded!</h2>
        <p className="text-gray-600 mb-2">
          Your {fmt(effectiveCents)} pledge for{" "}
          <span className={`font-semibold text-${sideColor}-700`}>{candidate.name}</span> has been logged.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          If an opposing DONATION matches yours, that amount goes to charity instead of the campaign.
        </p>
        <Link href="/" className="inline-block rounded-xl bg-gray-900 text-white px-6 py-3 font-semibold hover:bg-gray-700">
          Back to all races
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-block">
        ← All races
      </Link>

      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">
          {state.name} · {race.label}
        </p>
        <h1 className="text-2xl font-bold mb-4">
          {race.democrat.name} vs {race.republican.name}
        </h1>
        <RaceBar race={race} size="md" />
      </div>

      {/* Side selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setSide("D")}
          className={`rounded-xl border-2 px-4 py-3 text-left transition-colors ${
            side === "D"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="text-xs font-semibold text-blue-600 mb-0.5">Democrat</div>
          <div className="font-bold text-blue-800">{race.democrat.name}</div>
          <div className="text-sm text-blue-600">{fmt(race.democrat.amountCents)} raised</div>
        </button>
        <button
          type="button"
          onClick={() => setSide("R")}
          className={`rounded-xl border-2 px-4 py-3 text-left transition-colors ${
            side === "R"
              ? "border-red-500 bg-red-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="text-xs font-semibold text-red-600 mb-0.5">Republican</div>
          <div className="font-bold text-red-800">{race.republican.name}</div>
          <div className="text-sm text-red-600">{fmt(race.republican.amountCents)} raised</div>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold text-lg mb-1">
          Make a DONATION for{" "}
          <span className={`text-${sideColor}-700`}>{candidate.name}</span>
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Opposing DONATIONS cancel each other out — the matched amount goes to the St. Jude Children's Research Hospital.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                  type="number" min="1" max="3300" step="1"
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
            <label className="block text-sm font-semibold mb-2">
              Your Information <span className="text-gray-400 font-normal">(required by federal law)</span>
            </label>
            <div className="space-y-2">
              <input required placeholder="Full name" value={form.donorName}
                onChange={(e) => setForm({ ...form, donorName: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300" />
              <input required placeholder="Street address" value={form.donorAddress}
                onChange={(e) => setForm({ ...form, donorAddress: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300" />
              <div className="grid grid-cols-5 gap-2">
                <input required placeholder="City" value={form.donorCity}
                  onChange={(e) => setForm({ ...form, donorCity: e.target.value })}
                  className="col-span-2 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300" />
                <input required placeholder="ST" maxLength={2} value={form.donorState}
                  onChange={(e) => setForm({ ...form, donorState: e.target.value.toUpperCase() })}
                  className="col-span-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300" />
                <input required placeholder="ZIP" maxLength={10} value={form.donorZip}
                  onChange={(e) => setForm({ ...form, donorZip: e.target.value })}
                  className="col-span-2 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300" />
              </div>
              <input required placeholder="Employer" value={form.donorEmployer}
                onChange={(e) => setForm({ ...form, donorEmployer: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300" />
              <input required placeholder="Occupation" value={form.donorOccupation}
                onChange={(e) => setForm({ ...form, donorOccupation: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300" />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.usCitizenConfirm}
              onChange={(e) => setForm({ ...form, usCitizenConfirm: e.target.checked })}
              className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span className="text-sm text-gray-600">
              I am a US citizen or lawfully admitted permanent resident. I am making this
              DONATION with my own funds and not on behalf of another.
            </span>
          </label>

          {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-opacity ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            } bg-${sideColor}-600 hover:bg-${sideColor}-700`}
          >
            {submitting ? "Processing…" : `DONATE $${effectiveDollars} for ${candidate.name}`}
          </button>

          <p className="text-xs text-gray-400 text-center">
            This is a PoC — no real money is processed. Contributions are not tax-deductible.
          </p>
        </form>
      </div>

      <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        <strong>Legal notice:</strong> Contributions to federal candidates are not tax-deductible.
        Maximum $3,300 per candidate per election. US citizens and permanent residents only.
      </div>
    </div>
  );
}
