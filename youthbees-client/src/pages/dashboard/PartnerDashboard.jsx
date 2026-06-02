import DashboardLayout from "../../layouts/DashboardLayout";
import API_BASE_URL from "../../config/api";

export default function PartnerDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-black mb-8">Partner Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Active Programs" />
        <Card title="Post New Program" />
      </div>
    </DashboardLayout>
  );
}

function Card({ title }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow font-bold">
      {title}
    </div>
  );
}
