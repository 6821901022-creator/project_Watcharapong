import { connectDB } from "@/library/mongodb";
import Blog from "@/models/Blog";

interface BlogListProps {
  /** จำกัดจำนวนบทความที่แสดง (ไม่ใส่ = แสดงทั้งหมด) */
  limit?: number;
}

export default async function BlogCard({ limit }: BlogListProps) {
  await connectDB();

  let query = Blog.find().sort({ createdAt: -1 });
  if (limit) query = query.limit(limit);
  const blogs = await query.lean();

  const items = blogs.map((blog) => ({
    _id: blog._id.toString(),
    title: String(blog.title ?? ""),
    slug: String(blog.slug ?? ""),
    content: String(blog.content ?? ""),
    createdAt: blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString("th-TH", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
  }));

  if (items.length === 0) {
    return <div className="empty-state">ยังไม่มีบทความ</div>;
  }

  return (
    <section aria-label="รายการบทความ" className="card-grid">
      {items.map((blog) => (
        <article
          key={blog._id}
          className="card flex min-h-56 flex-col p-6 transition hover:-translate-y-1"
        >
          {blog.createdAt && (
            <time className="text-sm text-slate-500">{blog.createdAt}</time>
          )}

          <h2 className="mt-3 text-xl font-bold text-slate-900">
            {blog.title}
          </h2>

          {blog.slug && (
            <p className="mt-1 text-sm font-medium text-emerald-700">
              #{blog.slug}
            </p>
          )}

          <p className="mt-4 line-clamp-5 whitespace-pre-line text-sm leading-7 text-slate-600">
            {blog.content || "บทความนี้ยังไม่มีรายละเอียด"}
          </p>
        </article>
      ))}
    </section>
  );
}
