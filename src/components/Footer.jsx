import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f1023] text-white border-t border-white/10">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Market Place
            </h1>

            <p className="text-gray-400 mt-4 leading-relaxed">
               This modern e-commerce platform allows users to
                seamlessly shop for products and also sell their own
                 items with a smooth and interactive experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-blue-400 transition-all cursor-pointer">
                <Link>
                Home
                </Link>
              </li>

              <li className="hover:text-blue-400 transition-all cursor-pointer">
                                 <Link to="/cart">
                cart
                </Link>
              </li>

              <li className="hover:text-blue-400 transition-all cursor-pointer">
                                <Link to="/order-page">
                orders
                </Link>
              </li>

              <li className="hover:text-blue-400 transition-all cursor-pointer">
                                 <Link to="/profile">
                setting
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Connect</h2>

            <div className="flex gap-4">
              
              <a
                href="https://github.com/dhirajsingh2525?tab=repositories"
                className="p-3 rounded-xl bg-white/10 hover:bg-blue-500 transition-all duration-300 hover:scale-110"
              >
                <Github size={22} />
              </a>

              <a
                href="#"
                className="p-3 rounded-xl bg-white/10 hover:bg-blue-500 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={22} />
              </a>

              <a
                href="#"
                className="p-3 rounded-xl bg-white/10 hover:bg-pink-500 transition-all duration-300 hover:scale-110"
              >
                <Instagram size={22} />
              </a>

              <a
                href="#"
                className="p-3 rounded-xl bg-white/10 hover:bg-green-500 transition-all duration-300 hover:scale-110"
              >
                <Mail size={22} />
              </a>
            </div>

            <p className="text-gray-500 mt-5 text-sm">
              Designed & Developed by Dhiraj Kumar Singh
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          
          <p>
            © 2026 Dhiraj Store. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Built with React ⚡ Tailwind ⚡ Redux Toolkit
          </p>
        </div>
      </div>
    </footer>
  );
}