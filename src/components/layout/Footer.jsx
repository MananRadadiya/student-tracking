import { Link } from 'react-router-dom';
import {
  HiLocationMarker,
  HiPhone,
  HiChevronRight,
  HiOfficeBuilding,
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
import logo from '../../assets/images/creative-logo.svg';

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook', hoverBg: 'hover:bg-blue-600' },
  { icon: FaXTwitter, href: '#', label: 'X', hoverBg: 'hover:bg-dark-700' },
  { icon: FaGoogle, href: '#', label: 'Google', hoverBg: 'hover:bg-red-600' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', hoverBg: 'hover:bg-blue-700' },
  { icon: FaInstagram, href: '#', label: 'Instagram', hoverBg: 'hover:bg-pink-600' },
  { icon: FaYoutube, href: '#', label: 'YouTube', hoverBg: 'hover:bg-red-600' },
  { icon: FaWhatsapp, href: '#', label: 'WhatsApp', hoverBg: 'hover:bg-green-600' },
];

const featureLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Blogs', path: '/blog' },
  { name: 'Join Us', path: '/contact' },
  { name: 'Terms & Conditions', path: '#' },
  { name: 'Privacy Policy', path: '#' },
  { name: 'Certificate Verification', path: '#' },
];

const branches = [
  'Katargam',
  'Sarthana',
  'Adajan',
  'Dindoli',
  'Navsari',
  'Nikol',
  'Vastral',
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient accent line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      {/* Background with subtle gradient */}
      <div className="relative bg-gradient-to-b from-dark-950 via-dark-900/80 to-dark-950">
        {/* Decorative glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-0">

            {/* ── Column 1: Institute Info ── */}
            <div className="lg:pr-10">
              <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                <div className="relative h-14 w-14 flex items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-primary-500/10 to-accent-500/10 group-hover:from-primary-500/20 group-hover:to-accent-500/20 border border-primary-500/20 group-hover:border-primary-500/40 transition-all duration-300 shadow-lg shadow-primary-500/5">
                  <img src={logo} alt="CDMI Logo" className="h-11 w-11 object-contain" loading="lazy" />
                </div>
                <div>
                  <div className="font-display font-bold text-xl leading-tight text-white group-hover:text-primary-300 transition-colors duration-300">
                    CDMI
                  </div>
                  <div className="text-xs text-dark-500 group-hover:text-dark-400 transition-colors duration-300 tracking-wider uppercase">
                    Institute
                  </div>
                </div>
              </Link>

              <p className="text-dark-400 text-sm leading-relaxed mb-8 max-w-sm">
                Creative Design and Multimedia Institute is a leading computer training
                institute in Gujarat. We offer government approved computer training
                courses to help students build successful careers in the IT industry.
              </p>

              {/* Follow Us */}
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-dark-500 mb-4">
                  Follow Us On
                </h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(({ icon: Icon, href, label, hoverBg }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className={`w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-dark-400 hover:text-white ${hoverBg} hover:border-transparent hover:scale-110 hover:shadow-lg transition-all duration-300`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Column 2: Feature Links ── */}
            <div className="lg:px-10 lg:border-x lg:border-white/5">
              <h4 className="font-display font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                Feature Links
              </h4>
              <ul className="space-y-1">
                {featureLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 px-2 py-2 -mx-2 rounded-lg text-sm text-dark-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                      <HiChevronRight className="w-3.5 h-3.5 text-dark-600 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 3: Contact Us ── */}
            <div className="lg:pl-10">
              <h4 className="font-display font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                Contact Us
              </h4>

              {/* Head Office */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-500/10 border border-primary-500/20 mb-3">
                  <HiLocationMarker className="w-3 h-3 text-primary-400" />
                  <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                    Head Office – Yogichowk
                  </span>
                </div>
                <p className="text-dark-400 text-sm leading-relaxed mb-3 pl-0.5">
                  401-402, 4th Floor, City Center Complex,
                  <br />
                  Nr. Yogichowk, Varachha, Surat
                </p>
                <a
                  href="tel:+919033316003"
                  className="group inline-flex items-center gap-2 text-sm text-dark-400 hover:text-primary-400 transition-colors duration-300"
                >
                  <HiPhone className="w-4 h-4 text-primary-500/70 group-hover:text-primary-400 transition-colors duration-300" />
                  <span className="font-medium">+91 90333 16003</span>
                </a>
              </div>

              {/* Other Branches */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-500/10 border border-accent-500/20 mb-3">
                  <HiOfficeBuilding className="w-3 h-3 text-accent-400" />
                  <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">
                    Other Branches
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {branches.map((branch) => (
                    <div
                      key={branch}
                      className="group flex items-center gap-2 py-1.5 text-sm text-dark-400 hover:text-white transition-colors duration-300 cursor-default"
                    >
                      <HiOfficeBuilding className="w-3 h-3 text-dark-600 group-hover:text-accent-400 transition-colors duration-300 shrink-0" />
                      <span>{branch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="mt-16 pt-6 border-t border-white/5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-dark-500 text-sm">
                &copy; {new Date().getFullYear()}{' '}
                <span className="text-dark-400 font-medium">CDMI</span>. All
                rights reserved.
              </p>
              <div className="flex items-center gap-1 text-sm text-dark-600">
                <span>Crafted with</span>
                <span className="text-red-500 mx-0.5">&hearts;</span>
                <span>by</span>
                <span className="text-dark-400 font-medium ml-0.5">CDMI Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
