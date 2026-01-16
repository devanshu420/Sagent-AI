import { useState , useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password);
    setError("");

    axios
      .post(
        "/api/auth/register",
        { username, email, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Register success:", res.data.data);
        localStorage.setItem("token", res.data.data.token);
        setUser({
          id: res.data.data.id,
          username: res.data.data.username,
          email: res.data.data.email,
        }); 
        navigate("/");
      })
     .catch((err) => {
  const apiError = err.response?.data || {};

  if (apiError.errors?.length > 0) {
    setError(apiError.errors[0]?.message || "Something went wrong");
  } else {
    setError(apiError.message || "Something went wrong");
  }
});

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg shadow-blue-600/30"
          >
            AI
          </motion.div>
          <h2 className="text-3xl font-bold text-zinc-100 tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Join us and start your journey today
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition sm:text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="group w-full flex justify-center items-center py-3 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 active:scale-[0.98]"
          >
            Create account
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:text-blue-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
