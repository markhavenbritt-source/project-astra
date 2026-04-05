const Cart = () => {
  return (
    <div className="px-4 pt-12 pb-6">
      <h1 className="text-2xl font-bold font-['Space_Grotesk'] mb-2">Cart</h1>
      <p className="text-sm text-gray-500 font-mono mb-8">
        Items you want to purchase will appear here.
      </p>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-16 h-16 text-gray-300 mb-4">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <p className="text-gray-400 font-mono text-sm">Your cart is empty</p>
      </div>
    </div>
  );
};

export default Cart;
