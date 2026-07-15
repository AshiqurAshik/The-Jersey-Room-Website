import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0B3D2E] py-6">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-lg font-semibold text-[#F5F5F0]">
          The <span className="text-[#C8F169]">Jersey</span> Room
        </p>

        <p className="mt-2 text-sm text-[#D1D5DB]">
          Premium football jerseys crafted for true fans.
        </p>

        <p className="mt-4 text-xs text-[#8A8A82]">
          © {new Date().getFullYear()} The Jersey Room. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
