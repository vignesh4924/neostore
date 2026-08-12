import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { useEffect } from 'react';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white">
      <Header />
      <CartDrawer />
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
