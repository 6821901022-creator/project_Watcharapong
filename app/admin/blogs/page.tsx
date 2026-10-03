import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import BlogForm from "@/components/BlogForm";
import { requireAdmin } from "@/library/guards";

export const metadata: Metadata = { title: "จัดการบทความ" };
export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  await requireAdmin();

  return (
    <div className="page">
      <BlogForm />
      <h2 className="page-title mb-6">บทความทั้งหมด</h2>
      <BlogCard />
    </div>
  );
}
