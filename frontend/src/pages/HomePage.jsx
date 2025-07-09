import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HandHeart,
  User,
  Info,
  Globe2,
  ShieldCheck,
  MessageCircle,
  PhoneCall,
  MapPin,
  Mail,
  Heart,
  Sparkles,
  Target,
  Globe,
  Shield,
  Users,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  CheckCircle,
  Star,
  Lock,
  Award,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';
import { SiX } from 'react-icons/si';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(null);

  // ✅ Login state & role
  const isLoggedIn = Boolean(localStorage.getItem('token'));
const profilePath = role === 'admin' ? '/dashboardAdmin' : '/dashboard';

useEffect(() => {
  const storedRole = localStorage.getItem('role');
  setRole(storedRole);
}, []);


  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing! We'll keep you updated on our impact.");
    setEmail('');
  };

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow fixed w-full z-50">
        <div className="container mx-auto px-10 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <HandHeart className="w-10 h-10 text-green-400" />
            Yedawi
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-green-400 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-green-400 transition-colors">About</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-400 transition-colors">How It Works</a>
              <a href="#contact" className="text-gray-700 hover:text-green-400 transition-colors">Contact</a>
              <a href="/impact" className="text-gray-700 hover:text-green-400 transition-colors">Impact</a>
            </nav>

            {/* Conditional Login/Profile Icon */}
            {isLoggedIn ? (
              <Link
                to={profilePath}
                className="ml-4 bg-green-400 text-white p-2 rounded-full hover:bg-green-500 transition-all transform hover:scale-105 shadow-md flex items-center justify-center"
                aria-label="User Profile"
                title="Profile"
              >
                <User className="w-6 h-6" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="ml-4 bg-green-400 text-white text-sm px-6 py-2 rounded-full hover:bg-green-500 transition-all transform hover:scale-105 shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-4 space-y-3 border-t">
            <a href="/" className="block text-gray-700 py-2">Home</a>
            <a href="#about" className="block text-gray-700 py-2">About</a>
            <a href="#how-it-works" className="block text-gray-700 py-2">How It Works</a>
            <a href="#contact" className="block text-gray-700 py-2">Contact</a>
            <a href="/impact" className="block text-gray-700 py-2">Impact</a>

            {/* Mobile Conditional Profile/Login */}
            {isLoggedIn ? (
              <Link
                to={profilePath}
                className="inline-block mt-2 bg-green-400 text-white px-4 py-2 rounded-full text-sm hover:bg-green-500 transition flex items-center justify-center"
                aria-label="User Profile"
                title="Profile"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block mt-2 bg-green-400 text-white px-4 py-2 rounded-full text-sm hover:bg-green-500 transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-green-400 via-emerald-200 to-green-400 min-h-[75vh] flex items-center text-white overflow-hidden pt-24"
      >
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.05%3E%3Ccircle cx=30 cy=30 r=4/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Trusted by 1000+ families</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Support Lives
                <br />
                <span className="bg-white bg-clip-text text-transparent">
                  With Compassion
                </span>
              </h1>

              <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Yedawi connects generous donors with people in need of vital medications and care. Join our community of changemakers making healthcare accessible to all.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Link
  to="/login?redirect=/donate"
  className="group bg-white text-slate-800 px-8 py-4 rounded-full text-base font-semibold hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
>
  Start Donating
  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
</Link>
                <Link
  to="/login?redirect=/request"
  className="group border-2 border-white text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white hover:text-slate-800 transition-all transform hover:scale-105 flex items-center justify-center"
>
  Need Help
  <Heart className="w-5 h-5 ml-2 group-hover:text-red-500 transition-colors" />
</Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center lg:justify-start gap-6 mt-4 text-white pb-5">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Transparent</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 rounded-3xl border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <HandHeart className="w-24 h-24 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<section id="how-it-works" className="py-16 bg-slate-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">How Yedawi Works</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Yedawi connects donors with real medical needs in a secure and transparent way. Here's how the process flows.
      </p>
    </div>

    <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {/* Step 1 */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-xl">1</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">Request Help</h3>
        <p className="text-gray-600">Beneficiaries sign up and submit a valid medical prescription through the app.</p>
      </div>

      {/* Step 2 */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-xl">2</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">Verification & Approval</h3>
        <p className="text-gray-600">Our team verifies the request. Once approved, a unique pharmacy code is generated for the beneficiary.</p>
      </div>

      {/* Step 3 */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-xl">3</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">Donate</h3>
        <p className="text-gray-600">Donors contribute to the general fund. Donations are assigned to approved cases behind the scenes.</p>
      </div>

      {/* Step 4 */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-xl">4</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">Get Updates</h3>
        <p className="text-gray-600">When a donation is used, the donor receives a notification with details on how their support made a difference.</p>
      </div>
    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-40">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Yedawi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe healthcare is a human right. Yedawi bridges the gap between those in need and those willing to help, creating a community of compassion that transcends borders.
            </p>
          </div>

          {/* Mission / Vision / Impact */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group">
              <div className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 h-full transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To break financial barriers to essential healthcare and create a world where no one suffers due to lack of access to medications.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 h-full transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  A global community powered by compassion where healthcare access is determined by need, not financial capacity.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 h-full transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every donation creates a ripple effect of hope, bringing health and dignity to individuals and families worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {[
              { label: "Lives Supported", value: "1,247", icon: Users, color: "from-blue-400 to-blue-600" },
              { label: "Total Donations", value: "$127K", icon: DollarSign, color: "from-green-400 to-green-600" },
              { label: "Countries Reached", value: "31", icon: Globe, color: "from-purple-400 to-purple-600" },
              { label: "Success Rate", value: "98.7%", icon: TrendingUp, color: "from-orange-400 to-orange-600" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-2xl py-8 px-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="bg-slate-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">What Our Community Says</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Thanks to Yedawi, my daughter received the insulin she desperately needed. This platform gave us hope when we had none."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah M.</p>
                    <p className="text-sm text-gray-500">Mother of 3, Morocco</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Being able to help families in need through Yedawi has been incredibly fulfilling. The transparency is amazing."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Ahmed K.</p>
                    <p className="text-sm text-gray-500">Regular Donor, France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 bg-gradient-to-r from-green-400 to-emerald-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated on Our Impact</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Get monthly updates on the lives we've touched together and upcoming initiatives
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              onClick={handleNewsletterSubmit}
              className="bg-white text-green-500 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-all transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or want to learn more about our mission? Our team is here to help you make a difference.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a 
              href="mailto:support@yedawi.org"
              className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 text-center">Email Us</h4>
              <p className="text-slate-600 text-center group-hover:text-green-600 transition-colors">
                support@yedawi.org
              </p>
            </a>

            <a 
              href="tel:+212770776170"
              className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <PhoneCall className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 text-center">Call Us</h4>
              <p className="text-slate-600 text-center group-hover:text-green-600 transition-colors">
                +212 770 776 170
              </p>
            </a>

            <div className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 text-center">Visit Us</h4>
              <p className="text-slate-600 text-center leading-relaxed">
                Technopark Agadir<br />
                N1 Highway, Agadir 80000<br />
                Morocco
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-25">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HandHeart className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold">Yedawi</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting hearts, saving lives. Making healthcare accessible to everyone, everywhere.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61577993277939" target="_blank" rel="noopener noreferrer" 
                   className="bg-gray-800 p-2 rounded-full hover:bg-green-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/yedawi.app?igsh=YzNoeHd2NHFxaDlr" target="_blank" rel="noopener noreferrer"
                   className="bg-gray-800 p-2 rounded-full hover:bg-green-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                   className="bg-gray-800 p-2 rounded-full hover:bg-green-400 transition-colors" aria-label="X">
                  <SiX className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className="bg-gray-800 p-2 rounded-full hover:bg-green-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#how-it-works" className="hover:text-green-400 transition-colors">How It Works</a></li>
                <li><a href="/impact" className="hover:text-green-400 transition-colors">Our Impact</a></li>
                <li><a href="/donate" className="hover:text-green-400 transition-colors">Donate Now</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help" className="hover:text-green-400 transition-colors">Help Center</a></li>
                <li><a href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
                <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Trust & Security</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">Verified Nonprofit</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Yedawi. All rights reserved. Making healthcare accessible, one donation at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;