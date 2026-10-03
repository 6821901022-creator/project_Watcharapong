import type { Metadata } from "next";
import type { Types } from "mongoose";
import { connectDB } from "@/library/mongodb";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "สินค้า",
  description: "เลือกชมสินค้าทั้งหมดของเรา",
};

export const dynamic = "force-dynamic";

type PopulatedCategory = { _id: Types.ObjectId; name: string };

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find({ published: true })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean();

  const items = products.map((product) => {
    const category = product.category as unknown as PopulatedCategory | null;

    return {
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      category:
        category && typeof category === "object" && "_id" in category
          ? { _id: category._id.toString(), name: String(category.name) }
          : undefined,
    };
  });

  return (
    <div className="page">
      <p className="eyebrow">Shop</p>
      <h1 className="page-title">สินค้าทั้งหมด</h1>
      <p className="page-subtitle mb-8">เลือกสินค้าที่คุณสนใจ</p>

      {items.length === 0 ? (
        <div className="empty-state">ยังไม่มีสินค้า</div>
      ) : (
        <div className="card-grid">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
