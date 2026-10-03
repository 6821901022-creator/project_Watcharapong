"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  role: "admin" | "user";
};

type NavItem = { href: string; label: string };

const publicLinks: NavItem[] = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/products", label: "สินค้า" },
  { href: "/blogs", label: "บทความ" },
];

const adminLinks: NavItem[] = [
  { href: "/admin/users", label: "ผู้ใช้" },
  { href: "/admin/blogs", label: "จัดการบทความ" },
  { href: "/admin/categories", label: "จัดการหมวดหมู่" },
  { href: "/admin/products", label: "จัดการสินค้า" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // โหลดสถานะผู้ใช้ใหม่ทุกครั้งที่เปลี่ยนหน้า เพราะ Navbar อยู่ใน root layout
  useEffect(() => {
    let ignore = false;

    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (!ignore) setUser(data.user);
      } catch {
        if (!ignore) setUser(null);
      }
    }

    loadUser();

    return () => {
      ignore = true;
    };
  }, [pathname]);

  // หน้า login/logout ส่ง event นี้เพื่ออัปเดต Navbar ทันที
  useEffect(() => {
    function handleAuthChange(event: Event) {
      const authEvent = event as CustomEvent<{ user: User | null }>;
      setUser(authEvent.detail?.user ?? null);
    }

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });

    setUser(null);
    window.dispatchEvent(
      new CustomEvent("auth-change", { detail: { user: null } })
    );
    router.push("/login");
    router.refresh();
  }

  function linkClass(href: string) {
    const active =
      href === "/" ? pathname === "/" : pathname.startsWith(href);
    return active ? "active" : undefined;
  }

  function renderLink(item: NavItem) {
    return (
      <li key={item.href}>
        <Link href={item.href} className={linkClass(item.href)}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">S</span>
          Startic SHOP
        </Link>

        <button
          type="button"
          className="menu-btn"
          aria-label="เปิด/ปิดเมนู"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul
          className={menuOpen ? "nav-links active" : "nav-links"}
          onClick={() => setMenuOpen(false)}
        >
          {publicLinks.map(renderLink)}

          {user && renderLink({ href: "/dashboard", label: "Dashboard" })}

          {user?.role === "admin" && adminLinks.map(renderLink)}

          {!user ? (
            <>
              {renderLink({ href: "/login", label: "เข้าสู่ระบบ" })}
              <li>
                <Link href="/register" className="btn-register">
                  สมัครสมาชิก
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="user-info">
                {user.name} ({user.role})
              </li>
              {renderLink({ href: "/profile", label: "โปรไฟล์" })}
              <li>
                <button
                  type="button"
                  onClick={logout}
                  className="btn-logout"
                >
                  ออกจากระบบ
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
