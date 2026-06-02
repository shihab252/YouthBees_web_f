import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen flex bg-[#FFF9F5]">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="font-black text-xl mb-10 text-orange-500">YouthBees</h2>

        <nav className="space-y-4 text-sm font-bold uppercase tracking-wide">
          <Link to={`/dashboard/${role}`} className="block hover:text-orange-400">
            Dashboard
          </Link>
          <Link to="/" className="block hover:text-orange-400">
            Home
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="text-left w-full hover:text-red-400"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
