import { notFound } from "next/navigation";
import { GiscusComments } from "@/components/GiscusComments";
import { MomentDetail } from "@/components/MomentDetail";
import { getMomentByNumber, getMoments } from "@/lib/moments";

export async function generateStaticParams() {
  return getMoments().map((moment) => ({ number: String(moment.number) }));
}

export const dynamicParams = false;

export default async function MomentPage({ params }: { params: Promise<{ number: string }> }) {
  const resolved = await params;
  const moment = getMomentByNumber(Number(resolved.number));

  if (!moment) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <MomentDetail moment={moment} />
      <GiscusComments discussionNumber={moment.number} />
    </div>
  );
}
