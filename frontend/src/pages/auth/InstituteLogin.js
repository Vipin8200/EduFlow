import React, { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function EduConnectLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // validation
  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validatePassword = (value) =>
    value.length >= 6;

  // toast
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 3000);
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456";
    const teacherEmail = "teacher@gmail.com";
    const teacherPassword = "123456";

    if (!validateEmail(email)) {
      showToast("Please enter valid email", "error");
      return;
    }

    if (!validatePassword(password)) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    if (email === adminEmail && password === adminPassword) {
      setLoading(true);
      showToast("Login successful");
      localStorage.setItem("userRole", "admin");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } else if (email === teacherEmail && password === teacherPassword) {
      setLoading(true);
      showToast("Teacher login successful");
      localStorage.setItem("userRole", "teacher");

      setTimeout(() => {
        window.location.href = "/teacher-dashboard";
      }, 1500);
    } else {
      showToast("Invalid credentials", "error");
    }
  };

  return (

    <div className="min-h-screen flex flex-col lg:flex-row font-inter">

      {/* TOAST */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50">

          <div
            className={`
            backdrop-blur-xl border shadow-lg
            px-4 py-3 rounded-xl flex items-center gap-2 text-sm

            ${toast.type === "success"
                ? "bg-green-500/20 border-green-400/40 text-green-800"
                : "bg-red-500/20 border-red-400/40 text-red-800"
              }
            `}
          >
            <CheckCircle2 size={18} />
            {toast.message}
          </div>

        </div>
      )}

      {/* LEFT PANEL */}
      <div className="
        w-full
        lg:w-1/2
        bg-black
        text-white
        flex flex-col
        justify-center
        px-6
        py-10
        lg:px-16
        lg:py-0
      ">

        {/* Logo */}
        <div className="
          flex items-center gap-3
          mb-8
          lg:absolute lg:top-8 lg:left-10
        ">

          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <GraduationCap size={20} className="text-black" />
          </div>

          <span className="text-lg font-semibold">
            EduConnect
          </span>

        </div>

        {/* Hero */}
        <div className="max-w-md">

          <h1 className="
            text-3xl
            lg:text-[48px]
            lg:leading-[56px]
            font-bold
            mb-4
          ">
            Your school,<br /> in your pocket.
          </h1>

          <p className="
            text-gray-400
            text-sm
            lg:text-[16px]
            leading-relaxed
          ">
            Sign in to access your personalized dashboard,
            track academic progress, and stay connected
            with your educational community effortlessly.
          </p>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="
        w-full
        lg:w-1/2
        bg-[#f5f5f5]
        flex items-center justify-center
        px-6 py-10
      ">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-transparent"
        >

          {/* Header */}
          <h2 className="text-2xl lg:text-[28px] font-semibold mb-2">
            Welcome back
          </h2>

          <p className="text-gray-500 text-sm lg:text-[15px] mb-6">
            Please enter your details to sign in.
          </p>

          {/* Email */}
          <label className="text-xs lg:text-[13px] text-gray-500 font-medium">
            Email or Phone
          </label>

          <div className="
            mt-2 mb-5 flex items-center
            border border-[#c29543]
            bg-[#faf7f2]
            rounded-xl px-4 py-3
          ">

            <Mail size={18} className="text-[#c29543] mr-3" />

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="bg-transparent outline-none w-full text-sm lg:text-[15px]"
            />

          </div>

          {/* Password */}
          <label className="text-xs lg:text-[13px] text-gray-500 font-medium">
            Password
          </label>

          <div className="
            mt-2 mb-5 flex items-center
            border border-gray-300
            bg-white
            rounded-xl px-4 py-3
          ">

            <Lock size={18} className="text-gray-400 mr-3" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              className="bg-transparent outline-none w-full text-sm lg:text-[15px]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>

          </div>

          {/* Options */}
          <div className="flex justify-between items-center mb-6 text-sm">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-[#c29543] font-medium"
            >
              Forgot Password?
            </button>

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-3 rounded-xl
              flex items-center justify-center gap-2
              text-sm font-medium text-white transition

              ${loading
                ? "bg-black/70 cursor-not-allowed"
                : "bg-black hover:opacity-90"
              }
            `}
          >

            {loading ? (
              <>
                <div className="
                  w-4 h-4 border-2 border-white
                  border-t-transparent rounded-full animate-spin
                "/>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}

          </button>

        </form>

      </div>

    </div>
  );
}