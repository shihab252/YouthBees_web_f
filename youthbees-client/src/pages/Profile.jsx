import { useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import API_BASE_URL from "../config/api";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState(storedUser || {});
  const [message, setMessage] = useState("");

  const role = storedUser?.role;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, field) => {
    setForm({
      ...form,
      [field]: e.target.value.split(",").map((i) => i.trim()),
    });
  };

  const handleSave = async () => {
    try {
      const token = await auth.currentUser.getIdToken();

      const res = await axios.put(
        `${API_BASE_URL}/user/update-profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Profile updated successfully");

    } catch (err) {
      setMessage("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="space-y-5 border p-6 rounded-xl">

        {/* EMAIL */}
        <div>
          <label className="text-sm font-bold text-gray-600">Email</label>
          <input
            value={form.email || ""}
            disabled
            className="w-full p-3 border rounded bg-gray-100"
          />
        </div>

        {/* ================= COMMON ================= */}
        {(role === "student" || role === "teacher") && (
          <>
            <div>
              <label className="text-sm font-bold text-gray-600">First Name</label>
              <input
                name="firstName"
                value={form.firstName || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Last Name</label>
              <input
                name="lastName"
                value={form.lastName || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Phone Number</label>
              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>
          </>
        )}

        {/* ================= STUDENT ================= */}
        {role === "student" && (
          <div>
            <label className="text-sm font-bold text-gray-600">Education Level</label>
            <input
              name="educationLevel"
              value={form.educationLevel || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </div>
        )}

        {/* ================= TEACHER ================= */}
        {role === "teacher" && (
          <>
            <div>
              <label className="text-sm font-bold text-gray-600">Institution Name</label>
              <input
                name="institutionName"
                value={form.institutionName || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Subjects</label>
              <input
                placeholder="Math, Physics"
                onChange={(e) => handleArrayChange(e, "subjects")}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Skills</label>
              <input
                placeholder="Teaching, Public Speaking"
                onChange={(e) => handleArrayChange(e, "skills")}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Interests</label>
              <input
                placeholder="AI, Cybersecurity"
                onChange={(e) => handleArrayChange(e, "interests")}
                className="w-full p-3 border rounded"
              />
            </div>
          </>
        )}

        {/* ================= PARTNER ================= */}
        {role === "partner" && (
          <>
            <div>
              <label className="text-sm font-bold text-gray-600">Business Name</label>
              <input
                name="businessName"
                value={form.businessName || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Phone</label>
              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Address</label>
              <input
                name="address"
                value={form.address || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Industry</label>
              <input
                name="industry"
                value={form.industry || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>
          </>
        )}

        {/* ================= AFFILIATE ================= */}
        {role === "affiliate" && (
          <>
            <div>
              <label className="text-sm font-bold text-gray-600">Full Name</label>
              <input
                name="fullName"
                value={form.fullName || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Phone</label>
              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">bKash Number</label>
              <input
                name="bkashNumber"
                value={form.bkashNumber || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>
          </>
        )}

        {/* MEMBERSHIP */}
        {role === "student" && form.membership && (
          <div className="p-3 bg-orange-50 rounded">
            <p><strong>Plan:</strong> {form.membership.type}</p>
            <p><strong>Discount:</strong> {form.membership.discount}%</p>
          </div>
        )}

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-3 rounded-xl font-bold"
        >
          Save Changes
        </button>

        {message && (
          <p className="text-center text-green-600 font-bold">{message}</p>
        )}

      </div>
    </div>
  );
}