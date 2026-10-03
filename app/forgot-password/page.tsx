"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: เรียก API ส่งอีเมลรีเซ็ตรหัสผ่านเมื่อพร้อมใช้งานจริง
    setSent(true);
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="form-title">ลืมรหัสผ่าน</h1>

        {sent ? (
          <p className="alert">
            หากมีบัญชีที่ใช้อีเมล {email} ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านไปให้
            (ฟีเจอร์นี้ยังเป็นเพียงหน้าตัวอย่าง)
          </p>
        ) : (
          <>
            <div className="field">
              <label className="label" htmlFor="email">
                อีเมลที่ใช้สมัคร
              </label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </button>
          </>
        )}

        <div className="form-links">
          <p>
            <Link href="/login">กลับไปหน้าเข้าสู่ระบบ</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
