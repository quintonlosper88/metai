import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">MetalHub</h3>
            <p className="text-gray-400">
              The professional network for metallurgists
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">LinkedIn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MetalHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;