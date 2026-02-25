// Server Component — no 'use client' at route level.
// All interactivity lives inside the imported client subtrees.

import AdminHeader from "./components/AdminHeader";
import TourForm from "./components/TourForm";

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
