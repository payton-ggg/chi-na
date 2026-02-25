import AdminHeader from "@/app/modules/admin/AdminHeader";
import TourForm from "@/app/modules/admin/TourForm";

export const metadata = {
  title: "Admin — Tsunami Travel",
  description: "Панель управления — создание новых концептов",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-dark-section text-light-surface relative overflow-hidden">
      <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-accent-cta/10 rounded-full blur-[160px] pointer-events-none opacity-40" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent-cta/5 rounded-full blur-[130px] pointer-events-none opacity-30" />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.025] whitespace-nowrap z-0">
        <span className="text-[36vw] font-black leading-none tracking-tighter text-light-surface">
          ADMIN
        </span>
      </div>

      <div className="relative z-10">
        <AdminHeader />
        <main className="container mx-auto px-6 py-14">
          <TourForm />
        </main>
      </div>
    </div>
  );
}
