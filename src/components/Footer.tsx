import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Store, Megaphone, Gift, HelpCircle, Copyright, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-[#878787] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-white/10 text-[11px]">
          {/* ABOUT */}
          <div className="space-y-4">
            <h4 className="text-[#949494] font-medium text-[12px]">ABOUT</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:underline">Contact Us</Link></li>
              <li><Link to="#" className="hover:underline">About Us</Link></li>
              <li><Link to="#" className="hover:underline">Careers</Link></li>
              <li><Link to="#" className="hover:underline">Neo Stories</Link></li>
              <li><Link to="#" className="hover:underline">Press</Link></li>
              <li><Link to="#" className="hover:underline">Corporate Information</Link></li>
            </ul>
          </div>

          {/* GROUP COMPANIES */}
          <div className="space-y-4">
            <h4 className="text-[#949494] font-medium text-[12px]">GROUP COMPANIES</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:underline">Myntra</Link></li>
              <li><Link to="#" className="hover:underline">Cleartrip</Link></li>
              <li><Link to="#" className="hover:underline">Shopsy</Link></li>
            </ul>
          </div>

          {/* HELP */}
          <div className="space-y-4">
            <h4 className="text-[#949494] font-medium text-[12px]">HELP</h4>
            <ul className="space-y-2">
              <li><Link to="/deployment-status" className="hover:underline">Deployment Status</Link></li>
              <li><Link to="/help-desk" className="hover:underline">Shipping & Returns</Link></li>
              <li><Link to="/help-desk" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>

          {/* CONSUMER POLICY */}
          <div className="space-y-4">
            <h4 className="text-[#949494] font-medium text-[12px]">CONSUMER POLICY</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:underline">Cancellation & Returns</Link></li>
              <li><Link to="#" className="hover:underline">Terms Of Use</Link></li>
              <li><Link to="#" className="hover:underline">Security</Link></li>
              <li><Link to="#" className="hover:underline">Privacy</Link></li>
              <li><Link to="#" className="hover:underline">Sitemap</Link></li>
              <li><Link to="#" className="hover:underline">Grievance Redressal</Link></li>
            </ul>
          </div>

          {/* MAIL US */}
          <div className="space-y-4 border-l border-white/10 pl-8 lg:col-span-1">
            <h4 className="text-[#949494] font-medium text-[12px]">Mail Us:</h4>
            <p className="leading-5">
              NEOSTOREX Protocol Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
            <div className="pt-4">
                <h4 className="text-[#949494] font-medium text-[12px] mb-2">Connect Protocol:</h4>
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook Access">
                      <Facebook size={18} className="text-white hover:text-brand cursor-pointer transition-colors" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel">
                      <Youtube size={18} className="text-white hover:text-brand cursor-pointer transition-colors" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile text-glow">
                      <Instagram size={18} className="text-white hover:text-brand cursor-pointer transition-colors" />
                    </a>
                    <a href="mailto:support@neostorex.com" aria-label="Gmail Interface">
                      <Mail size={18} className="text-white hover:text-brand cursor-pointer transition-colors" />
                    </a>
                </div>
            </div>
          </div>

          {/* REGISTERED OFFICE */}
          <div className="space-y-4 pl-4 lg:col-span-1">
            <h4 className="text-[#949494] font-medium text-[12px]">Registered Office Address:</h4>
            <p className="leading-5">
              NEOSTOREX Protocol Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India<br />
              CIN : U51109KA2012PTC066107<br />
              Telephone: <span className="text-brand">044-45614700</span> / <span className="text-brand">044-67415800</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-white text-[12px] items-center">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-brand transition-colors">
                <Store size={14} className="text-brand" />
                <span>Become a Seller</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-brand transition-colors">
                <Megaphone size={14} className="text-brand" />
                <span>Advertise</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-brand transition-colors">
                <Gift size={14} className="text-brand" />
                <span>Gift Cards</span>
            </div>
            <Link to="/help-desk" className="flex items-center space-x-2 cursor-pointer hover:text-brand transition-colors">
                <HelpCircle size={14} className="text-brand" />
                <span>Help Center</span>
            </Link>
            <div className="flex items-center space-x-2 lg:justify-end">
                <Copyright size={12} className="text-brand" />
                <span className="text-[11px] text-[#878787]">2007-2026 NEOSTOREX.com</span>
            </div>
        </div>

        {/* Payment Icons */}
        <div className="pt-8 flex justify-center lg:justify-end">
            <img 
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" 
              alt="Payment Methods" 
              className="h-6 grayscale opacity-80"
              referrerPolicy="no-referrer"
            />
        </div>
      </div>
    </footer>
  );
}
