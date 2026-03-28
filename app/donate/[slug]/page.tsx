import { notFound } from "next/navigation";
import { findRaceBySlug } from "@/lib/mock-races";
import { DonatePage } from "./DonatePage";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ side?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = findRaceBySlug(slug);
  if (!found) return { title: "Race not found" };
  return {
    title: `Donate — ${found.race.democrat.name} vs ${found.race.republican.name} | Good Draw`,
  };
}

export default async function DonatePageRoute({ params, searchParams }: Props) {
  const { slug } = await params;
  const { side } = await searchParams;
  const found = findRaceBySlug(slug);
  if (!found) notFound();

  const defaultSide: "D" | "R" = side === "R" ? "R" : "D";

  return <DonatePage state={found.state} race={found.race} defaultSide={defaultSide} />;
}
