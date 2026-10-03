import { redirect } from "next/navigation";
import { getSession } from "@/library/session";

/** ใช้ใน Server Component: ต้อง login ถึงเข้าได้ */
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** ใช้ใน Server Component: ต้องเป็น admin ถึงเข้าได้ */
export async function requireAdmin() {
  const session = await requireUser();
  if (session.role !== "admin") redirect("/dashboard");
  return session;
}
