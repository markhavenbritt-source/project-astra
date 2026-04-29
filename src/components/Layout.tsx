import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-md lg:max-w-none mx-auto relative">
      <main className="flex-1 pb-20 lg:pb-0 no-scrollbar overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
};

export default Layout;
