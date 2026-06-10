import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaArrowRight, FaUsers, FaBriefcase, FaGraduationCap, FaCalendarAlt,
  FaFileAlt, FaLinkedin, FaGlobe, FaStar, FaFire, FaQuoteLeft, FaCheckCircle,
  FaAward, FaLaptopCode, FaBullhorn, FaPaintBrush, FaHandshake, FaBullseye,
  FaLightbulb, FaUserTie, FaUserGraduate, FaRocket, FaTerminal, FaExternalLinkAlt,
  FaMapMarkerAlt, FaCircle, FaUserCircle, FaWhatsapp, FaRobot, FaNewspaper,
  FaHeart, FaPlay, FaCalendarCheck, FaSearch, FaChalkboardTeacher, FaArrowLeft
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";


// ✅ ASSET IMPORTS
import teamImg from "../assets/about/team.jpg";
import eventImg from "../assets/about/event.jpg";
import founderImg from "../assets/about/founder.jpg";
import workshopImg from "../assets/about/workshop.jpg";
import pythonImg from "../assets/programs/python-fundamentals.jpg";
import careerGroomingImg from "../assets/programs/career-grooming.jpg";
import cvMasteryImg from "../assets/programs/cv-mastery.jpg";

// ✅ DATA CONSTANTS
const partners = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
  { name: "FiroTech", logo: "https://via.placeholder.com/150x50?text=FiroTech" },
  { name: "E-Paathshala", logo: "https://via.placeholder.com/150x50?text=E-Paathshala" },
];

const feedbacks = [
  { name: "Arif Ahmed", role: "Student, DU", text: "YouthBees changed my career path. The CV revamp is magic!", rating: 5 },
  { name: "Nabila Islam", role: "Marketing Intern", text: "The community support here is unlike anything in Bangladesh.", rating: 5 },
  { name: "Sajid Hasan", role: "Job Seeker", text: "Mock interviews gave me the confidence to ace my BRAC Bank viva.", rating: 4 },
  { name: "Maliha Khan", role: "Freelancer", text: "Professionalism and quality at an affordable price. Highly recommended.", rating: 5 },
  { name: "Tanvir Rizvi", role: "Graduate", text: "Their LinkedIn optimization helped me get noticed by global recruiters.", rating: 5 },
];


const programsData = [
  {
    id: 1,
    title: "AI & Digital Literacy",
    desc: "Build a strong foundation in AI concepts and essential digital tools.",
    longDesc: "This program introduces modern AI concepts and practical digital tools that are essential for today’s job market. You will learn to leverage AI for productivity and professional growth.",
    level: "Beginner",
    duration: "4 Weeks",
    source: "training",
    thumbnail: pythonImg,
  },
  {
    id: 2,
    title: "Cybersecurity Fundamentals",
    desc: "Learn cyber hygiene, threats, and security basics.",
    longDesc: "A deep dive into protecting digital assets and understanding modern security protocols. Essential for anyone looking to enter the IT security space.",
    level: "Intermediate",
    duration: "6 Weeks",
    source: "training",
    thumbnail: workshopImg,
  },
  {
    id: 3,
    title: "Google Data Analytics",
    desc: "Professional certificate by Google to prepare for a data career.",
    longDesc: "Prepare for a new career in the high-growth field of data analytics. Gain professional skills in data cleaning, visualization, and R programming.",
    level: "All Levels",
    duration: "6 Months",
    source: "partner",
    thumbnail: careerGroomingImg,
  }
];

export default function Home() {
  const [services, setServices] =
  useState([]);
  const { scrollYProgress } = useScroll();
  const textParallax = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  // Hub States
  const [hubMode, setHubMode] = useState("list");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [courseType, setCourseType] = useState("training");

  const filteredPrograms = programsData.filter((p) => p.source === courseType);

  useEffect(() => {
  const fetchServices =
    async () => {
      try {
        const res =
          await axios.get(
            `${API_BASE_URL}/api/service`
          );

        setServices(
          res.data
        );

      } catch (err) {
        console.error(
          err
        );
      }
    };

  fetchServices();
}, []);
const handleViewProgram = (
  program
) => {
  setSelectedProgram(
    program
  );

  setHubMode(
    "details"
  );
};

  return (
    <div className="bg-[#FFF9F5] text-slate-900 selection:bg-orange-300 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-28 pb-16 lg:pt-20 lg:pb-20 px-6 overflow-hidden text-left bg-[#FDF8F4]">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] bg-orange-100/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">

          {/* LEFT CONTENT */}
          <motion.div className="lg:col-span-6 text-left" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Innovation Hub Est. 2021</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-[7.2rem] font-black leading-[0.9] lg:leading-[0.85] tracking-tighter mb-8 text-[#0F172A] uppercase">
              EMPOWER <br />
              <span className="text-[#FF8C1A] italic">GROWTH.</span>
            </h1>

            <p className="text-base lg:text-lg text-slate-500 max-w-lg border-l-[3px] border-[#FF8C1A] pl-6 mb-12 font-medium leading-relaxed">
              Bangladesh's leading career ecosystem. Bridging the gap between academic theory and industry reality.
            </p>

            <div className="flex flex-wrap gap-4 justify-start">
              <button className="px-10 py-5 bg-[#0F172A] text-white font-black rounded-2xl shadow-xl hover:bg-[#FF8C1A] transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest group">
                Get Started <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT CONTENT: Styled Overlapping Image Frames */}
          <div className="lg:col-span-6 relative h-[500px] lg:h-[650px] hidden md:flex items-center justify-center">

            {/* Top Back Image (Team) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-10 right-0 w-[75%] h-[60%] rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] z-10 border-[12px] border-white"
            >
              <img src={teamImg} alt="YouthBees Team" className="w-full h-full object-cover" />
            </motion.div>

            {/* Bottom Front Image (Workshop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -30, y: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-10 left-0 w-[65%] h-[45%] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] z-20 border-[12px] border-white"
            >
              <img src={workshopImg} alt="Workshop" className="w-full h-full object-cover" />
            </motion.div>

            {/* Subtle Gradient Accent */}
            <div className="absolute -bottom-10 right-0 w-32 h-32 bg-[#FF8C1A]/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* 2. VIDEO & WHY CHOOSE SECTION */}
      <section id="video-intro" className="py-24 lg:py-32 px-6 bg-white border-y border-orange-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start text-left">

          {/* Left Side: Video Player */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="relative group rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl aspect-video bg-slate-900 border-4 lg:border-8 border-orange-50 transition-transform hover:scale-[1.02] duration-500">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/t1X65MNpD0U?rel=0"
                title="YouthBees Intro"
                loading="lazy"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-8 p-6 bg-orange-50 rounded-3xl border border-orange-100 hidden lg:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-2">Our Mission</p>
              <p className="text-sm font-bold text-slate-700 italic leading-relaxed">
                "We are building the most practical career ecosystem in Bangladesh, where action speaks louder than theory."
              </p>
            </div>
          </div>

          {/* Right Side: Features/Principles */}
          <div className="lg:col-span-7">
            <span className="text-orange-500 font-black uppercase tracking-widest text-[10px] lg:text-xs mb-4 block">Our DNA</span>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-12 leading-none text-slate-900">
              Why <br /><span className="text-orange-500 italic">YouthBees?</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
              <WhyFeature
                icon={<FaRocket />}
                title="Practical Growth"
                desc="Over theoretical noise. We focus on real skills and actions that work in the real world."
              />
              <WhyFeature
                icon={<FaUsers />}
                title="Inclusive Guidance"
                desc="For every starting point. No matter where you begin, you get clear, supportive guidance."
              />
              <WhyFeature
                icon={<FaHandshake />}
                title="Community Driven"
                desc="Progress through unity. We grow together by sharing knowledge, support, and opportunities."
              />
              <WhyFeature
                icon={<FaLightbulb />}
                title="Future Ready"
                desc="Continuous innovation. We evolve constantly to stay relevant, modern, and future-ready."
              />
              <WhyFeature
                icon={<FaCheckCircle />}
                title="Elite Mentorship"
                desc="Direct access to industry leaders, founders, and CXOs who have walked the path."
              />
              <WhyFeature
                icon={<FaAward />}
                title="Verified Credentials"
                desc="Global standard certifications recognized by our growing network of industry partners."
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. PATHWAY PORTALS */}
      <section className="py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase text-slate-900 leading-none">Pathway <span className="text-orange-500">Portals.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
            <PathwayCard title="Internship Pathway" desc="Real-world industry exposure with FiroTech & Partners." icon={<FaBriefcase />} link="/services/career-launchpad" />
            <PathwayCard title="Uni Associates" desc="Become the face of innovation in your campus." icon={<FaUserGraduate />} link="/uni-associates" color="bg-orange-500 text-white" />
            <PathwayCard title="Volunteer Hub" desc="Shape the community while building soft skills." icon={<FaHeart />} link="/volunteer" />
          </div>
        </div>
      </section>

      {/* 4. SERVICES BENTO - REDESIGNED */}
      <section className="py-24 lg:py-40 px-6 bg-[#FDF8F4] overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Header Area with Reference Styling */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <span className="text-[#FF8C1A] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Ecosystem</span>
              <h2 className="text-6xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.85] text-[#0F172A]">
                Global <br /> <span className="text-[#FF8C1A] italic">Services.</span>
              </h2>
            </motion.div>
            <p className="text-slate-500 max-w-sm border-l-[3px] border-[#FF8C1A] pl-8 font-medium italic text-lg leading-relaxed text-left">
              Tailored professional solutions designed for the next generation of global leaders.
            </p>
          </div>

          {/* Bento Grid with Overlapping Frame Logic */}
          <div className="grid md:grid-cols-4 md:grid-rows-2 gap-6 h-auto lg:h-[700px]">

            {/* CV Revamp - Large Feature Card */}
            {services
              .slice(0, 4)
              .map((service, index) => (
                <BentoCard
                  key={service._id}
                  title={service.title}
                  desc={
                    service.shortDescription
                  }
                  link={`/service/${service.slug}`}
                  className={
                    index === 0
                      ? "md:col-span-2 md:row-span-2 bg-[#0F172A] text-white"
                      : "bg-white text-[#0F172A] border-[8px] border-white shadow-xl"
                  }
                  isPrimary={index === 0}
                />
              ))}
          </div>
          <div className="text-center mt-12">

            <Link
              to="/services"
              className="px-10 py-5 bg-[#FF8C1A] text-white font-black rounded-2xl"
            >
              View All Services
            </Link>

          </div>
        </div>
      </section>

      {/* 5. SWITCHABLE COURSE HUB */}
      <section id="hub" className="py-24 lg:py-40 bg-slate-900 rounded-[3rem] lg:rounded-[5rem] mx-4 text-white shadow-2xl relative overflow-hidden transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {hubMode === "list" ? (
              <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="text-center mb-16">
                  <span className="text-orange-500 font-black uppercase tracking-widest text-[10px] lg:text-xs mb-4 block">Educational Hub</span>
                  <h2 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-10 uppercase italic">Master Skills.</h2>

                  <div className="bg-white/5 p-1.5 rounded-2xl border border-white/10 flex gap-2 w-fit mx-auto mb-20">
                    <button onClick={() => setCourseType("training")} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${courseType === 'training' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Training Programs</button>
                    <button onClick={() => setCourseType("partner")} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${courseType === 'partner' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Partner Programs</button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredPrograms.map((program) => (
                    <motion.div layout whileHover={{ y: -10 }} key={program.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group hover:bg-white/10 transition-all shadow-xl text-left">
                      <div className="relative h-52 overflow-hidden">
                        <img src={program.thumbnail} alt={program.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/10">
                          {courseType === "training" ? "YouthBees Original" : "Global Partner"}
                        </div>
                      </div>
                      <div className="p-8 text-left">
                        <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter text-left">{program.title}</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-2 text-left">{program.desc}</p>
                        <button onClick={() => handleViewProgram(program)} className="w-full py-4 rounded-2xl bg-orange-500 text-white font-black hover:bg-white hover:text-slate-900 transition flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest shadow-lg shadow-orange-500/20">View Details <FaArrowRight /></button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-5xl mx-auto text-left">
                <button onClick={() => setHubMode("list")} className="mb-10 flex items-center gap-2 text-orange-500 font-black uppercase text-xs tracking-widest hover:text-white transition"><FaArrowLeft /> Back to Hub</button>
                <div className="bg-white p-8 lg:p-16 rounded-[4rem] text-slate-900 shadow-2xl relative overflow-hidden text-left border-4 border-orange-500">
                  <div className="absolute top-10 right-10 opacity-5 text-orange-500 rotate-12 hidden lg:block"><FaTerminal size={200} /></div>
                  <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest">Training Program</span>
                  <h1 className="text-4xl md:text-6xl font-black mt-6 mb-8 uppercase tracking-tighter leading-none text-left">{selectedProgram?.title}</h1>
                  <p className="text-slate-600 text-xl leading-relaxed mb-10 font-medium italic border-l-4 border-orange-500 pl-6 text-left">{selectedProgram?.longDesc}</p>
                  <div className="grid md:grid-cols-2 gap-12 mb-12 text-left">
                    <ul className="space-y-4 text-left">
                      <li className="flex items-center gap-3 font-bold text-slate-700 uppercase text-xs tracking-wide"><FaCheckCircle className="text-orange-500" /> Professional Curriculum</li>
                      <li className="flex items-center gap-3 font-bold text-slate-700 uppercase text-xs tracking-wide"><FaAward className="text-orange-500" /> Industry Recognized Certificate</li>
                      <li className="flex items-center gap-3 font-bold text-slate-700 uppercase text-xs tracking-wide"><FaUsers className="text-orange-500" /> Career Growth & Mentorship</li>
                    </ul>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 text-left">Level & Duration</p>
                      <div className="flex items-center gap-4 text-left">
                        <span className="text-2xl font-black text-slate-900 uppercase">{selectedProgram?.level}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                        <span className="text-2xl font-black text-slate-900">{selectedProgram?.duration}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-12 py-6 rounded-2xl bg-slate-900 text-white font-black hover:bg-orange-500 transition-all shadow-xl uppercase text-sm tracking-widest flex items-center justify-center gap-3">Apply Now <FaArrowRight /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. MENTOR VOICES */}
      <section className="py-20 lg:py-32 px-6 max-w-7xl mx-auto text-left">
        <div className="text-left mb-12 lg:mb-20">
          <span className="text-orange-500 font-black uppercase tracking-widest text-[10px] mb-2 block text-left">Insight Hub</span>
          <h2 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-none text-slate-900 text-left">Mentor <br /> <span className="text-orange-500 italic">Visions.</span></h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 text-left">
          <MentorQuote name="Mahib Sadman" role="Founder" text="Innovation is not a skill, it is a lifestyle. We nurture that mindset here." img={founderImg} />
          <MentorQuote name="Sakib Hasan" role="COO" text="Strategic efficiency is the key to corporate survival." img={teamImg} />
        </div>
      </section>
      <section className="py-20 lg:py-32 px-6 bg-white border-y border-orange-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 text-left">
          <div>
            <h3 className="text-3xl lg:text-4xl font-black uppercase mb-8 flex items-center gap-3 text-left"><FaRobot className="text-orange-500" /> AI Tool Box</h3>
            <div className="grid gap-4">
              <ToolCard name="ChatGPT" desc="Content & Strategy" link="https://chat.openai.com" />
              <ToolCard name="Claude AI" desc="Advanced Reasoning" link="https://claude.ai" />
              <ToolCard name="Gamma.app" desc="Presentation & Web" link="https://gamma.app" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl lg:text-4xl font-black uppercase mb-8 flex items-center gap-3 text-left"><FaNewspaper className="text-orange-500" /> Latest Articles</h3>
            <div className="space-y-4 lg:space-y-6">
              <BlogRow title="The Future of Remote Work in BD" date="Jan 12, 2026" />
              <BlogRow title="Top 10 Resume Mistakes to Avoid" date="Jan 08, 2026" />
              <BlogRow title="Why Every Student Needs LinkedIn" date="Jan 05, 2026" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHATSAPP COMMUNITY */}
      <section className="py-16 lg:py-20 px-4 lg:px-6">
        <div className="max-w-5xl mx-auto bg-green-600 rounded-[2.5rem] lg:rounded-[3rem] p-10 lg:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl text-left">
          <div className="text-left">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight uppercase leading-[0.9] lg:leading-none mb-4 text-white text-left text-white">The Hive <br /> Community.</h2>
            <p className="font-bold opacity-80 uppercase text-[10px] lg:text-xs tracking-widest text-white text-left text-white">Join 1k+ students on WhatsApp for daily updates.</p>
          </div>
          <a href="https://chat.whatsapp.com/GucCTrjGlgkESb5UlpaKE9" target="_blank" rel="noreferrer" className="w-full md:w-auto px-10 lg:px-12 py-5 lg:py-6 bg-white text-green-600 font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all shadow-xl text-xs lg:text-sm tracking-widest uppercase">Join WhatsApp <FaWhatsapp size={24} /></a>
        </div>
      </section>

      {/* 8. ANIMATED FEEDBACK MARQUEE */}
      <section className="py-24 lg:py-40 bg-white border-y border-orange-100 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-8 text-left">
          <div className="text-left">
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block text-left text-left">Social Proof</span>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase text-left text-left">User <span className="text-orange-500 italic">Feedback.</span></h2>
          </div>
          <Link to="/feedback" className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-orange-500 transition-all uppercase text-[10px] tracking-widest shadow-xl flex items-center gap-3">Share Experience <FaArrowRight /></Link>
        </div>
        <div className="relative flex overflow-hidden py-10">
          <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 35, repeat: Infinity }}>
            {[...feedbacks, ...feedbacks].map((f, i) => (
              <div key={i} className="inline-block w-[350px] p-10 rounded-[3rem] bg-orange-50/30 border border-orange-100 relative group hover:bg-white hover:shadow-2xl whitespace-normal text-left">
                <FaQuoteLeft className="text-orange-500/20 text-5xl absolute top-8 left-8" />
                <p className="text-slate-600 font-medium italic leading-relaxed mb-10 relative z-10 text-left">{f.text}</p>
                <div className="flex items-center gap-4 mt-auto text-left">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl"><FaUserCircle /></div>
                  <div className="text-left">
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none mb-1 text-left">{f.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">{f.role}</p>
                  </div>
                </div>
                <div className="absolute bottom-10 right-10 flex gap-1">
                  {[...Array(f.rating)].map((_, i) => <FaStar key={i} className="text-orange-500 text-[10px]" />)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. METRICS SECTION */}
      <section className="py-24 lg:py-40 bg-white relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] lg:text-[15rem] font-black text-slate-50/50 -z-10 select-none hidden lg:block uppercase tracking-tighter">Metrics</div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
            <StatBox value={10} suffix="k+" label="Global Community" subLabel="Active Members" icon={<FaUsers />} />
            <StatBox value={40} suffix="+" label="Elite Events" subLabel="Completed Sessions" icon={<FaCalendarCheck />} />
            <StatBox value={15} suffix="+" label="Global Partners" subLabel="Industry Leaders" icon={<FaHandshake />} />
            <StatBox value={1000} suffix="+" label="Successful Talent" subLabel="Job-Ready Graduates" icon={<FaUserGraduate />} />
          </div>
        </div>
      </section>

      {/* 10. PARTNERS INFINITE SLIDER */}
      <section className="py-24 lg:py-32 bg-[#FFF9F5] overflow-hidden border-t border-orange-100 text-left">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-left">
          <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block text-left">Strategic Alliances</span>
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase text-left">Our <span className="text-orange-500 italic">Partners.</span></h2>
        </div>
        <div className="relative flex overflow-hidden py-12 bg-white border-y border-orange-100/50 shadow-sm">
          <motion.div className="flex gap-12 lg:gap-24 items-center whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 25, repeat: Infinity }}>
            {[...partners, ...partners].map((partner, i) => (
              <div key={i} className="flex flex-col items-center group shrink-0">
                <div className="h-16 lg:h-24 w-32 lg:w-48 bg-white rounded-2xl flex items-center justify-center p-4 shadow-sm border border-orange-100 group-hover:border-orange-500 transition-all grayscale group-hover:grayscale-0">
                  <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="mt-4 text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-orange-500 transition-colors">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ================= COMPONENT MODULES ================= */

function Counter({ value, suffix = "" }) {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 40, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => { if (inView) motionValue.set(value); else motionValue.set(0); }, [inView, value, motionValue]);
  useEffect(() => { return springValue.on("change", (latest) => setDisplayValue(Math.floor(latest))); }, [springValue]);
  return <div ref={ref} className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-1 lg:mb-2 leading-none uppercase text-center">{displayValue}{suffix}</div>;
}

function StatBox({ value, suffix, label, subLabel, icon }) {
  return (
    <div className="group p-5 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] bg-orange-50/20 border border-transparent hover:border-orange-200 hover:bg-white hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center">
      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-500 mb-4 lg:mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">{icon}</div>
      <div className="flex flex-col items-center text-center">
        <Counter value={value} suffix={suffix} />
        <p className="text-slate-900 font-black uppercase text-[9px] lg:text-[11px] tracking-widest mb-1 text-center">{label}</p>
        <p className="text-slate-400 font-bold uppercase text-[7px] lg:text-[8px] tracking-[0.2em] text-center">{subLabel}</p>
      </div>
    </div>
  );
}

function WhyFeature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 text-left group">
      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">{icon}</div>
      <div className="text-left">
        <h4 className="font-black text-slate-900 uppercase tracking-tight leading-none mb-1 text-sm lg:text-base text-left">{title}</h4>
        <p className="text-xs lg:text-sm text-slate-500 font-medium leading-relaxed text-left">{desc}</p>
      </div>
    </div>
  );
}

function PathwayCard({ title, desc, icon, link, color = "bg-white text-slate-900" }) {
  return (
    <Link to={link} className={`${color} p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] shadow-xl border border-orange-50 group hover:-translate-y-2 transition-all flex flex-col min-h-[300px] lg:min-h-[350px] text-left`}>
      <div className="text-4xl lg:text-5xl mb-6 text-orange-500 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="mt-auto text-left">
        <h4 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-none mb-4 text-left">{title}</h4>
        <p className="text-xs lg:text-sm font-bold opacity-70 mb-8 text-left">{desc}</p>
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-orange-500 transition-colors"><FaArrowRight /></div>
      </div>
    </Link>
  );
}

function BentoCard({ icon, title, desc, link, className, isPrimary }) {
  return (
    <Link to={link} className={`group relative rounded-[3rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 ${className}`}>
      <div className="p-10 lg:p-12 flex flex-col h-full justify-between z-10 relative">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm transition-transform group-hover:rotate-6 ${isPrimary ? 'bg-[#FF8C1A] text-white' : 'bg-[#FDF8F4] text-[#FF8C1A]'}`}>
          {icon}
        </div>

        <div className="text-left">
          <h4 className={`text-2xl lg:text-3xl font-black uppercase tracking-tighter mb-4 ${isPrimary ? 'text-white' : 'text-[#0F172A]'}`}>
            {title}
          </h4>
          <p className={`text-sm font-bold leading-relaxed mb-8 opacity-70 ${isPrimary ? 'text-slate-300' : 'text-slate-500'}`}>
            {desc}
          </p>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isPrimary ? 'bg-white text-[#0F172A]' : 'bg-[#0F172A] text-white group-hover:bg-[#FF8C1A]'}`}>
            <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
          </div>
        </div>
      </div>

      {/* Visual background element for primary card */}
      {isPrimary && (
        <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-white/5 select-none pointer-events-none italic">
          YB
        </div>
      )}
    </Link>
  );
}

function MentorQuote({ name, role, text, img }) {
  return (
    <div className="bg-white p-8 lg:p-10 rounded-[2rem] lg:rounded-[3.5rem] shadow-2xl border border-orange-50 flex flex-col md:flex-row gap-6 lg:gap-8 items-center text-left">
      <img src={img} className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl lg:rounded-3xl object-cover grayscale" />
      <div className="text-left">
        <FaQuoteLeft className="text-orange-500 text-xl lg:text-2xl mb-4" />
        <p className="text-base lg:text-lg font-bold italic text-slate-700 leading-relaxed mb-4 lg:mb-6 text-left">"{text}"</p>
        <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-900 text-left">{name} — <span className="text-orange-500">{role}</span></p>
      </div>
    </div>
  );
}

function ToolCard({ name, desc, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center p-5 lg:p-6 bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl hover:border-orange-500 transition-all group text-left">
      <div className="text-left">
        <h5 className="font-black text-slate-900 uppercase leading-none mb-1 group-hover:text-orange-600 transition-colors text-sm lg:text-base text-left">{name}</h5>
        <p className="text-[9px] lg:text-[10px] text-slate-400 font-black uppercase tracking-widest text-left">{desc}</p>
      </div>
      <FaExternalLinkAlt className="text-slate-300 group-hover:text-orange-500 transition-colors text-sm lg:text-base" />
    </a>
  );
}

function BlogRow({ title, date }) {
  return (
    <div className="flex justify-between items-center border-b border-orange-50 py-3 lg:py-4 group cursor-pointer hover:border-orange-500 transition-colors text-left">
      <div className="text-left">
        <h5 className="font-bold text-slate-800 group-hover:text-orange-500 transition-colors text-sm lg:text-base text-left">{title}</h5>
        <span className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">{date}</span>
      </div>
      <FaArrowRight className="text-slate-200 group-hover:text-orange-500 transition-colors text-sm lg:text-base" />
    </div>
  );
}