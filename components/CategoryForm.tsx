"use client";

import { FormEvent, useState } from "react";

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9ก-๙-]/g, "");
}

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  function handleNameChange(value: string) {
    setName(value);
    setSlug(createSlug(value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage(null);

      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "เพิ่มหมวดหมู่ไม่สำเร็จ");
      }

      setMessage({ text: "เพิ่มหมวดหมู่สำเร็จ", ok: true });
      setName("");
      setSlug("");
      setDescription("");
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : "เกิดข้อผิดพลาด",
        ok: false,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="cat-page">
      <form onSubmit={handleSubmit} className="cat-card">
        <h1 className="form-title">เพิ่มหมวดหมู่</h1>

        <div className="field">
          <label className="label" htmlFor="cat-name">
            ชื่อหมวดหมู่
          </label>
          <input
            id="cat-name"
            className="input"
            type="text"
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="cat-slug">
            Slug
          </label>
          <input
            id="cat-slug"
            className="input"
            type="text"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="cat-desc">
            รายละเอียด
          </label>
          <textarea
            id="cat-desc"
            className="input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        {message && (
          <p className={message.ok ? "alert" : "alert alert-error"}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting}
        >
          {submitting ? "กำลังบันทึก..." : "เพิ่มหมวดหมู่"}
        </button>
      </form>
    </div>
  );
}
