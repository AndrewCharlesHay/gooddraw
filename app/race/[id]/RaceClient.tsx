"use client";

import { useState } from "react";
import { ImpactMeter } from "@/components/ImpactMeter";
import { DonateModal } from "@/components/DonateModal";
import type { Race } from "@/drizzle/schema";

export function RaceClient({ initialRace }: { initialRace: Race }) {
  const [race, setRace] = useState(initialRace);
  const [modal, setModal] = useState<"A" | "B" | null>(null);
  const [donated, setDonated] = useState(false);

  function handleSuccess(totalA: number, totalB: number) {
    setRace((r) => ({ ...r, totalA, totalB }));
    setDonated(true);
  }

  const partyColorA = race.partyA === "R" ? "red" : race.partyA === "D" ? "blue" : "purple";
  const partyColorB = race.partyB === "R" ? "red" : race.partyB === "D" ? "blue" : "purple";

  return (
    <>
      {donated && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-5 py-4 text-green-800 font-medium text-sm">
          Your donation was recorded! The totals below have been updated.
        </div>
      )}

      <ImpactMeter
        totalA={race.totalA}
        totalB={race.totalB}
        candidateA={race.candidateA}
        candidateB={race.candidateB}
      />

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => setModal("A")}
          className={`rounded-xl border-2 border-${partyColorA}-500 bg-${partyColorA}-50 px-6 py-4 text-left hover:bg-${partyColorA}-100 transition-colors`}
        >
          <div className={`text-sm font-semibold text-${partyColorA}-700 mb-1`}>
            Donate for
          </div>
          <div className={`text-xl font-bold text-${partyColorA}-800`}>
            {race.candidateA}
          </div>
          <div className={`text-sm text-${partyColorA}-600`}>({race.partyA})</div>
        </button>

        <button
          onClick={() => setModal("B")}
          className={`rounded-xl border-2 border-${partyColorB}-500 bg-${partyColorB}-50 px-6 py-4 text-left hover:bg-${partyColorB}-100 transition-colors`}
        >
          <div className={`text-sm font-semibold text-${partyColorB}-700 mb-1`}>
            Donate for
          </div>
          <div className={`text-xl font-bold text-${partyColorB}-800`}>
            {race.candidateB}
          </div>
          <div className={`text-sm text-${partyColorB}-600`}>({race.partyB})</div>
        </button>
      </div>

      {modal && (
        <DonateModal
          race={race}
          defaultSide={modal}
          onClose={() => setModal(null)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
