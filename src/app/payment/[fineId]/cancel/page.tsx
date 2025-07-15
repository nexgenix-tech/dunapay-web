import { notFound } from "next/navigation";

import { getFineById } from "@/lib/api";
import PaymentCanceled from "./content";

interface PaymentCanceledPageProps {
  params: Promise<{ fineId: string }>;
}

export default async function PaymentCanceledPage({
  params,
}: PaymentCanceledPageProps) {
  const { fineId } = await params;
  const fine = await getFineById(fineId);

  if (!fine) {
    notFound();
  }

  return <PaymentCanceled fine={fine} />;
}
