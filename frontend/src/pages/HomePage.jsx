import { useState } from 'react';
import {
  HandHeart,
  Info,
  Globe2,
  ShieldCheck,
  MessageCircle, PhoneCall, MapPin,Mail,
  Heart,
  Sparkles,
  Target,
  Globe,
  Shield,
  Users
} from 'lucide-react'; 

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
<section
      id="home"
      className="relative bg-gradient-to-br from-green-400 via-emerald-200 to-green-400 min-h-[70vh] flex items-center text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.05%3E%3Ccircle cx=30 cy=30 r=4/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-4 text-xs font-normal">
              <Info className="w-4 h-4 text-white" />
              <span>Access to Healthcare Matters</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-snug tracking-tight">
              Support Lives
              <br />
              <span className="bg-white bg-clip-text text-transparent">
                With Compassion
              </span>
            </h1>

            <p className="text-base text-white/90 mb-6 max-w-md leading-relaxed font-light mx-auto lg:mx-0">
              Yedawi connects generous donors with people in need of vital medications and care. Be part of the change.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button className="bg-white text-slate-800 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-100 transition shadow-md">
                Start Donating
              </button>
              <button className="border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="w-64 h-64 bg-white/10 rounded-2xl border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <HandHeart className="w-20 h-20 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* About Section */}
      <section id="about" className="py-12 bg-white"> {/* changed from py-16 or py-20 to py-12 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-2 tracking-tight">
              About Yedawi
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed font-normal">
              We believe in healthcare for all. Yedawi bridges the gap between those in need and those willing to help.
            </p>
          </div>

        {/* Mission / Vision / Impact */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="group">
            <div className="bg-slate-50 rounded-xl p-5 hover:bg-white hover:shadow-md transition border border-slate-100 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center mb-3">
                <Info className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Mission</h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-snug font-normal">
                To break financial barriers to essential healthcare and create a world of equal medical access.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-slate-50 rounded-xl p-5 hover:bg-white hover:shadow-md transition border border-slate-100 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center mb-3">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Vision</h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-snug font-normal">
                A global community powered by compassion and mutual care where no one is left without medicine.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-slate-50 rounded-xl p-5 hover:bg-white hover:shadow-md transition border border-slate-100 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Impact</h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-snug font-normal">
                Each donation creates hope, bringing health and strength to individuals and families across regions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Lives Supported", value: "1,000+" },
            { label: "Total Donations", value: "$50K+" },
            { label: "Countries Reached", value: "25+" },
            { label: "Success Rate", value: "98%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/80 backdrop-blur rounded-lg py-6 px-4 shadow-sm hover:shadow-md transition"
            >
              <div className="text-2xl font-semibold text-slate-800 mb-1">{stat.value}</div>
              <p className="text-sm text-slate-600 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
      
      {/* Contact Section */}

<section id="contact" className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-2 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed font-normal">
            Have questions or want to learn more about our mission? Reach out anytime — we’re here to help.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Email Card */}
          <div className="group bg-slate-50 rounded-xl p-5 border border-slate-100 hover:bg-white hover:shadow-md transition cursor-pointer flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">Email</h4>
              <p className="text-xs text-slate-600">support@yedawi.org</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="group bg-slate-50 rounded-xl p-5 border border-slate-100 hover:bg-white hover:shadow-md transition cursor-pointer flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">Phone</h4>
              <p className="text-xs text-slate-600">+1 (555) 123-4567</p>
            </div>
          </div>

          {/* Address Card */}
          <div className="group bg-slate-50 rounded-xl p-5 border border-slate-100 hover:bg-white hover:shadow-md transition cursor-pointer flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">Address</h4>
              <p className="text-xs text-slate-600 leading-snug">
                123 Healthcare Ave<br />
                Medical District, CA 90210
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


      {/* Footer */}
      <footer className="bg-gray-100 text-center py-8 text-sm text-gray-600 font-light">
        © 2025 Yedawi. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
