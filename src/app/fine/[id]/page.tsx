import { notFound } from "next/navigation";

import { getFineById } from "@/lib/api";
import FineDetails from "./Content";

interface FineDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function FineDetailsPage({
  params,
}: FineDetailsPageProps) {
  const { id } = await params;
  const fine = await getFineById(id);

  if (!fine) {
    notFound();
  }

  return <FineDetails fine={fine} />;
}
