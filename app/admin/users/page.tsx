import type { Metadata } from "next";
import { requireAdmin } from "@/library/guards";

export const metadata: Metadata = { title: "ผู้ใช้ (Admin)" };

export default async function AdminUsersPage() {
  await requireAdmin();

  return (
    <div className="page">
      <p className="eyebrow">Admin</p>
      <h1 className="page-title">จัดการผู้ใช้</h1>
      <p className="page-subtitle">หน้านี้เข้าได้เฉพาะ Admin เท่านั้น</p>
    </div>
  );
}
