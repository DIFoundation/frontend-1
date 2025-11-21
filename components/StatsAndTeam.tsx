"use client";

import { Users, GitMerge, Clock, CheckCircle, User, Twitter, Github, Linkedin } from 'lucide-react';

const stats = [
  { id: 1, name: 'Active Communities', value: '100+', icon: Users },
  { id: 2, name: 'Proposals Processed', value: '50K+', icon: GitMerge },
  { id: 3, name: 'Average Resolution Time', value: '24h', icon: Clock },
  { id: 4, name: 'Success Rate', value: '99.9%', icon: CheckCircle },
];

const team = [
  {
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop',
    bio: 'Blockchain expert with 10+ years in decentralized systems and community governance.',
    twitter: '#',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Maria Garcia',
    role: 'Lead Developer',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop',
    bio: 'Full-stack developer specializing in blockchain applications and smart contracts.',
    twitter: '#',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'James Wilson',
    role: 'Community Lead',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
    bio: 'Community builder with a passion for decentralized governance and DAOs.',
    twitter: '#',
    github: '#',
    linkedin: '#',
  },
];

export default function StatsAndTeam() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trusted by communities worldwide</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform powers decentralized governance for organizations of all sizes, from small collectives to large DAOs.
          </p>
        </div>
        
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex items-center gap-x-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="rounded-md bg-blue-600 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold leading-9 tracking-tight text-gray-900">{stat.value}</h3>
                <p className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're a passionate team of blockchain enthusiasts, developers, and community builders working to revolutionize governance.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {team.map((person) => (
            <article key={person.name} className="flex flex-col items-start justify-between bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-x-4 text-xs w-full">
                <img src={person.imageUrl} alt="" className="h-20 w-20 rounded-full bg-gray-50" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-gray-600">{person.role}</p>
                </div>
              </div>
              <div className="group relative mt-4">
                <p className="text-sm leading-6 text-gray-600 line-clamp-3">{person.bio}</p>
              </div>
              <div className="relative mt-4 flex items-center gap-x-4">
                <a href={person.twitter} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href={person.github} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href={person.linkedin} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
