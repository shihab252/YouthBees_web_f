import DashboardLayout from "../../layouts/DashboardLayout";

import API_BASE_URL from "../../config/api";
export default function AffiliateDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-black mb-8">Affiliate Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Stat title="Referrals" value="0" />
        <Stat title="Earnings" value="৳0" />
        <Stat title="Referral Link" value="Copy" />
      </div>
    </DashboardLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <p className="text-sm font-bold uppercase">{title}</p>
      <h3 className="text-2xl font-black mt-2">{value}</h3>
    </div>
  );
}
