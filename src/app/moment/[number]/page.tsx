import { notFound } from "next/navigation";
import Link from "next/link";
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
    <div className="animate-fade-in-up space-y-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-foreground-secondary hover:text-classic-blue">
          ← Back
        </Link>
      </div>
      <MomentDetail moment={moment} />
      <GiscusComments discussionNumber={moment.number} />
    </div>
  );
}
