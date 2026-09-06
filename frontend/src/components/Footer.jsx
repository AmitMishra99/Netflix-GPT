import { Twitter, Instagram, Github, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 px-6 md:px-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Brand Section */}
        <div className="space-y-3">
          <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-wide">
            Netflix<span className="text-red-600">GPT</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            A demo streaming UI project built for learning purposes. Not
            affiliated with Netflix.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-white font-semibold text-base mb-1">
            Quick Links
          </h3>
          <a
            href="#"
            className="hover:text-white text-sm transition-colors duration-200 w-fit"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-white text-sm transition-colors duration-200 w-fit"
          >
            Movies
          </a>
          <a
            href="#"
            className="hover:text-white text-sm transition-colors duration-200 w-fit"
          >
            TV Shows
          </a>
          <a
            href="#"
            className="hover:text-white text-sm transition-colors duration-200 w-fit"
          >
            My List
          </a>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-white font-semibold text-base mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-gray-900 p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="bg-gray-900 p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="bg-gray-900 p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              href="#"
              className="bg-gray-900 p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300"
              aria-label="Github"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-900 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Netflix_GPT. All rights reserved.
      </div>
    </footer>
  );
}
