"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "เข้าสู่ระบบไม่สำเร็จ");
        return;
      }

      window.dispatchEvent(
        new CustomEvent("auth-change", { detail: { user: data.user } })
      );
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="form-title">เข้าสู่ระบบ</h1>

        {error && <p className="alert alert-error">{error}</p>}

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
            placeholder="••••••••"
            autoComplete="current-password"
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
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>

        <div className="form-links">
          <p>
            <Link href="/forgot-password">ลืมรหัสผ่าน?</Link>
          </p>
          <p>
            ยังไม่มีบัญชี? <Link href="/register">สมัครสมาชิก</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
