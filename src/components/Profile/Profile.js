import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/profileSlice";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { BiLogOut, BiLoaderAlt, BiPencil } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ───────── Avatar ───────── */
const Avatar = ({ name, fallback }) => {
  const trimmed = (name || "").trim();
  const initial = trimmed ? trimmed[0].toUpperCase() : fallback ?? "U";
  return (
    <div className="h-20 w-20 rounded-full bg-red-600 text-white flex items-center justify-center text-3xl font-semibold">
      {initial}
    </div>
  );
};

/* ───────── Profile Component ───────── */
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: client, loading, error } = useSelector((s) => s.profile);
  const { isLoggedIn } = useSelector((s) => s.auth);

  const [editMode, setEditMode] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    identity: "",
    email: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!client && !loading) dispatch(fetchProfile());
  }, [isLoggedIn, client, loading, dispatch, navigate]);

  useEffect(() => {
    if (client) {
      setForm({
        firstname: client.firstname || "",
        lastname: client.lastname || "",
        identity: client.identity || "",
        email: client.email || "",
        address1: client.address1 || "",
        address2: client.address2 || "",
        landmark: client.landmark || "",
        city: client.city || "",
        state: client.state || "",
        zip: client.zip || "",
      });
    }
  }, [client]);

  const fullName =
    `${client?.firstname || ""} ${client?.lastname || ""}`.trim() ||
    client?.mobile ||
    "";

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful!");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!client?.mobile)
      return toast.error("Mobile number missing!");
    if (!token)
      return toast.error("You are not authorized. Please login again.");

    try {
      setUpdateLoading(true);

      const response = await fetch(
        "https://cabzii.in/api/client/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mobile: client.mobile,
            firstname: form.firstname,
            lastname: form.lastname,
            identity: form.identity,
            email: form.email,
            address1: form.address1,
            address2: form.address2,
            landmark: form.landmark,
            city: form.city,
            state: form.state,
            zip: form.zip,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Update failed");

      setEditMode(false);
      dispatch(fetchProfile());
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {loading && (
          <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
            <BiLoaderAlt className="animate-spin" size={24} />
            Loading profile…
          </div>
        )}
        {error && (
          <p className="text-red-600 text-center py-12">
            {typeof error === "string"
              ? error
              : "Failed to load profile."}
          </p>
        )}

        {!loading && !error && client && (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar
                  name={client.firstname}
                  fallback={client.mobile?.slice(-2)}
                />
                <div>
                  <h2 className="text-xl font-semibold">{fullName}</h2>
                  <p className="text-gray-500 text-sm">
                    {client.email || "—"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {client.mobile}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {editMode ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={updateLoading}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                    >
                      {updateLoading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 border rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-1 text-red-600 text-sm"
                  >
                    <BiPencil /> Edit
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-600 text-sm"
                >
                  <BiLogOut /> Logout
                </button>
              </div>
            </div>

            <hr className="my-6" />

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {[
                { label: "First Name", field: "firstname" },
                { label: "Last Name", field: "lastname" },
                {
                  label: "Identity",
                  field: "identity",
                  type: "select",
                  options: ["Male", "Female", "Other"],
                },
                { label: "Email", field: "email" },
                { label: "Mobile", field: "mobile", readonly: true },
              ].map(({ label, field, readonly, type, options }) => (
                <div key={field}>
                  <p className="text-gray-500">{label}</p>
                  {editMode && !readonly ? (
                    type === "select" ? (
                      <select
                        value={form[field]}
                        onChange={handleChange(field)}
                        className="w-full border rounded px-3 py-1.5 mt-1 focus:outline-none focus:ring-1 focus:ring-red-500"
                      >
                        <option value="">Select</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={form[field]}
                        onChange={handleChange(field)}
                        className="w-full border rounded px-3 py-1.5 mt-1 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    )
                  ) : (
                    <p className="mt-1">
                      {readonly
                        ? client?.mobile || "—"
                        : form[field] || "—"}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <hr className="my-6" />

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-800">
                Address
              </h3>
              {[
                { label: "Address 1", field: "address1" },
                { label: "Address 2", field: "address2" },
                { label: "Landmark", field: "landmark" },
                { label: "City", field: "city" },
                { label: "State", field: "state" },
                { label: "ZIP", field: "zip" },
              ].map(({ label, field }) => (
                <div key={field} className="text-sm space-y-1">
                  <label className="text-gray-500 block">{label}</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={form[field]}
                      onChange={handleChange(field)}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  ) : (
                    <p>{form[field] || "—"}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
