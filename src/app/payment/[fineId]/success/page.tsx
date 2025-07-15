import { notFound } from "next/navigation";

import { getFineById } from "@/lib/api";
import PaymentSuccess from "./content";

interface PaymentSuccessPageProps {
  params: Promise<{ fineId: string }>;
}

export default async function PaymentSuccessPage({
  params,
}: PaymentSuccessPageProps) {
  const { fineId } = await params;
  const fine = await getFineById(fineId);

  if (!fine) {
    notFound();
  }

  return <PaymentSuccess fine={fine} />;
}
