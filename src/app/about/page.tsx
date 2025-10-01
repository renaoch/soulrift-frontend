'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Users,
  Award,
  Heart,
  Leaf,
  Globe,
  Target,
  CheckCircle,
  Quote,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Linkedin
} from 'lucide-react';

import { NavbarD } from '@/components/Navbar';

// Enhanced intersection observer hook for animations
const useIntersectionObserver = (threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, isVisible] as const;
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');
  const [heroRef, heroVisible] = useIntersectionObserver(0.2);
  const [storyRef, storyVisible] = useIntersectionObserver(0.2);
  const [valuesRef, valuesVisible] = useIntersectionObserver(0.2);
  const [teamRef, teamVisible] = useIntersectionObserver(0.2);
  const [processRef, processVisible] = useIntersectionObserver(0.2);

  // Company stats
  const stats = [
    { value: '2018', label: 'Founded' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '100%', label: 'Organic Cotton' },
    { value: '4.8★', label: 'Customer Rating' },
    { value: '30+', label: 'Countries Shipped' },
    { value: 'Zero', label: 'Waste Policy' }
  ];

  // Core values
  const values = [
    {
      icon: <Leaf className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: 'Sustainability',
      description: 'Every decision we make considers our environmental impact. From organic cotton sourcing to carbon-neutral shipping.',
      details: ['100% Organic Materials', 'Carbon Neutral Shipping', 'Minimal Packaging', 'Recycling Programs']
    },
    {
      icon: <Heart className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: 'Quality',
      description: 'We believe in creating products that last. Each piece undergoes rigorous testing for durability and comfort.',
      details: ['Premium Materials', 'Artisan Craftsmanship', 'Quality Testing', 'Lifetime Support']
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: 'Community',
      description: 'Building relationships with customers, suppliers, and communities. Fair trade practices guide everything we do.',
      details: ['Fair Trade Certified', 'Local Communities', 'Customer First', 'Transparent Process']
    },
    {
      icon: <Globe className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: 'Innovation',
      description: 'Constantly improving our processes, materials, and designs while staying true to timeless aesthetics.',
      details: ['New Technologies', 'Design Research', 'Process Innovation', 'Future Thinking']
    }
  ];

  // Team members
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former fashion industry executive with 15 years of experience in sustainable practices.',
      image: '/thirtplaceholderpic-1.avif',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Design',
      bio: 'Award-winning designer specializing in minimalist aesthetics and functional fashion.',
      image: '/tshirtplaceholderpic-2.avif',
      social: { linkedin: '#', instagram: '#' }
    },
    {
      name: 'Priya Patel',
      role: 'Sustainability Director',
      bio: 'Environmental scientist ensuring every process meets our zero-waste standards.',
      image: '/tshirtplaceholderpic-3.avif',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'James Wilson',
      role: 'Head of Operations',
      bio: 'Supply chain expert optimizing our global network for efficiency and fairness.',
      image: '/tshirtplaceholderpic-4.avif',
      social: { linkedin: '#', instagram: '#' }
    }
  ];

  // Production process
  const process = [
    {
      step: '01',
      title: 'Organic Cotton Sourcing',
      description: 'We partner with certified organic farms that use sustainable farming practices.',
      image: '/thirtplaceholderpic-1.avif'
    },
    {
      step: '02',
      title: 'Ethical Manufacturing',
      description: 'Fair trade certified facilities with excellent working conditions and fair wages.',
      image: '/tshirtplaceholderpic-2.avif'
    },
    {
      step: '03',
      title: 'Quality Testing',
      description: 'Each batch undergoes rigorous testing for durability, comfort, and color fastness.',
      image: '/tshirtplaceholderpic-3.avif'
    },
    {
      step: '04',
      title: 'Sustainable Packaging',
      description: 'Minimal, recyclable packaging made from post-consumer recycled materials.',
      image: '/tshirtplaceholderpic-4.avif'
    }
  ];

  const milestones = [
    { year: '2018', event: 'Company Founded', description: 'Started with a vision to revolutionize basic apparel' },
    { year: '2019', event: 'First Collection', description: 'Launched our signature organic cotton t-shirt line' },
    { year: '2020', event: 'Sustainability Certification', description: 'Achieved B-Corp certification and zero waste status' },
    { year: '2021', event: 'Global Expansion', description: 'Expanded shipping to 30+ countries worldwide' },
    { year: '2022', event: '50K Customers', description: 'Reached milestone of 50,000 happy customers' },
    { year: '2023', event: 'Innovation Award', description: 'Won Sustainable Fashion Innovation Award' },
    { year: '2024', event: 'Community Impact', description: 'Launched community development programs' }
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navigation */}
      <NavbarD />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden">
        <div 
          ref={heroRef}
          className={`px-4 sm:px-6 transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text Content */}
              <div className="space-y-8 lg:space-y-10">
                <div className="space-y-6">
                  <div className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium">
                    About TPremium
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-black leading-tight">
                    Crafting
                    <br />
                    <span className="text-pink-500 relative">
                      Tomorrow's Basics
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-pink-500 to-transparent" />
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-light leading-relaxed">
                    We're not just another clothing brand. We're a movement towards conscious consumption, 
                    sustainable practices, and timeless design that respects both people and planet.
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Link href="#story" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-4 bg-black text-white hover:bg-pink-500 font-medium text-lg transition-all duration-500 hover:shadow-xl active:scale-95 rounded">
                      Our Story
                      <ArrowRight className="w-5 h-5 ml-3 inline" />
                    </button>
                  </Link>
                  <Link href="#team" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white font-medium text-lg transition-all duration-500 active:scale-95 rounded">
                      Meet the Team
                    </button>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="aspect-[4/5] relative overflow-hidden rounded-2xl">
                  <Image
                    src="/tshirtplaceholderpic-4.avif"
                    alt="TPremium About"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-white border border-gray-100 px-6 py-4 shadow-xl rounded-xl">
                  <div className="text-2xl sm:text-3xl font-light text-black">2018</div>
                  <div className="text-sm text-gray-400 font-light">Founded</div>
                </div>
                <div className="absolute -top-8 -right-4 sm:-right-8 bg-pink-500 text-white px-6 py-4 shadow-xl rounded-xl">
                  <div className="text-2xl sm:text-3xl font-light">50K+</div>
                  <div className="text-sm font-light opacity-90">Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl sm:text-4xl font-light text-black group-hover:text-pink-500 transition-colors duration-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-400 font-light uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div 
          ref={storyRef}
          className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${
            storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black">Our Story</h2>
              <p className="text-xl sm:text-2xl text-gray-400 font-light leading-relaxed">
                Born from frustration with fast fashion's impact on our planet
              </p>
            </div>
            
            <div className="prose prose-lg sm:prose-xl max-w-none space-y-6 text-gray-600 leading-relaxed">
              <p>
                In 2018, our founder Sarah Chen was working in the traditional fashion industry when she witnessed firsthand 
                the devastating environmental and social costs of fast fashion. The waste, the working conditions, 
                the constant pressure to produce more, cheaper, faster.
              </p>
              
              <p>
                She asked a simple question: "What if we did the opposite?"
              </p>
              
              <p>
                TPremium was born from that question. Instead of fast, we chose slow. Instead of cheap, we chose valuable. 
                Instead of disposable, we chose durable. We decided to prove that sustainable doesn't mean compromise—it means better.
              </p>
              
              <p>
                Today, we're proud to be a certified B-Corporation, a zero-waste company, and a community of people 
                who believe that the clothes we wear should reflect our values. Every t-shirt tells a story of 
                conscious choices, fair wages, and a commitment to leaving the world better than we found it.
              </p>
            </div>

            <div className="bg-pink-50 p-8 sm:p-12 rounded-2xl">
              <Quote className="w-12 h-12 text-pink-500 mx-auto mb-6" />
              <p className="text-xl sm:text-2xl text-gray-700 font-light italic leading-relaxed mb-6">
                "We don't just make clothes. We make choices that matter."
              </p>
              <p className="text-gray-500 font-light">— Sarah Chen, Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl font-light text-black mb-6">Our Journey</h2>
            <p className="text-xl text-gray-400 font-light">Key milestones in our sustainable fashion revolution</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-pink-200 transform sm:-translate-x-1/2"></div>
            
            <div className="space-y-12 sm:space-y-16">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-pink-500 rounded-full transform -translate-x-1/2 z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                    index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'
                  }`}>
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-pink-500 font-semibold text-lg sm:text-xl mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-medium text-black mb-3">
                        {milestone.event}
                      </h3>
                      <p className="text-gray-600 font-light leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div 
          ref={valuesRef}
          className={`mx-auto max-w-7xl transition-all duration-1000 ${
            valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black mb-6 sm:mb-8">Our Values</h2>
            <p className="text-xl sm:text-2xl text-gray-400 font-light max-w-3xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {values.map((value, index) => (
              <div key={index} className="group p-8 sm:p-10 hover:bg-gray-50 transition-all duration-500 rounded-2xl">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-pink-500 group-hover:scale-110 transition-transform duration-500">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-black group-hover:text-pink-500 transition-colors">
                      {value.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 font-light leading-relaxed text-lg">
                    {value.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {value.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-gray-500 font-light">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="px-4 sm:px-6 py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div 
          ref={teamRef}
          className={`mx-auto max-w-7xl transition-all duration-1000 ${
            teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black mb-6">Meet Our Team</h2>
            <p className="text-xl sm:text-2xl text-gray-400 font-light">
              The passionate people behind TPremium
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6 sm:mb-8">
                  <div className="aspect-square relative overflow-hidden rounded-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Social Links Overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const Icon = platform === 'linkedin' ? Linkedin : 
                                  platform === 'twitter' ? Twitter : Instagram;
                      return (
                        <a
                          key={platform}
                          href={url}
                          className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                          aria-label={`${member.name} ${platform}`}
                        >
                          <Icon className="w-4 h-4 text-gray-600" />
                        </a>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-black group-hover:text-pink-500 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-pink-500 font-medium mt-1">{member.role}</p>
                  </div>
                  <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div 
          ref={processRef}
          className={`mx-auto max-w-7xl transition-all duration-1000 ${
            processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black mb-6">Our Process</h2>
            <p className="text-xl sm:text-2xl text-gray-400 font-light">
              From farm to wardrobe, every step is intentional
            </p>
          </div>
          
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {process.map((step, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/3] relative overflow-hidden rounded-2xl">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Step number overlay */}
                  <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-pink-500 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-light shadow-xl">
                    {step.step}
                  </div>
                </div>
                
                {/* Content */}
                <div className={`space-y-6 sm:space-y-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-black leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
                    {step.description}
                  </p>
                  <Link href={{pathname:"/process"}} className="inline-flex items-center gap-3 text-pink-500 hover:text-pink-600 transition-colors font-medium">
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-pink-500 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light">Join Our Mission</h2>
              <p className="text-xl sm:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
                Every purchase is a vote for the kind of world you want to live in. 
                Choose quality. Choose sustainability. Choose TPremium.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href={{pathname: '/products', query: { category: 'all' }}} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-pink-500 hover:bg-gray-100 font-medium text-lg transition-all duration-500 active:scale-95 rounded">
                  Shop Collection
                  <ArrowRight className="w-5 h-5 ml-3 inline" />
                </button>
              </Link>
             <Link href={{pathname: '/contact', query: { category: 'all' }}} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white hover:bg-white/20 font-medium text-lg transition-all duration-500 active:scale-95 rounded">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-black text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            {/* Contact */}
            <div className="text-center md:text-left space-y-6">
              <div className="flex justify-center md:justify-start">
                <Mail className="w-8 h-8 text-pink-500" />
              </div>
              <div>
                <h3 className="text-xl font-light mb-2">Email Us</h3>
                <p className="text-gray-400">hello@tpremium.com</p>
                <p className="text-gray-400">support@tpremium.com</p>
              </div>
            </div>
            
            {/* Phone */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Phone className="w-8 h-8 text-pink-500" />
              </div>
              <div>
                <h3 className="text-xl font-light mb-2">Call Us</h3>
                <p className="text-gray-400">+91 98765 43210</p>
                <p className="text-gray-400">Mon-Fri: 9AM-6PM IST</p>
              </div>
            </div>
            
            {/* Location */}
            <div className="text-center md:text-right space-y-6">
              <div className="flex justify-center md:justify-end">
                <MapPin className="w-8 h-8 text-pink-500" />
              </div>
              <div>
                <h3 className="text-xl font-light mb-2">Visit Us</h3>
                <p className="text-gray-400">Mumbai, India</p>
                <p className="text-gray-400">Sustainable Fashion Hub</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )}