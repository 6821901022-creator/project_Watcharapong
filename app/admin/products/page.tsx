import type { Metadata } from "next";
import ProductForm from "@/components/ProductsForm";
import { requireAdmin } from "@/library/guards";

export const metadata: Metadata = { title: "จัดการสินค้า" };

export default async function ProductsPage() {
  await requireAdmin();

  return (
    <div className="page">
      <ProductForm />
    </div>
  );
}
