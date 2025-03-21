"use client";

import React, { useState } from 'react';
import { LoginForm } from '@/app/components/AuthForm/Auth';

export default function LandingPage() {

  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
      <div className='App flex h-screen'>
        {/* Left side - reserved for future graphic */}
        <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
          {/* Graphic will be added here later */}
        </div>
        
        {/* Right side - content */}
        <div className="w-full md:w-1/2 flex flex-col">
          <header className="p-6">
            <h1 className="text-3xl font-bold text-gray-300">Trip Planner App</h1>
          </header>
          <main className="flex-1 flex items-center justify-center p-6">
              <LoginForm onLogin={handleLogin} />
          </main>
        </div>
      </div>
    );
  }