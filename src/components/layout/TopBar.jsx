import { useState, useRef, useEffect } from 'react';
import {
  HiMail,
  HiPhone,
  HiShieldCheck,
  HiChevronDown,
  HiLocationMarker,
} from 'react-icons/hi';
import {
  FaFacebookF,
  FaXTwitter,
  FaGoogle,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa6';

const cities = ['Ahmedabad', 'Navsari', 'Surat'];

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaXTwitter, href: '#', label: 'X' },
  { icon: FaGoogle, href: '#', label: 'Google' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
  { icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
];

export default function TopBar() {
  const [selectedCity, setSelectedCity] = useState('Surat');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative hidden md:block">
      {/* Gradient background */}
      <div className="bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs">

            {/* ── Left Section ── */}
            <div className="flex items-center gap-5">
              {/* Email */}
              <a
                href="mailto:info@cdmi.in"
                className="group flex items-center gap-1.5 text-dark-400 hover:text-primary-400 transition-colors duration-300"
              >
                <HiMail className="w-3.5 h-3.5 text-primary-500/70 group-hover:text-primary-400 transition-colors duration-300" />
                <span>info@cdmi.in</span>
              </a>

              {/* Divider */}
              <div className="w-px h-3.5 bg-white/10" />

              {/* Verify Certificate */}
              <a
                href="#"
                className="group flex items-center gap-1.5 text-dark-400 hover:text-accent-400 transition-colors duration-300"
              >
                <HiShieldCheck className="w-3.5 h-3.5 text-accent-500/70 group-hover:text-accent-400 transition-colors duration-300" />
                <span>Verify Certificate</span>
              </a>
            </div>

            {/* ── Center Section ── */}
            <div className="hidden lg:flex items-center gap-1.5 text-dark-400">
              <HiPhone className="w-3.5 h-3.5 text-green-500/80" />
              <span>Have any question?</span>
              <a
                href="tel:+919033316003"
                className="font-semibold text-dark-200 hover:text-primary-400 transition-colors duration-300"
              >
                +91 90333 16003
              </a>
            </div>

            {/* ── Right Section ── */}
            <div className="flex items-center gap-4">
              {/* City Selector */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 text-dark-300 hover:text-white hover:border-primary-500/40 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
                >
                  <HiLocationMarker className="w-3 h-3 text-primary-400" />
                  <span className="font-medium">{selectedCity}</span>
                  <HiChevronDown
                    className={`w-3 h-3 text-dark-500 transition-transform duration-300 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full right-0 mt-1.5 w-36 py-1 rounded-lg bg-dark-900/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 overflow-hidden">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-all duration-200 ${
                          selectedCity === city
                            ? 'text-primary-400 bg-primary-500/10'
                            : 'text-dark-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-3.5 bg-white/10" />

              {/* Social Icons */}
              <div className="flex items-center gap-0.5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center justify-center w-6 h-6 rounded-md text-dark-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
