import AdminHeader from "@/app/modules/admin/AdminHeader";
import TourForm from "@/app/modules/admin/TourForm";

export const metadata = {
  title: "Admin — Tsunami Travel",
  description: "Панель управления — создание новых концептов",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white">
      <AdminHeader />
      <main className="container mx-auto px-6 py-12">
        <TourForm />
      </main>
    </div>
  );
}
