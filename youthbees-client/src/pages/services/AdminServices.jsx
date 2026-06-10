import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [editingId, setEditingId] = useState(null);
  const [expandedService, setExpandedService] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    banner: "",
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [plans, setPlans] = useState([
    { name: "", price: "", tag: "", popular: false, features: "" },
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/service`);
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handlePlanChange = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const addPlan = () => {
    setPlans([
      ...plans,
      { name: "", price: "", tag: "", popular: false, features: "" },
    ]);
  };

  const removePlan = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  const deleteService = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/service/${id}`);
      setMsg({ type: "success", text: "Service permanently deleted." });
      if (editingId === id) resetForm();
      fetchServices();
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Delete operations failed.",
      });
    }
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      description: service.description,
      banner: service.banner,
    });
    
    setImage(null);
    setImagePreview(service.banner || null);

    setPlans(
      service.plans.map((p) => ({
        name: p.name,
        price: p.price,
        tag: p.tag || "",
        popular: p.popular || false,
        features: p.features.join(", "),
      }))
    );
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", slug: "", shortDescription: "", description: "", banner: "" });
    setPlans([{ name: "", price: "", tag: "", popular: false, features: "" }]);
    setImage(null);
    setImagePreview(null);
  };

  const createService = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg({ type: "", text: "" });

    try {
      let imageUrl = form.banner;

      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "course_uploads");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dxxpuk9ph/image/upload",
          data
        );
        imageUrl = uploadRes.data.secure_url;
      }

      const formattedPlans = plans.map((p) => ({
        name: p.name,
        price: Number(p.price),
        tag: p.tag,
        popular: p.popular,
        features: p.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      }));

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/service/${editingId}`, {
          ...form,
          banner: imageUrl,
          plans: formattedPlans,
        });
        setMsg({ type: "success", text: "Service data updated successfully!" });
      } else {
        await axios.post(`${API_BASE_URL}/api/service/create`, {
          ...form,
          banner: imageUrl,
          plans: formattedPlans,
        });
        setMsg({ type: "success", text: "New service module initialized!" });
      }

      resetForm();
      fetchServices();
    } catch (err) {
      console.error(err);
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to commit service schema.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased font-sans">
      
      {/* APP TOP NAVIGATION BAR */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 lg:px-12 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-indigo-600">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" /> Console Interface
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Service Infrastructure
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
              Active Indexes: <span className="text-slate-900 font-mono font-bold">{services.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-12 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: MANAGEMENT INPUT DESIGNER */}
        <section className="xl:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden xl:sticky xl:top-28">
          
          {/* Dynamic Action State Header Accent */}
          <div className={`px-6 py-4 flex items-center justify-between border-b transition-all ${
            editingId ? "bg-cyan-50/70 border-cyan-200" : "bg-slate-50/70 border-slate-200"
          }`}>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {editingId ? "Modify Target Schema" : "Blueprint Designer"}
              </h2>
              {editingId && <p className="text-[10px] font-bold text-cyan-700 mt-0.5">Editing: ID {editingId.slice(-6)}</p>}
            </div>
            {editingId && (
              <button 
                onClick={resetForm}
                className="text-[10px] font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 transition shadow-xs"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={createService} className="p-6 space-y-5">
            <div className="space-y-3">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Identity Mapping</label>
              <input
                type="text"
                placeholder="Service Title (e.g., Executive CV Engine)"
                className="w-full border border-slate-200 focus:border-indigo-500 bg-white text-slate-900 placeholder-slate-400 p-3 rounded-xl transition text-xs outline-none focus:ring-2 focus:ring-indigo-100 shadow-xs"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded pointer-events-none select-none">/slug</span>
                <input
                  type="text"
                  placeholder="executive-cv-engine"
                  className="w-full border border-slate-200 focus:border-indigo-500 bg-slate-50/50 text-indigo-900 placeholder-slate-400 p-3 pl-16 rounded-xl transition text-xs font-mono outline-none shadow-xs"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Display Header Graphic</label>
              <div className="border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-xl p-4 transition text-center bg-slate-50/50 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                />
                {imagePreview && (
                  <div className="relative mt-3 rounded-xl overflow-hidden border border-slate-100 shadow-xs max-h-[140px]">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Copywriting Components</label>
              <textarea
                placeholder="High-converting catalog snippet summary statement..."
                rows={2}
                className="w-full border border-slate-200 focus:border-indigo-500 bg-white text-slate-900 placeholder-slate-400 p-3 rounded-xl transition text-xs outline-none resize-none leading-relaxed shadow-xs"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                required
              />
              <textarea
                placeholder="Full feature blueprint breakdowns and core technical logistics..."
                rows={3}
                className="w-full border border-slate-200 focus:border-indigo-500 bg-white text-slate-900 placeholder-slate-400 p-3 rounded-xl transition text-xs outline-none leading-relaxed shadow-xs"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            {/* INTERACTIVE PRICE ROW VARIANT MANAGERS */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Dynamic Pricing Matrices</label>
                <button
                  type="button"
                  onClick={addPlan}
                  className="text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/60 px-3 py-1 rounded-lg transition"
                >
                  + Add Price Node
                </button>
              </div>

              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1 subtle-scrollbar">
                {plans.map((plan, index) => (
                  <div key={index} className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 relative shadow-xs">
                    <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                      <input
                        placeholder="Variant Name"
                        className="border border-slate-200 focus:border-indigo-500 bg-white p-2.5 rounded-lg text-xs outline-none text-slate-900 font-semibold"
                        value={plan.name}
                        onChange={(e) => handlePlanChange(index, "name", e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Price ৳"
                        className="border border-slate-200 focus:border-indigo-500 bg-white p-2.5 rounded-lg text-xs outline-none text-slate-900 font-mono font-bold text-right"
                        value={plan.price}
                        onChange={(e) => handlePlanChange(index, "price", e.target.value)}
                        required
                      />
                    </div>

                    <input
                      placeholder="Tag (e.g., Best Strategic Fit)"
                      className="w-full border border-slate-200 focus:border-indigo-500 bg-white p-2.5 rounded-lg text-xs outline-none text-slate-700 mb-2.5 font-medium"
                      value={plan.tag}
                      onChange={(e) => handlePlanChange(index, "tag", e.target.value)}
                    />

                    <textarea
                      placeholder="Features separated by commas..."
                      rows={1}
                      className="w-full border border-slate-200 focus:border-indigo-500 bg-white p-2.5 rounded-lg text-xs outline-none text-slate-500 mb-2.5 resize-none"
                      value={plan.features}
                      onChange={(e) => handlePlanChange(index, "features", e.target.value)}
                    />

                    <div className="flex items-center justify-between mt-1">
                      <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-indigo-600 focus:ring-0 focus:ring-offset-0 h-4 w-4 transition checked:bg-indigo-600"
                          checked={plan.popular}
                          onChange={(e) => handlePlanChange(index, "popular", e.target.checked)}
                        />
                        Highlight Variant Flag
                      </label>

                      {plans.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePlan(index)}
                          className="text-[10px] text-rose-600 hover:text-rose-700 font-bold bg-rose-50 hover:bg-rose-100/60 border border-rose-200 px-2 py-0.5 rounded-md transition"
                        >
                          Drop
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {msg.text && (
              <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 border ${
                msg.type === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"
              }`}>
                <p className="flex-1">{msg.text}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition shadow-xs active:scale-[0.99] ${
                editingId 
                  ? "bg-cyan-600 text-white hover:bg-cyan-500" 
                  : "bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400"
              }`}
            >
              {isLoading ? "Synchronizing Layer Changes..." : editingId ? "Save Framework Changes" : "Commit New Architecture"}
            </button>
          </form>
        </section>

        {/* RIGHT COLUMN: CORE ACTIVE SERVICES STORAGE REPOSITORY */}
        <section className="xl:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Service Configurations</h2>
            <span className="text-[10px] font-semibold text-slate-400">Click row titles to inspect tier variants</span>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-24 text-slate-400 text-xs font-medium tracking-wide">
              No live service parameters located in this structural slice.
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {services.map((service) => {
                const totalTiers = service.plans?.length || 0;
                const prices = service.plans?.map(p => p.price).filter(Boolean) || [];
                const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
                const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
                const isExpanded = expandedService === service._id;

                return (
                  <div key={service._id} className={`transition duration-150 ${isExpanded ? "bg-slate-50/30" : "hover:bg-slate-50/50"}`}>
                    
                    {/* EXPAND TRIGGER INTERFACE HEADER */}
                    <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
                      
                      <div 
                        onClick={() => setExpandedService(isExpanded ? null : service._id)}
                        className="flex items-center gap-4 flex-1 cursor-pointer select-none"
                      >
                        {service.banner && (
                          <img 
                            src={service.banner} 
                            alt="" 
                            className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-200 shrink-0 hidden sm:block shadow-xs" 
                          />
                        )}
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
                              {service.title}
                            </h3>
                            <span className="font-mono text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                              /{service.slug}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 max-w-lg leading-relaxed">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* STATISTICAL RANGE METRICS BLOCK */}
                      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-0 pt-3 md:pt-0 border-slate-100 shrink-0">
                        <div 
                          onClick={() => setExpandedService(isExpanded ? null : service._id)}
                          className="md:text-right cursor-pointer select-none"
                        >
                          <span className="text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider mb-0.5">Threshold Target</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono tracking-tight">
                            {minPrice === maxPrice 
                              ? `৳${minPrice.toLocaleString('en-IN')}` 
                              : `৳${minPrice.toLocaleString('en-IN')} - ৳${maxPrice.toLocaleString('en-IN')}`
                            }
                          </span>
                        </div>
                        
                        {/* INLINE ROW MANAGEMENT CRUDS */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-1.5 rounded-lg transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteService(service._id)}
                            className="text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 px-3 py-1.5 rounded-lg transition"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setExpandedService(isExpanded ? null : service._id)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 transition hidden sm:inline-block"
                          >
                            <span className={`inline-block transition duration-200 ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* EXTENDED CARDS MATRIX TIERS DETAIL PANEL */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-3 border-t border-dashed border-slate-200 bg-slate-50/20">
                        <div className="mb-4">
                          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            Available Variants Structure
                          </h4>
                        </div>

                        {totalTiers === 0 ? (
                          <p className="text-xs text-slate-400 italic">No configuration levels assigned to this frame node.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.plans.map((plan, i) => (
                              <div 
                                key={i} 
                                className={`border rounded-xl p-4 flex flex-col justify-between transition relative bg-white ${
                                  plan.popular 
                                    ? "border-amber-400 shadow-md shadow-amber-500/5 ring-1 ring-amber-400/20" 
                                    : "border-slate-200 shadow-xs"
                                }`}
                              >
                                {plan.popular && (
                                  <span className="absolute -top-2 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[8px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                                    Popular
                                  </span>
                                )}

                                <div>
                                  <h5 className="font-bold text-xs text-slate-900 tracking-tight truncate">
                                    {plan.name}
                                  </h5>

                                  {plan.tag && (
                                    <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded mt-1 mb-3 ${
                                      plan.popular ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
                                    }`}>
                                      {plan.tag}
                                    </span>
                                  )}

                                  {plan.features && plan.features.length > 0 && (
                                    <ul className="space-y-1.5 border-t border-slate-100 pt-3 mt-1">
                                      {plan.features.map((feat, idx) => (
                                        <li key={idx} className="text-[11px] text-slate-600 flex items-start gap-2">
                                          <span className={`font-bold shrink-0 ${plan.popular ? 'text-amber-500' : 'text-indigo-500'}`}>✓</span>
                                          <span className="line-clamp-1">{feat}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>

                                <div className="mt-5 pt-2 border-t border-slate-100 flex items-baseline justify-end gap-1">
                                  <span className="text-[10px] font-bold text-slate-400">৳</span>
                                  <span className="text-base font-bold text-slate-900 font-mono tracking-tight">
                                    {plan.price?.toLocaleString('en-IN') || plan.price}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}