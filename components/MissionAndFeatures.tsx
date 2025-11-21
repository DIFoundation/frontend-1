"use client";

import { Target, Lock, Users, GitBranch, Zap, Globe } from 'lucide-react';

const features = [
  {
    name: 'Our Mission',
    description: 'To democratize decision-making and resource allocation through decentralized governance, making it accessible to communities of all sizes.',
    icon: Target,
  },
  {
    name: 'Secure by Design',
    description: 'Built on blockchain technology with smart contracts that ensure transparency, security, and immutability of all governance actions.',
    icon: Lock,
  },
  {
    name: 'Community First',
    description: 'Designed with community needs at the forefront, enabling seamless collaboration and collective decision-making.',
    icon: Users,
  },
  {
    name: 'Open Source',
    description: 'Completely open-source, allowing for community contributions, audits, and customization to fit diverse needs.',
    icon: GitBranch,
  },
  {
    name: 'Fast & Scalable',
    description: 'Leveraging cutting-edge blockchain technology for fast, low-cost transactions that scale with your community.',
    icon: Zap,
  },
  {
    name: 'Global Reach',
    description: 'Accessible to anyone, anywhere, removing geographical barriers to participation in governance.',
    icon: Globe,
  },
];

export default function MissionAndFeatures() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Decentralized Governance</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Building the Future of Collective Decision Making
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform empowers communities to organize, govern, and grow together with transparency and efficiency.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
