"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "สมัครสมาชิกไม่สำเร็จ");
        return;
      }

      router.push("/login");
    } catch {
      setError("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="form-title">สมัครสมาชิก</h1>

        {error && <p className="alert alert-error">{error}</p>}

        <div className="field">
          <label className="label" htmlFor="name">
            ชื่อ-นามสกุล
          </label>
          <input
            id="name"
            className="input"
            type="text"
            placeholder="ชื่อ-นามสกุล"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="email">
            อีเมล
          </label>
          <input
            id="email"
            className="input"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="password">
            รหัสผ่าน
          </label>
          <input
            id="password"
            className="input"
            type="password"
            placeholder="อย่างน้อย 6 ตัวอักษร"
            autoComplete="new-password"
            minLength={6}
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
        </button>

        <div className="form-links">
          <p>
            มีบัญชีอยู่แล้ว? <Link href="/login">เข้าสู่ระบบ</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
