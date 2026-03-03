import AdminHeader from "@/app/modules/admin/AdminHeader";
import { getAllGuides } from "@/lib/tours-repository";
import GuidesList from "@/app/modules/admin/guides/GuidesList";

export const metadata = {
  title: "Гиды — Admin",
  description: "Панель управления — управление гидами",
};

export default async function AdminGuidesPage() {
  const guides = await getAllGuides();

  return (
    <div className="min-h-screen bg-dark-section text-light-surface relative overflow-hidden">
      <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-accent-cta/10 rounded-full blur-[160px] pointer-events-none opacity-40" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent-cta/5 rounded-full blur-[130px] pointer-events-none opacity-30" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <AdminHeader />
        <main className="container mx-auto px-6 py-14 flex-1">
          <GuidesList guides={guides} />
        </main>
      </div>
    </div>
  );
}
