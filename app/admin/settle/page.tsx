"use client";

import { useState } from "react";
import { formatCents } from "@/lib/settlement";
import type { SettlementPreview } from "@/lib/settlement";

export default function AdminSettlePage() {
  const [password, setPassword] = useState("");
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [previews, setPreviews] = useState<SettlementPreview[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settled, setSettled] = useState(false);

  async function runPreview() {
    setError(null);
    setLoading(true);
    setPreviews(null);
    setSettled(false);
    try {
      const res = await fetch("/api/admin/settle", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ periodStart, periodEnd, preview: true }),
      });
      const data = await res.json() as { error?: string; previews: SettlementPreview[] };
      if (!res.ok) { setError(data.error ?? "Error"); return; }
      setPreviews(data.previews);
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }

  async function runSettle() {
    if (!confirm("This will mark all donations in the period as settled. Continue?")) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settle", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ periodStart, periodEnd, preview: false }),
      });
      const data = await res.json() as { error?: string; previews: SettlementPreview[] };
      if (!res.ok) { setError(data.error ?? "Error"); return; }
      setPreviews(data.previews);
      setSettled(true);
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }

  function downloadCsv() {
    if (!previews) return;
    const rows = [
      ["State", "District", "Chamber", "Candidate A", "Candidate B", "Total A ($)", "Total B ($)", "Winner", "Campaign Payout ($)", "Charity Payout ($)"],
      ...previews.map((p) => [
        p.state,
        p.district ?? "Senate",
        p.chamber,
        p.candidateA,
        p.candidateB,
        (p.totalA / 100).toFixed(2),
        (p.totalB / 100).toFixed(2),
        p.winnerSide === "tie" ? "Tie" : p.winnerSide === "A" ? p.candidateA : p.candidateB,
        (p.campaignPayout / 100).toFixed(2),
        (p.charityPayout / 100).toFixed(2),
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `settlement-${periodEnd}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalCampaign = previews?.reduce((s, p) => s + p.campaignPayout, 0) ?? 0;
  const totalCharity = previews?.reduce((s, p) => s + p.charityPayout, 0) ?? 0;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Settlement Admin</h1>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Admin Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-64 outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Password"
          />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Period Start</label>
            <input
              type="date"
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Period End</label>
            <input
              type="date"
              value={periodEnd}
              onChange={(e) => setPeriodEnd(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={runPreview}
            disabled={loading || !periodStart || !periodEnd || !password}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium disabled:opacity-40"
          >
            {loading ? "Loading…" : "Preview"}
          </button>
          {previews && !settled && (
            <button
              onClick={runSettle}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-medium disabled:opacity-40"
            >
              Confirm &amp; Settle
            </button>
          )}
          {previews && (
            <button
              onClick={downloadCsv}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium"
            >
              Download CSV
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {settled && <p className="text-sm text-green-700 font-medium">Settlement complete. Donations marked as settled.</p>}
      </div>

      {previews && previews.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
              <p className="text-xs font-semibold uppercase text-green-600 mb-1">Total to Charity</p>
              <p className="text-2xl font-bold text-green-700">{formatCents(totalCharity)}</p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
              <p className="text-xs font-semibold uppercase text-gray-500 mb-1">Total to Campaigns</p>
              <p className="text-2xl font-bold text-gray-700">{formatCents(totalCampaign)}</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left">Race</th>
                  <th className="px-4 py-3 text-right">Total A</th>
                  <th className="px-4 py-3 text-right">Total B</th>
                  <th className="px-4 py-3 text-center">Winner</th>
                  <th className="px-4 py-3 text-right">→ Campaign</th>
                  <th className="px-4 py-3 text-right">→ Charity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {previews.map((p) => (
                  <tr key={p.raceId}>
                    <td className="px-4 py-3 font-medium">
                      {p.candidateA} vs {p.candidateB}
                      <span className="block text-xs text-gray-400">
                        {p.state}{p.district ? `-${p.district}` : ""} {p.chamber}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-red-600">{formatCents(p.totalA)}</td>
                    <td className="px-4 py-3 text-right text-blue-600">{formatCents(p.totalB)}</td>
                    <td className="px-4 py-3 text-center font-semibold">
                      {p.winnerSide === "tie" ? "Tie" : p.winnerSide === "A" ? p.candidateA : p.candidateB}
                    </td>
                    <td className="px-4 py-3 text-right">{formatCents(p.campaignPayout)}</td>
                    <td className="px-4 py-3 text-right text-green-700 font-medium">{formatCents(p.charityPayout)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {previews && previews.length === 0 && (
        <p className="text-gray-500 text-sm">No captured donations found in this period.</p>
      )}
    </div>
  );
}
