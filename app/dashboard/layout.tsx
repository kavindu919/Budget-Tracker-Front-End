"use client";

import { useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen w-full">
      <aside className="md:block md:w-16 lg:w-64">
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </aside>

      <div className="bg-primary flex h-full w-full flex-col">
        <div className="flex w-full items-center justify-end">
          <Navbar setIsMobileOpen={setIsMobileOpen} />
        </div>

        <main className="hide-scrollbar flex-1 overflow-x-hidden overflow-y-auto px-4">
          {children}
        </main>
      </div>
    </div>
  );
}
