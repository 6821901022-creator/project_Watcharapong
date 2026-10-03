import type { Metadata } from "next";

export const metadata: Metadata = { title: "เกี่ยวกับเรา" };

export default function About() {
  return (
    <div className="page">
      <p className="eyebrow">About</p>
      <h1 className="page-title">เกี่ยวกับเรา</h1>
      <div className="card mt-6 max-w-3xl p-8 leading-8 text-slate-600">
        <p>
          Startic SHOP คือร้านค้าออนไลน์ที่รวบรวมสินค้าและบทความไว้ในที่เดียว
          เราตั้งใจคัดสรรสินค้าที่ดี และแบ่งปันเรื่องราวที่เป็นประโยชน์ให้ผู้เยี่ยมชมทุกคน
        </p>
      </div>
    </div>
  );
}
