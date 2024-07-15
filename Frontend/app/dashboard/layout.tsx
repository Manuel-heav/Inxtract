import { Sidebar } from "@/components/component/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen pl-64 scale-95">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
