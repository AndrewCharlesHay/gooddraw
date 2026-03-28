"use client";

import { useState, useRef, useCallback } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Link from "next/link";
import {
  STATE_BY_ABBR,
  FIPS_TO_ABBR,
  getPrimaryRace,
  getStateFill,
  getRaceSlug,
  type StateData,
  type Race,
} from "@/lib/mock-races";
import { RaceBar } from "./RaceBar";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface Tooltip {
  x: number;
  y: number;
  state: StateData;
}

const RACE_TYPE_LABEL: Record<Race["type"], string> = {
  senate: "U.S. Senate",
  governor: "Governor",
  house: "House",
};

export function USMap() {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [selected, setSelected] = useState<StateData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, stateData: StateData) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        state: stateData,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const handleClick = useCallback((stateData: StateData) => {
    setSelected((prev) => (prev?.abbr === stateData.abbr ? null : stateData));
    setTooltip(null);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Map */}
      <div
        ref={containerRef}
        className="relative flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden"
        style={{ minHeight: 420 }}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          style={{ width: "100%", height: "100%" }}
          viewBox="0 0 960 600"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = String(geo.id).padStart(2, "0");
                const abbr = FIPS_TO_ABBR[fips];
                const stateData = abbr ? STATE_BY_ABBR.get(abbr) : undefined;
                if (!stateData) return null;

                const isHovered = tooltip?.state.abbr === abbr;
                const isSelected = selected?.abbr === abbr;
                const fill = getStateFill(stateData, isHovered, isSelected, tooltip !== null || selected !== null);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#fff"
                    strokeWidth={0.8}
                    style={{
                      default: { outline: "none", cursor: "pointer", transition: "fill 0.15s" },
                      hover: { outline: "none", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                    onMouseMove={(e) => handleMouseMove(e as unknown as React.MouseEvent, stateData)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(stateData)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Hover tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-20 bg-white rounded-xl shadow-xl border border-gray-200 p-3 w-72"
            style={{
              left: Math.min(tooltip.x + 16, (containerRef.current?.clientWidth ?? 0) - 300),
              top: Math.max(tooltip.y - 10, 8),
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">{tooltip.state.name}</span>
              <span className="text-xs text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">
                {RACE_TYPE_LABEL[getPrimaryRace(tooltip.state).type]}
              </span>
            </div>
            <RaceBar race={getPrimaryRace(tooltip.state)} size="sm" />
            <p className="text-xs text-gray-400 mt-2 text-center">Click to see all races</p>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs text-gray-500 bg-white/80 rounded-lg px-2 py-1">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-200 inline-block" /> D leading
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-200 inline-block" /> R leading
          </span>
        </div>
      </div>

      {/* State panel */}
      {selected && (
        <div className="lg:w-80 bg-white rounded-2xl border border-gray-200 overflow-y-auto max-h-[600px]">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
            <h2 className="font-bold text-lg">{selected.name}</h2>
            <button
              onClick={() => setSelected(null)}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              &times;
            </button>
          </div>

          <div className="p-4 space-y-5">
            {selected.races.map((race, i) => {
              const slug = getRaceSlug(selected.abbr, race);
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        race.type === "senate"
                          ? "bg-purple-100 text-purple-700"
                          : race.type === "governor"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {race.type === "senate" ? "Senate" : race.type === "governor" ? "Governor" : "House"}
                    </span>
                    <span className="text-xs text-gray-400">{race.label}</span>
                  </div>

                  <RaceBar
                    race={race}
                    size="md"
                    hrefD={`/donate/${slug}?side=D`}
                    hrefR={`/donate/${slug}?side=R`}
                  />

                  <div className="flex gap-2 mt-1">
                    <Link
                      href={`/donate/${slug}?side=D`}
                      className="flex-1 text-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      DONATE
                    </Link>
                    <Link
                      href={`/donate/${slug}?side=R`}
                      className="flex-1 text-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      DONATE
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
