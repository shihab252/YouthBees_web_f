import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCheckCircle, FaRocket, FaCrown, FaUserGraduate, 
  FaBriefcase, FaArrowRight, FaLayerGroup 
} from "react-icons/fa";
import API_BASE_URL from "../config/api";

const getPlanIcon = (tagName = "", planName = "") => {
  const checkString = `${tagName} ${planName}`.toLowerCase();
  if (checkString.includes("student") || checkString.includes("entry")) return FaUserGraduate;
  if (checkString.includes("premium") || checkString.includes("executive") || checkString.includes("crown")) return FaCrown;
  if (checkString.includes("standard") || checkString.includes("growth") || checkString.includes("rocket")) return FaRocket;
  return FaBriefcase;
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/service`);
        setServices(res.data);
        if (res.data && res.data.length > 0) {
          setActiveService(res.data[0]);
        }
      } catch (err) {
        console.error("Error retrieving catalog:", err);
      }
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  const handlePurchase = (serviceTitle, planName, price) => {
    alert(`Initializing order sequence for ${serviceTitle} [${planName}] - ৳${price.toLocaleString("en-IN")}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF9F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">Loading Premium Catalog</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-32 pb-20 px-4 md:px-6 selection:bg-orange-300 overflow-x-hidden text-slate-800 antialiased font-sans">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER & SERVICE SWITCHER ================= */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-16 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="text-left shrink-0">
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Flexible Ecosystem
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-4">
              Our Professional <span className="text-orange-500 italic">Plans.</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-md">Choose the level of premium craftsmanship your career deserves.</p>
          </motion.div>

          {/* HORIZONTAL SERVICE PICKER LINK PILL BOX */}
          <div className="w-full xl:w-auto max-w-full bg-white p-2 rounded-3xl border border-orange-100 shadow-md flex items-center gap-1 overflow-x-auto scrollbar-none snap-x unique-horizontal-scroll">
            {services.map((item) => {
              const isSelected = activeService?._id === item._id;
              return (
                <button
                  key={item._id}
                  onClick={() => setActiveService(item)}
                  className={`px-6 py-3.5 rounded-2xl text-[11px] font-black tracking-wider transition-all uppercase whitespace-nowrap snap-center shrink-0 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-orange-50/50"
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= SERVICE SUBHEADER DETAILS ================= */}
        {activeService && (
          <div className="mb-12 pb-6 border-b border-orange-100">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">
                {activeService.title} Available Tiers
              </h2>
              <span className="font-mono text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">
                /{activeService.slug}
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xl">{activeService.shortDescription}</p>
          </div>
        )}

        {/* ================= INTERACTIVE PRICING GRID ================= */}
        {activeService && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start"
          >
            <AnimatePresence mode="popLayout">
              {activeService.plans?.map((p, i) => {
                const PlanIcon = getPlanIcon(p.tag, p.name);
                
                return (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -12 }}
                    className={`
                      relative group rounded-[3rem] border flex flex-col min-h-[480px] h-full transition-all duration-500 overflow-hidden
                      ${p.popular 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xl shadow-orange-500/10 z-10' 
                        : 'bg-white text-slate-900 border-orange-100 shadow-xl shadow-orange-900/5 hover:border-orange-300'}
                    `}
                  >
                    {/* FIXED STATIC CARD IMAGE HEADER */}
                    {activeService.banner && (
                      <div className="overflow-hidden relative h-40 shrink-0">
                        <img 
                          src={activeService.banner} 
                          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${p.popular ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                          alt={p.name} 
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${p.popular ? 'from-slate-900' : 'from-white'} via-transparent to-transparent`} />
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-grow justify-between">
                      <div>
                        {/* ICON BLOCK */}
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 shadow-xs transition-transform group-hover:rotate-12 ${p.popular ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'}`}>
                          <PlanIcon size={18} />
                        </div>

                        <span className={`text-[9px] font-black uppercase tracking-widest mb-1.5 block ${p.popular ? 'text-orange-400' : 'text-slate-400'}`}>
                          {p.tag || "Standard Asset"}
                        </span>
                        <h3 className="text-xl font-black mb-2 leading-tight uppercase group-hover:text-orange-500 transition-colors">
                          {p.name}
                        </h3>
                        <div className="flex items-baseline gap-1 mb-6">
                           <p className={`text-3xl font-black italic ${p.popular ? 'text-white' : 'text-slate-900'}`}>
                             ৳{p.price?.toLocaleString('en-IN') || p.price}
                           </p>
                        </div>

                        {/* FEATURE ARRAYS */}
                        <ul className="space-y-3 mb-8">
                          {p.features?.map((pt, j) => (
                            <li key={j} className="flex gap-2.5 items-start text-[12px] font-medium leading-snug">
                              <FaCheckCircle className={`mt-0.5 shrink-0 text-xs ${p.popular ? 'text-orange-500' : 'text-orange-400'}`} />
                              <span className={p.popular ? 'text-slate-400' : 'text-slate-500'}>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CALL TO ACTION BUTTON */}
                      <div className="pt-4 shrink-0">
                        <button
                          onClick={() => handlePurchase(activeService.title, p.name, p.price)}
                          className={`
                            w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2
                            ${p.popular 
                              ? 'bg-orange-500 text-white hover:bg-white hover:text-slate-900 shadow-md shadow-orange-500/20' 
                              : 'bg-slate-900 text-white hover:bg-orange-500 shadow-sm'}
                          `}
                        >
                          <span>Select Plan</span> 
                          <FaArrowRight className="text-[11px] -rotate-45 group-hover:rotate-0 transition-transform shrink-0" />
                        </button>
                      </div>
                    </div>

                    {p.popular && (
                      <div className="absolute top-5 right-5 bg-orange-500 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-md">
                        Top Seller
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ================= NARRATIVE DESCRIPTION EXTENSION BREAKDOWN ================= */}
        {activeService?.description && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-16 bg-white border border-orange-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-orange-900/5"
          >
            <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-4 flex items-center gap-2">
              <FaLayerGroup /> Deep-Dive Spec Blueprint
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {activeService.description}
            </p>
          </motion.div>
        )}

        {/* ================= TRANSFORMATIONAL HERO FOOTER BANNER ================= */}
        <div className="mt-28 bg-slate-900 rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute -left-10 -bottom-10 text-[15rem] text-white opacity-5 -rotate-12 pointer-events-none uppercase font-black tracking-tighter select-none">PRO</div>
           <div className="relative z-10 max-w-xl text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">Need a bespoke <br /> <span className="text-orange-500 italic uppercase">Enterprise</span> framework?</h2>
              <p className="text-slate-400 font-bold mb-6 text-xs md:text-sm italic">For C-suite professionals and specialized execution vectors requiring deep customized strategy blueprints.</p>
              <button className="px-8 py-4 bg-orange-500 text-white font-black rounded-2xl hover:bg-white hover:text-slate-900 transition-all uppercase text-[9px] tracking-widest">Contact Corporate Strategist</button>
           </div>
           <div className="relative z-10 grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                 <p className="text-3xl md:text-4xl font-black text-orange-500 mb-0.5">99.4%</p>
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Success Vector</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                 <p className="text-3xl md:text-4xl font-black text-orange-500 mb-0.5">3.1x</p>
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Response Factor</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}