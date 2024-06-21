import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary relative z-50 p-2 flex items-center justify-center text-white font-medium">
      @{currentYear} All Rights Reserved By Banao Social
    </footer>
  );
};

export default Footer;
