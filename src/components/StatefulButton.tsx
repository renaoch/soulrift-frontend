"use client";
import React, { useState } from "react";
import {
  IconSparkles,
  IconArrowRight,
  IconCheck,
  IconLoader2,
  IconX,
} from "@tabler/icons-react";

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

interface StatefulButtonProps {
  isSignUp: boolean;
  onSubmit: () => Promise<void>;
  disabled?: boolean;
  showResetPassword?: boolean;
}

const StatefulButton: React.FC<StatefulButtonProps> = ({
  isSignUp,
  onSubmit,
  disabled = false,
  showResetPassword = false
}) => {
  const [buttonState, setButtonState] = useState<ButtonState>('idle');

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission since we'll handle it manually
    
    if (buttonState === 'loading' || disabled) return;

    setButtonState('loading');

    try {
      await onSubmit();
      setButtonState('success');
      setTimeout(() => setButtonState('idle'), 2000);
    } catch (error) {
      setButtonState('error');
      setTimeout(() => setButtonState('idle'), 2000);
    }
  };

  const getButtonContent = () => {
    switch (buttonState) {
      case 'loading':
        return (
          <span className="flex items-center justify-center">
            <IconLoader2 className="w-4 h-4 mr-2 animate-spin" />
            {showResetPassword 
              ? 'Sending...' 
              : isSignUp 
              ? 'Transcending...' 
              : 'Entering...'
            }
          </span>
        );
      case 'success':
        return (
          <span className="flex items-center justify-center">
            <IconCheck className="w-4 h-4 mr-2 animate-pulse" />
            {showResetPassword
              ? 'Email Sent!'
              : isSignUp 
              ? 'Welcome to the Rift!' 
              : 'Welcome Back!'
            }
          </span>
        );
      case 'error':
        return (
          <span className="flex items-center justify-center">
            <IconX className="w-4 h-4 mr-2 animate-pulse" />
            Something went wrong
          </span>
        );
      default:
        return (
          <span className="flex items-center justify-center">
            {showResetPassword ? (
              <>
                <IconSparkles className="w-4 h-4 mr-2" />
                Reset Spectral Key
              </>
            ) : isSignUp ? (
              <>
                <IconSparkles className="w-4 h-4 mr-2" />
                Transcend Now
              </>
            ) : (
              <>
                Enter the Rift
                <IconArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </>
            )}
          </span>
        );
    }
  };

  const getButtonStyle = () => {
    switch (buttonState) {
      case 'loading':
        return {
          backgroundColor: '#4A4A9A',
          boxShadow: '0 5px 15px rgba(25, 25, 112, 0.2)',
          transform: 'scale(0.98)'
        };
      case 'success':
        return {
          backgroundColor: '#EC4899', // Neon pink instead of green
          boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)'
        };
      case 'error':
        return {
          backgroundColor: '#EF4444',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
        };
      default:
        return {
          backgroundColor: '#191970',
          boxShadow: '0 10px 25px rgba(25, 25, 112, 0.3)'
        };
    }
  };

  return (
    <button
      className={`group/btn relative block h-12 w-full rounded-lg font-medium text-white shadow-xl transition-all duration-300 ${
        buttonState === 'idle'
          ? 'hover:shadow-2xl hover:scale-[1.02] hover:brightness-110'
          : ''
      } ${buttonState === 'loading' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      style={getButtonStyle()}
      type="button" // Changed from "submit" to "button" since we handle submission manually
      disabled={buttonState === 'loading' || disabled}
      onClick={handleClick}
    >
      {getButtonContent()}
      {buttonState === 'idle' && <SpectralGradient />}
      {buttonState === 'success' && <SuccessGradient />}
    </button>
  );
};

const SpectralGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const SuccessGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-70 animate-pulse" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-70 blur-sm animate-pulse" />
  </>
);

export default StatefulButton;