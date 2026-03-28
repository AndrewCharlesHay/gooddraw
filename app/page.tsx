import { USMap } from "@/components/USMap";

export default function HomePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">2026 Races</h1>
        <p className="text-gray-600 max-w-2xl">
          Hover over a state to see the top race. Click to explore all races.
          Make a donation for your candidate — opposing donations cancel out and the matched amount goes to{" "}
          <span className="font-medium text-green-700">CHARITY</span>.
        </p>
      </div>
      <USMap />
    </div>
  );
}
