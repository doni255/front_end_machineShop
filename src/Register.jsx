import React, { useRef, useState } from "react";
import "./index.css";
import "./Login.css";

import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");
  };

  const namaRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const no_telponRef = useRef();
  const kotaRef = useRef();
  const alamatRef = useRef();

  // Register

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_telpon: "",
    kota: "",
    alamat: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fields that should not be empty
    const requiredFields = [
      { field: "nama", message: "Nama must be filled" },
      { field: "password", message: "Password must be filled" },
      { field: "no_telpon", message: "Nomor HP must be filled" },
      { field: "kota", message: "Kota must be filled" },
      { field: "alamat", message: "Alamat must be filled" },
    ];

    // Check if any required field is empty
    for (let { field, message } of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(message);
        return;
      }
    }

    // Check if assword is less than 6 characters
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (formData.no_telpon.length < 10) {
      toast.error("Nomor HP must be at least 10 characters long");
      return;
    }

    if (formData.alamat.length < 8) {
      toast.error("Alamat must be at least 8 characters long");
      return;
    }
    try {
      const response = await fetch(
        "https://backendtokomesin.grhapengharapan.org/api/store_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Redirect if it success
      const result = await response.json();
      console.log("Result:", result);
      setIsRegisterModalOpen(false);
      // Redirect to login page with success state
      navigate("/e-commerce/products", {
        state: { registrationSuccess: true },
      });
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center p-12">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="shadow-2xl bg-white rounded-md">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="m l lg:max-w-3xl">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-6 gap-6 max-w-md mx-auto"
            >
              <div className="col-span-6 flex justify-center">
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Create Account 😁
                </h1>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama
                </label>

                <input
                  ref={namaRef}
                  type="text"
                  id="Nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  ref={emailRef}
                  type="email"
                  id="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="..Email Boleh Kosong"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  ref={passwordRef}
                  type="password"
                  id="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="noHp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nomor HP
                </label>

                <input
                  ref={no_telponRef}
                  type="text"
                  id="No_telpon"
                  name="no_telpon"
                  value={formData.no_telpon}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Kota"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kota
                </label>

                <input
                  ref={kotaRef}
                  type="text"
                  id="Kota"
                  name="kota"
                  value={formData.kota}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Alamat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alamat
                </label>

                <input
                  ref={alamatRef}
                  type="text"
                  id="Alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a
                    href="#"
                    className="text-gray-400 underline font-semibold hover:text-indigo-600"
                    onClick={handleLoginClick}
                  >
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
