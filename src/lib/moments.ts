import rawMoments from "@/data/moments.json";
import type { Moment } from "@/lib/types";

export function getMoments(): Moment[] {
  return rawMoments as Moment[];
}

export function getMomentByNumber(number: number): Moment | undefined {
  return getMoments().find((moment) => moment.number === number);
}
