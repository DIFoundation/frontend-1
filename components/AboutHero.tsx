"use client";

import { Users, Globe, Lock } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-100 opacity-50"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 mb-8">
            <Globe className="mr-2 h-4 w-4" />
            Empowering Decentralized Communities
          </div>

          {/* Main headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            About PollVerse
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600 leading-8">
            We're building the future of decentralized governance, making it simple for communities to organize, 
            make decisions, and manage resources together on the blockchain.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">100+</div>
              <div className="mt-2 text-sm font-medium text-gray-500">Active Communities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">50K+</div>
              <div className="mt-2 text-sm font-medium text-gray-500">Governance Proposals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">$10M+</div>
              <div className="mt-2 text-sm font-medium text-gray-500">In Managed Assets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
