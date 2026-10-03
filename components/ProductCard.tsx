import Image from "next/image";

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
  const soldOut = product.stock <= 0;

  return (
    <article className="card overflow-hidden transition hover:-translate-y-1">
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
          <p className="text-xl font-bold text-slate-900">
            ฿
            {product.price.toLocaleString("th-TH", {
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="text-sm text-slate-500">
            {soldOut ? "หมดแล้ว" : `คงเหลือ ${product.stock}`}
          </p>
        </div>
      </div>
    </article>
  );
}
