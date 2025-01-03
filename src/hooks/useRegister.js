import { useState, useRef } from "react";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast

export const useRegister = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const navigate = useNavigate();

  const namaRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const no_telponRef = useRef();
  const kotaRef = useRef();
  const alamatRef = useRef();

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

    // Validation logic
    const requiredFields = [
      { field: "nama", message: "Nama must be filled" },
      { field: "password", message: "Password must be filled" },
      { field: "no_telpon", message: "Nomor HP must be filled" },
      { field: "kota", message: "Kota must be filled" },
      { field: "alamat", message: "Alamat must be filled" },
    ];

    for (let { field, message } of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(message);
        return;
      }
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (formData.no_telpon.length < 8) {
      toast.error("Nomor HP must be at least 8 characters long");
      return;
    }

    if (formData.kota.length < 6) {
      toast.error("Kota must be at least 6 characters long");
      return;
    }

    if (formData.alamat.length < 6) {
      toast.error("Alamat must be at least 6 characters long");
      return;
    }

    // Submit logic
    try {
      const response = await fetch("http://localhost:8000/api/store_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 400) {
        if (result.data.nama) {
          // Handle name uniqueness error from backend
          toast.error(result.data.nama[0]); // Display the error message for 'nama'
          return;
        }
      }

      console.log("Result:", result);

      // Close the modal
      setIsRegisterModalOpen(false);
      // Delay for 2 seconds before showing the success toast
      setTimeout(() => {
        toast.success("User registered successfully!"); // Success toast
        navigate("/e-commerce/products"); // Navigate to the products page
      }, 1000); // 2-second delay before showing success
    } catch (error) {
      toast.error("An error occurred during registration.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isRegisterModalOpen,
    setIsRegisterModalOpen,
    openRegisterModal,
    closeRegisterModal,
  };
};
