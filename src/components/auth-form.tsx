"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "../hooks/use-auth";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconEye,
  IconEyeOff,
  IconTruck,
  IconShield,
  IconLock,
  IconMail,
  IconSparkles
} from "@tabler/icons-react";
import Image from "next/image";
import MemoizedHyperspeed from "@/components/MemoizedHyperspeed";
import { Route } from "next";

import type {HyperspeedOptions}  from './Hyperspeed';

export default function AuthForm() {
  const router = useRouter();
  const { login, register, resetPassword, isLoading, error, clearError } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Memoize the effectOptions to prevent re-creation on every render
const hyperspeedOptions: Partial<HyperspeedOptions> = useMemo(() => ({
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5] as [number, number],
  lightStickHeight: [1.3, 1.7] as [number, number],
  movingAwaySpeed: [60, 80] as [number, number],
  movingCloserSpeed: [-120, -160] as [number, number],
  carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
  carLightsRadius: [0.05, 0.14] as [number, number],
  carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.8, 0.8] as [number, number],
  carFloorSeparation: [0, 5] as [number, number],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xFFFFFF,
    brokenLines: 0xFFFFFF,
    leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
    rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
    sticks: 0x03B3C3,
  }
}), []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  // Single form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (showResetPassword) {
      const success = await resetPassword(formData.email);
      if (success) {
        alert('Password reset email sent! Check your inbox.');
        setShowResetPassword(false);
      }
      return;
    }

    let success = false;

    if (isSignUp) {
      success = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      
      if (success) {
        alert('Registration successful! Please check your email to verify your account.');
        setIsSignUp(false);
      }
    } else {
      success = await login(formData.email, formData.password);
      
      if (success) {
        router.push('/dashboard' as Route);
      }
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
    setShowResetPassword(false);
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
    if (error) clearError();
  };

  const handleResetPassword = () => {
    setShowResetPassword(true);
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#191970' }}>
      {/* Left side - Hero Section */}
      <div className="relative hidden lg:flex lg:flex-1 relative overflow-hidden" style={{ backgroundColor: '#0F1419' }}>
        <div id="lights" className="absolute z-10 w-[25vw] h-[50vh]">
          <MemoizedHyperspeed effectOptions={hyperspeedOptions} />
        </div>

        <div className="flex flex-col justify-center items-center p-12 text-center relative z-10">
          <div className="mb-8 flex flex-col items-center">
            <Image className="rounded-full mb-6" src="/logo-no.png" alt="" height={120} width={120}/>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
              Soul Rift
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-md leading-relaxed">
              {showResetPassword
                ? "Reset your spectral key and regain access to the ethereal realm."
                : isSignUp
                ? "Enter the ethereal realm of premium designs. Create your account to unlock exclusive spectral collections."
                : "Return to your spiritual journey. Access your ghostly wardrobe and transcendent style discoveries."
              }
            </p>
          </div>

          {/* Feature highlights with ghostly theme */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center text-white/90 group">
              <IconSparkles className="w-5 h-5 mr-4 group-hover:text-white transition-colors" />
              <span>{isSignUp ? "Ethereal Quality Materials" : "Access Spectral Designs"}</span>
            </div>
            <div className="flex items-center text-white/90 group">
              <IconTruck className="w-5 h-5 mr-4 group-hover:text-white transition-colors" />
              <span>{isSignUp ? "Phantom-Fast Shipping" : "Track Your Soul Journey"}</span>
            </div>
            <div className="flex items-center text-white/90 group">
              <IconShield className="w-5 h-5 mr-4 group-hover:text-white transition-colors" />
              <span>{isSignUp ? "30-Day Spirit Guarantee" : "Protected Realm Shopping"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12" style={{ backgroundColor: '#F8F8FF' }}>
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#191970' }}>
              {showResetPassword 
                ? "Reset Your Key" 
                : isSignUp 
                ? "Join the Rift" 
                : "Enter the Realm"
              }
            </h2>
            <p className="text-gray-600">
              {showResetPassword
                ? "Enter your email to receive a password reset link."
                : isSignUp
                ? "Transcend into our spectral marketplace and discover otherworldly designs."
                : "Welcome back, wanderer. Step through the veil and continue your journey."
              }
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields - only show for signup */}
            {isSignUp && !showResetPassword && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor="firstName" className="text-gray-700">First name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    placeholder="Spirit" 
                    type="text" 
                    required 
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastName" className="text-gray-700">Last name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    placeholder="Walker" 
                    type="text" 
                    required 
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </LabelInputContainer>
              </div>
            )}

            <LabelInputContainer>
              <Label htmlFor="email" className="text-gray-700 flex items-center">
                <IconMail className="w-4 h-4 mr-2" style={{ color: '#191970' }} />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="spirit@soulrift.com"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            {!showResetPassword && (
              <LabelInputContainer>
                <Label htmlFor="password" className="text-gray-700 flex items-center">
                  <IconLock className="w-4 h-4 mr-2" style={{ color: '#191970' }} />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <IconEyeOff className="w-4 h-4" />
                    ) : (
                      <IconEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </LabelInputContainer>
            )}

            {/* Remember Me & Forgot Password - only show for signin */}
            {!isSignUp && !showResetPassword && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#191970] focus:ring-[#191970] focus:ring-2"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-sm font-medium hover:underline transition-colors"
                  style={{ color: '#191970' }}
                >
                  Lost your way?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: '#191970',
                opacity: isLoading ? 0.5 : 1 
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {showResetPassword ? "Sending..." : isSignUp ? "Creating Account..." : "Signing In..."}
                </div>
              ) : (
                showResetPassword ? "Send Reset Email" : isSignUp ? "Create Account" : "Sign In"
              )}
            </button>

            {!showResetPassword && (
              <>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 text-gray-500" style={{ backgroundColor: '#F8F8FF' }}>
                      Or {isSignUp ? 'transcend' : 'enter'} with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="group/btn relative flex h-12 items-center justify-center space-x-2 rounded-lg border-2 border-gray-200 px-4 font-medium text-gray-700 transition-all duration-300 hover:shadow-lg hover:border-[#191970]/30 hover:bg-white"
                    style={{ backgroundColor: '#FFFFFF' }}
                    type="button"
                  >
                    <IconBrandGoogle className="h-4 w-4" />
                    <span className="text-sm">Google</span>
                    <SpectralGradient />
                  </button>
                  <button
                    className="group/btn relative flex h-12 items-center justify-center space-x-2 rounded-lg border-2 border-gray-200 px-4 font-medium text-gray-700 transition-all duration-300 hover:shadow-lg hover:border-[#191970]/30 hover:bg-white"
                    style={{ backgroundColor: '#FFFFFF' }}
                    type="button"
                  >
                    <IconBrandGithub className="h-4 w-4" />
                    <span className="text-sm">GitHub</span>
                    <SpectralGradient />
                  </button>
                </div>
              </>
            )}

            <div className="text-center text-sm text-gray-600">
              {showResetPassword ? (
                <>
                  Remember your password?{' '}
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(false)}
                    className="font-medium hover:underline transition-colors"
                    style={{ color: '#191970' }}
                  >
                    Sign in here
                  </button>
                </>
              ) : (
                <>
                  {isSignUp ? "Already part of the realm?" : "New to the spectral plane?"}{' '}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="font-medium hover:underline transition-colors"
                    style={{ color: '#191970' }}
                  >
                    {isSignUp ? "Enter here" : "Begin your transcendence"}
                  </button>
                </>
              )}
            </div>

            {/* Ghost mode - only show for signin */}
            {!isSignUp && !showResetPassword && (
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="w-full h-12 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 font-medium transition-all duration-300 hover:border-[#191970]/50 hover:bg-gray-50/50 hover:text-[#191970] group"
                >
                  <span className="flex items-center justify-center">
                    <IconSparkles className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Browse as Phantom
                  </span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const SpectralGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
