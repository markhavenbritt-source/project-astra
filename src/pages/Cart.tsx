import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <div className="px-md pt-4 pb-lg">
      {/* Mobile-only top header — desktop uses the global DesktopNav in Layout */}
      <div className="lg:hidden flex items-center mb-6">
        <Link to="/" aria-label="Astra home">
          <img
            src="/images/logo_left.svg"
            alt="ASTRA"
            className="h-[28px] w-auto"
          />
        </Link>
      </div>

      <h1 className="font-sans text-h3 mb-2">Cart</h1>
      <p className="font-sans text-body-2 text-gray-500 mb-8">
        Items you want to purchase will appear here.
      </p>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-16 h-16 text-gray-300 mb-4">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <p className="text-gray-400 font-mono text-caption-1">Your cart is empty</p>
      </div>
    </div>
  );
};

export default Cart;
