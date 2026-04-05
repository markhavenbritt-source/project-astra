const Collection = () => {
  return (
    <div className="px-4 pt-12 pb-6">
      <h1 className="text-2xl font-bold font-['Space_Grotesk'] mb-2">My Collection</h1>
      <p className="text-sm text-gray-500 font-mono mb-8">
        Comics you've saved or purchased will appear here.
      </p>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-16 h-16 text-gray-300 mb-4">
          <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-gray-400 font-mono text-sm">Nothing here yet</p>
      </div>
    </div>
  );
};

export default Collection;
