import type { Metadata } from "next";
import CategoryForm from "@/components/CategoryForm";
import { requireAdmin } from "@/library/guards";

export const metadata: Metadata = { title: "จัดการหมวดหมู่" };

export default async function CategoryPage() {
  await requireAdmin();
  return <CategoryForm />;
}
