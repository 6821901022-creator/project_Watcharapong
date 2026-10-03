"use client";

import { FormEvent, useState } from "react";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function createSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9ก-๙-]/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(createSlug(value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "เพิ่มบทความไม่สำเร็จ");
      }

      setMessage("เพิ่มบทความสำเร็จ");
      setTitle("");
      setSlug("");
      setContent("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาด"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form-card"
    >
      <h1 className="form-title">เพิ่มบทความ</h1>

      <div className="field">
        <label className="label">
          หัวข้อบทความ
        </label>

        <input
          type="text"
          value={title}
          onChange={(event) =>
            handleTitleChange(event.target.value)
          }
          className="input"
          required
        />
      </div>

      <div className="field">
        <label className="label">Slug</label>

        <input
          type="text"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          className="input"
          required
        />
      </div>

      <div className="field">
        <label className="label">
          รายละเอียด
        </label>

        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          className="input"
        />
      </div>

      {message && (
        <p className={message.includes("สำเร็จ") && !message.includes("ไม่สำเร็จ") ? "alert" : "alert alert-error"}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary btn-block"
      >
        {submitting ? "กำลังบันทึก..." : "เพิ่มบทความ"}
      </button>
    </form>
  );
}