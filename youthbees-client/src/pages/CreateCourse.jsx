import { useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import API_BASE_URL from "../config/api";
import {
  Plus,
  Trash2,
  List,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Users,
  CalendarDays,
  Layout,
  Video,
  ChevronRight,
  Info
} from "lucide-react";

export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    sections: [],
    liveSessions: [],
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  // Section Logic
  const addSection = () => {
    setForm({
      ...form,
      sections: [...form.sections, { title: "", lectures: [] }],
    });
  };

  const removeSection = (index) => {
    setForm({ ...form, sections: form.sections.filter((_, i) => i !== index) });
  };

  const handleSectionChange = (index, value) => {
    const updated = [...form.sections];
    updated[index].title = value;
    setForm({ ...form, sections: updated });
  };

  // Lecture Logic
  const addLecture = (sIndex) => {
    const updated = [...form.sections];
    updated[sIndex].lectures.push({ title: "", videoUrl: "" });
    setForm({ ...form, sections: updated });
  };

  const removeLecture = (sIndex, lIndex) => {
    const updated = [...form.sections];
    updated[sIndex].lectures = updated[sIndex].lectures.filter((_, i) => i !== lIndex);
    setForm({ ...form, sections: updated });
  };

  const handleLectureChange = (sIndex, lIndex, field, value) => {
    const updated = [...form.sections];
    updated[sIndex].lectures[lIndex][field] = value;
    setForm({ ...form, sections: updated });
  };

  // Live Session Logic
  const addLiveSession = () => {
    setForm({
      ...form,
      liveSessions: [...form.liveSessions, { title: "", platform: "", meetingLink: "", meetingDate: "" }],
    });
  };

  const removeLiveSession = (index) => {
    setForm({ ...form, liveSessions: form.liveSessions.filter((_, i) => i !== index) });
  };

  const handleLiveSessionChange = (index, field, value) => {
    const updated = [...form.liveSessions];
    updated[index][field] = value;
    setForm({ ...form, liveSessions: updated });
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "course_uploads");
    const res = await axios.post("https://api.cloudinary.com/v1_1/dxxpuk9ph/image/upload", data);
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const token = await auth.currentUser.getIdToken();
      let imageUrl = "";
      if (image) imageUrl = await uploadImage();

      await axios.post(`${API_BASE_URL}/course/create`, 
        { ...form, banner: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg({ type: "success", text: "Course published successfully!" });
      // Reset form...
    } catch (err) {
      setMsg({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* STICKY TOP BAR */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Layout className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">Course Builder</h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-200 transition-all disabled:bg-slate-300 flex items-center gap-2"
          >
            {loading ? "Publishing..." : "Publish Course"}
            {!loading && <ChevronRight size={18} />}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        
        {/* SECTION 1: BASICS */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <Info className="text-indigo-600 w-5 h-5" />
            <h2 className="font-bold text-slate-800 uppercase tracking-wider text-xs">General Information</h2>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <InputGroup label="Course Title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Advanced Photography Masterclass" />
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="What will students learn in this course?"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputGroup label="Category" name="category" value={form.category} onChange={handleChange} placeholder="Photography" />
              <InputGroup label="Price (৳)" name="price" type="number" value={form.price} onChange={handleChange} placeholder="2000" />
              <InputGroup label="Discount (৳)" name="discountPrice" type="number" value={form.discountPrice} onChange={handleChange} placeholder="1500" />
            </div>
          </div>
        </div>

        {/* SECTION 2: MEDIA */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ImageIcon className="text-indigo-600" /> Course Thumbnail
          </h2>
          <div className="group relative border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-3xl p-4 transition-colors">
            <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center transition-opacity">
                  <p className="text-white font-bold">Click to Replace</p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="text-indigo-600 w-8 h-8" />
                </div>
                <p className="text-slate-600 font-medium">Drag & drop or click to upload</p>
                <p className="text-slate-400 text-sm mt-1">Recommended size: 1280x720 (PNG/JPG)</p>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: CURRICULUM */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <List className="text-indigo-600" /> Curriculum
            </h2>
            <button
              type="button"
              onClick={addSection}
              className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors flex items-center gap-2"
            >
              <Plus size={18} /> Add New Section
            </button>
          </div>

          <div className="space-y-6">
            {form.sections.map((section, sIndex) => (
              <div key={sIndex} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 flex-1 max-w-md">
                    <span className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                      {sIndex + 1}
                    </span>
                    <input
                      value={section.title}
                      onChange={(e) => handleSectionChange(sIndex, e.target.value)}
                      placeholder="e.g. Introduction to React"
                      className="text-lg font-bold text-slate-800 border-b border-transparent focus:border-indigo-500 outline-none w-full pb-1 transition-all"
                    />
                  </div>
                  <button onClick={() => removeSection(sIndex)} className="text-slate-300 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-3 pl-11">
                  {section.lectures.map((lecture, lIndex) => (
                    <div key={lIndex} className="bg-slate-50 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start border border-slate-100">
                      <div className="flex-1 space-y-3 w-full">
                        <input
                          placeholder="Lesson Title"
                          value={lecture.title}
                          onChange={(e) => handleLectureChange(sIndex, lIndex, "title", e.target.value)}
                          className="w-full bg-white px-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <div className="flex items-center gap-2 text-slate-400 bg-white px-4 py-2 border border-slate-200 rounded-xl">
                          <Video size={16} />
                          <input
                            placeholder="Video URL (YouTube/Vimeo)"
                            value={lecture.videoUrl}
                            onChange={(e) => handleLectureChange(sIndex, lIndex, "videoUrl", e.target.value)}
                            className="w-full text-sm outline-none text-slate-600"
                          />
                        </div>
                      </div>
                      <button onClick={() => removeLecture(sIndex, lIndex)} className="p-2 text-slate-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addLecture(sIndex)}
                    className="flex items-center gap-2 text-indigo-600 font-bold text-sm px-4 py-2 hover:bg-indigo-50 rounded-xl transition-colors"
                  >
                    <Plus size={16} /> Add Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: LIVE SESSIONS */}
        <div className="bg-indigo-900 rounded-3xl p-8 text-white">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Users className="text-indigo-300" />
              <h2 className="text-xl font-bold">Live Mentorship Sessions</h2>
            </div>
            <button
              type="button"
              onClick={addLiveSession}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 border border-white/20"
            >
              <Plus size={18} /> Schedule Session
            </button>
          </div>

          <div className="space-y-4">
            {form.liveSessions.map((session, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                <button 
                  onClick={() => removeLiveSession(index)}
                  className="absolute top-4 right-4 text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <input
                      placeholder="Session Goal"
                      onChange={(e) => handleLiveSessionChange(index, "title", e.target.value)}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-400 placeholder:text-white/30"
                    />
                    <select
                      onChange={(e) => handleLiveSessionChange(index, "platform", e.target.value)}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 outline-none text-white/70"
                    >
                      <option value="" className="bg-indigo-900">Select Platform</option>
                      <option value="Zoom" className="bg-indigo-900">Zoom</option>
                      <option value="Google Meet" className="bg-indigo-900">Google Meet</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <input
                      placeholder="Meeting Link"
                      onChange={(e) => handleLiveSessionChange(index, "meetingLink", e.target.value)}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-400 placeholder:text-white/30"
                    />
                    <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-4 py-2">
                      <CalendarDays size={18} className="text-indigo-300" />
                      <input
                        type="datetime-local"
                        className="bg-transparent w-full outline-none text-white/70 text-sm"
                        onChange={(e) => handleLiveSessionChange(index, "meetingDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEEDBACK MESSAGE */}
        {msg.text && (
          <div className={`p-5 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
            msg.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-rose-50 text-rose-800 border border-rose-100"
          }`}>
            {msg.type === "success" ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            <p className="font-bold">{msg.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/** 
 * Reusable input group for consistency 
 */
function InputGroup({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
        required
      />
    </div>
  );
}