'use client';
import { useState } from 'react';
import Link from 'next/link';
import AddressForm from '../components/AddressForm';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [address, setAddress] = useState({
    region: '',
    'address-direction': '',
    phone: '',
    building: '',
    floor: '',
  });

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [submittedAddress, setSubmittedAddress] = useState(null);

  const { register } = useAuth();
  const router = useRouter();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/.test(
      password
    );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Clear specific field errors when changed
    if (e.target.name === 'name') setNameError('');
    if (e.target.name === 'email') setEmailError('');
    if (e.target.name === 'password') setPasswordError('');
  };

  const updateAddress = (updatedField) => {
    setAddress((prev) => ({ ...prev, ...updatedField }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Name validation
    if (!form.name.trim()) {
      setNameError('Full name is required.');
      return;
    }

    // Email validation
    if (!form.email.trim()) {
      setEmailError('Email is required.');
      return;
    }
    if (!validateEmail(form.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Password validation
    if (!form.password) {
      setPasswordError('Password is required.');
      return;
    }
    if (!validatePassword(form.password)) {
      setPasswordError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    // === Manual Address validation ===
    if (
      !address.region.trim() ||
      !address['address-direction'].trim() ||
      !address.phone.trim() ||
      !address.building.trim() ||
      !address.floor.trim()
    ) {
      toast.error('Please complete all address fields.');
      return;
    }

    try {
      await register({ ...form, address });
      setSubmittedAddress(address);
      // router.push('/login'); // Uncomment if you want to redirect immediately
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#1b1b1b] py-12 px-4">
      <div className="absolute inset-0 z-0">
        <img
          src="/landingimage.png"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <form
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-lg bg-[#34434F]/10 backdrop-blur-md p-10 rounded-xl shadow-2xl text-[#E2C269] space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center">Create Account</h2>
        <p className="text-center text-sm text-white">
          Already have an account?{' '}
          <Link href="/login" className="text-[#E2C269] underline hover:text-yellow-300">
            Login
          </Link>
        </p>

        {/* Full Name */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className={`w-full p-3 rounded bg-transparent border placeholder-[#bbb] text-white ${
            nameError ? 'border-red-600' : 'border-[#E2C269]'
          }`}
        />
        {nameError && <p className="text-red-600 text-sm mt-1">{nameError}</p>}

        {/* Email */}
        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className={`w-full p-3 rounded bg-transparent border placeholder-[#bbb] text-white ${
            emailError ? 'border-red-600' : 'border-[#E2C269]'
          }`}
        />
        {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}

<div className="relative w-full">
  <input
    name="password"
    type={showPassword ? 'text' : 'password'}
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    className={`w-full p-3 pr-10 rounded bg-transparent border placeholder-[#bbb] text-white ${
      passwordError ? 'border-red-400' : 'border-[#E2C269]'
    }`}
  />
  {form.password && (
    <span
      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/80 cursor-pointer"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </span>
  )}
</div>
{passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}

        {/* Address Form (unchanged) */}
        <AddressForm address={address} updateAddress={updateAddress} />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#E2C269] text-[#34434F] font-semibold rounded hover:bg-[#f0da85]"
        >
          Sign Up
        </button>
      </form>

      {/* Display validated address after successful registration */}
      {submittedAddress && (
        <div className="relative z-10 mt-8 bg-[#34434F]/20 p-6 rounded-xl text-white max-w-lg w-full text-sm space-y-2">
          <h3 className="text-xl font-bold text-[#E2C269] mb-2">Submitted Address</h3>
          <p>
            <strong>Region:</strong> {submittedAddress.region}
          </p>
          <p>
            <strong>Address Direction:</strong> {submittedAddress['address-direction']}
          </p>
          <p>
            <strong>Phone:</strong> {submittedAddress.phone}
          </p>
          <p>
            <strong>Building:</strong> {submittedAddress.building}
          </p>
          <p>
            <strong>Floor:</strong> {submittedAddress.floor}
          </p>
        </div>
      )}
    </div>
  );
}
