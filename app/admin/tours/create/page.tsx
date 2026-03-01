import AdminHeader from "@/app/modules/admin/AdminHeader";
import TourForm from "@/app/modules/admin/tour-form/TourForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Создать тур — Admin",
  description: "Создание нового тура",
};

export default function CreateTourPage() {
  return (
    <div className="min-h-screen bg-dark-section text-light-surface relative overflow-hidden">
      <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-accent-cta/10 rounded-full blur-[160px] pointer-events-none opacity-40" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent-cta/5 rounded-full blur-[130px] pointer-events-none opacity-30" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <AdminHeader />
        <main className="container mx-auto px-6 py-10 flex-1">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-light-surface/40 hover:text-light-surface transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Назад к списку туров
          </Link>
          <TourForm />
        </main>
      </div>
    </div>
  );
}
