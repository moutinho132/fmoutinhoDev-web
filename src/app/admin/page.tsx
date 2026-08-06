import { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | fmoutinhoDev",
  description: "Panel de administración para gestionar mensajes y testimonios.",
};

// En producción, verificar autenticación con middleware o server-side
export default function AdminPage() {
  // Por ahora, página accesible directamente
  // En producción: verificar sesión/auth aquí
  return <AdminDashboard />;
}
