import { Suspense } from "react";
import { HomeClient, HomeClientWithSearch } from "@/components/HomeClient";
import { getMoments } from "@/lib/moments";

export default function Home() {
  const moments = getMoments();

  return (
    <Suspense fallback={<HomeClient moments={moments} />}>
      <HomeClientWithSearch moments={moments} />
    </Suspense>
  );
}
