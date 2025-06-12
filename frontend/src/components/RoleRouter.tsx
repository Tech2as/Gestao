import { jwtDecode } from "jwt-decode";

export default function RoleRouter() {
  const token = localStorage.getItem("token");

  if (!token) return <p>Sem token</p>;

  const { role } = jwtDecode(token) as { role: string };

  if (role === "ADMIN") return <AdminDashboard />;
  if (role === "OFICINA") return <OficinaPage />;
  if (role === "SEGURADORA") return <SeguradoraView />;
  if (role === "REGULADOR") return <ReguladorView />;

  return <p>Role inválido</p>;
}