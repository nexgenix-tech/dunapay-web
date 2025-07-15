import { notFound } from "next/navigation";

import { getFineById } from "@/lib/api";
import PaymentDetails from "./content";

interface PaymentDetailsPageProps {
  params: Promise<{ fineId: string }>;
}

export default async function PaymentDetailsPage({
  params,
}: PaymentDetailsPageProps) {
  const { fineId } = await params;
  const fine = await getFineById(fineId);

  if (!fine) {
    notFound();
  }

  return <PaymentDetails fine={fine} />;
}
