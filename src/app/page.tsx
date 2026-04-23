import { HomeClient } from "@/components/HomeClient";
import { getMoments } from "@/lib/moments";

export default function Home() {
  const moments = getMoments();

  return <HomeClient moments={moments} />;
}
