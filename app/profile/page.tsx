import type { Metadata } from "next";
import { requireUser } from "@/library/guards";

export const metadata: Metadata = { title: "โปรไฟล์" };

export default async function Profile() {
  const user = await requireUser();

  return (
    <div className="page">
      <p className="eyebrow">Profile</p>
      <h1 className="page-title">โปรไฟล์ของฉัน</h1>

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
    </div>
  );
}
