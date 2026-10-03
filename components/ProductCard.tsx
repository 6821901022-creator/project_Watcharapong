"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category?: {
      _id: string;
      name: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false);

  const soldOut = product.stock <= 0;
  const price = product.price.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
  });

  // ปิดด้วยปุ่ม Esc และล็อกการเลื่อนหน้าขณะเปิด modal
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="card w-full cursor-pointer overflow-hidden text-left transition hover:-translate-y-1"
        aria-haspopup="dialog"
      >
        <div className="relative aspect-square w-full bg-slate-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
          {soldOut && (
            <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
              สินค้าหมด
            </span>
          )}
        </div>

        <div className="space-y-2 p-4">
          {product.category && (
            <p className="text-sm font-medium text-emerald-700">
              {product.category.name}
            </p>
          )}

          <h2 className="text-lg font-semibold text-slate-900">
            {product.name}
          </h2>

          <p className="line-clamp-2 text-sm text-slate-600">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-1">
            <p className="text-xl font-bold text-slate-900">฿{price}</p>
            <p className="text-sm text-slate-500">
              {soldOut ? "หมดแล้ว" : `คงเหลือ ${product.stock}`}
            </p>
          </div>
        </div>
      </button>

      {open && (
        <div
          className="modal-backdrop"
          onClick={() => setOpen(false)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="ปิด"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <div className="modal-image">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-contain"
              />
            </div>

            <div className="modal-body">
              {product.category && (
                <span className="badge">{product.category.name}</span>
              )}

              <h2 className="modal-title">{product.name}</h2>

              <p className="modal-price">฿{price}</p>

              <p
                className={
                  soldOut ? "modal-stock modal-stock-out" : "modal-stock"
                }
              >
                {soldOut
                  ? "สินค้าหมด"
                  : `มีสินค้า ${product.stock.toLocaleString("th-TH")} ชิ้น`}
              </p>

              <h3 className="modal-subtitle">รายละเอียดสินค้า</h3>
              <p className="modal-desc">{product.description}</p>

              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => setOpen(false)}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}