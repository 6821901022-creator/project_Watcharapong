import Link from "next/link";
import BlogCard from "@/components/BlogCard";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow" style={{ color: "#a7f3d0" }}>
            Startic SHOP
          </p>
          <h1>สินค้าคุณภาพและบทความดี ๆ ในที่เดียว</h1>
          <p>
            เลือกชมสินค้าล่าสุด และติดตามบทความ ข่าวสาร
            และเรื่องราวใหม่ ๆ จากเรา
          </p>
          <div className="hero-actions">
            <Link href="/products" className="btn btn-light">
              ดูสินค้าทั้งหมด
            </Link>
            <Link href="/blogs" className="btn btn-outline">
              อ่านบทความ
            </Link>
          </div>
        </div>
      </section>

      <div className="page">
        <p className="eyebrow">Latest</p>
        <h2 className="page-title">บทความล่าสุด</h2>
        <p className="page-subtitle mb-8">
          เรื่องราวและข่าวสารที่เพิ่งอัปเดต
        </p>
        <BlogCard limit={3} />
      </div>
    </>
  );
}
