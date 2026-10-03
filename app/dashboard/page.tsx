import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/library/guards";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div className="page">
      <p className="eyebrow">Dashboard</p>
      <h1 className="page-title">สวัสดี {user.name}</h1>
      <p className="page-subtitle">ยินดีต้อนรับกลับมา</p>

      <dl className="stat-grid">
        <div className="card stat">
          <dt>ชื่อ</dt>
          <dd>{user.name}</dd>
        </div>
        <div className="card stat">
          <dt>อีเมล</dt>
          <dd>{user.email}</dd>
        </div>
        <div className="card stat">
          <dt>สิทธิ์</dt>
          <dd>
            <span className="badge">{user.role}</span>
          </dd>
        </div>
      </dl>

      {user.role === "admin" && (
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/admin/products" className="btn btn-primary">
            จัดการสินค้า
          </Link>
          <Link href="/admin/categories" className="btn btn-primary">
            จัดการหมวดหมู่
          </Link>
          <Link href="/admin/blogs" className="btn btn-primary">
            จัดการบทความ
          </Link>
        </div>
      )}
    </div>
  );
}
