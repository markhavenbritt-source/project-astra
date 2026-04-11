import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-surface-app">
      <main className="flex-1 pb-20 no-scrollbar overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
