import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
  return (
    <AuthenticatedLayout header={<h2>Dashboard</h2>}>
      <Head title="Dashboard" />

      <div className="overflow-hidden border-[1px] shadow-sm sm:rounded-lg">
        <div className="p-4">You're logged in!</div>
      </div>
    </AuthenticatedLayout>
  );
}
