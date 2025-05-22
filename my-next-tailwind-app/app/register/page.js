'use client';
import { useState } from 'react';
import Link from 'next/link';
import AddressForm from '../components/AddressForm';
import { validateAddress } from '../components/validation';
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
  const [emailError, setEmailError] = useState('');
  // Password must be at least 8 characters, include uppercase, lowercase, number, and special character

const [passwordError, setPasswordError] = useState('');


  const { register } = useAuth();
  const router = useRouter();

  // Simple email regex validator
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/.test(password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      // Clear error on email change
      setEmailError('');
    }
  };

  const updateAddress = (updatedField) => {
    setAddress((prev) => ({ ...prev, ...updatedField }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Email validation
    if (!form.email) {
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

    // Address validation
    const isValid = validateAddress(address);
    if (!isValid) {
      toast.error('Please complete all address fields.');
      return;
    }

    try {
      await register({ ...form, address });
      router.push('/login');
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#1b1b1b]">
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
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-transparent border border-[#E2C269] placeholder-[#bbb] text-white"
        />

        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className={`w-full p-3 rounded bg-transparent border placeholder-[#bbb] text-white ${
            emailError ? 'border-red-600' : 'border-[#E2C269]'
          }`}
        />
        {emailError && (
          <p className="text-red-600 text-sm mt-1">{emailError}</p>
        )}

        {/* Password Field */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={`w-full p-3 rounded bg-transparent border placeholder-[#bbb] text-white ${
            passwordError ? 'border-red-400' : 'border-[#E2C269]'
          }`}
        />
        {passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}

        <AddressForm address={address} updateAddress={updateAddress} />

        <button
          type="submit"
          className="w-full py-3 bg-[#E2C269] text-[#34434F] font-semibold rounded hover:bg-[#f0da85]"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
