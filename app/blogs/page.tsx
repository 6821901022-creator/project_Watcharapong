import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "บทความ",
  description: "รวมบทความและข่าวสารล่าสุด",
};

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return (
    <div className="page">
      <p className="eyebrow">Blog</p>
      <h1 className="page-title">บทความทั้งหมด</h1>
      <p className="page-subtitle mb-8">
        ติดตามบทความ ข่าวสาร และเรื่องราวล่าสุดจากเรา
      </p>
      <BlogCard />
    </div>
  );
}
