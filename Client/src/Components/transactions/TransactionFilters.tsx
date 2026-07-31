const TransactionFilters = () => {
  return (
    <div
      className="
      flex
      gap-4
      mb-6
    "
    >
      <input
        placeholder="Search transactions..."
        className="
          flex-1
          bg-white/5
          border
          border-white/10
          rounded-xl
          px-4
          py-3
          outline-none
        "
      />

      <button
        className="
          px-5
          rounded-xl
          bg-green-500
          text-black
          font-medium
        "
      >
        Add Transaction
      </button>
    </div>
  );
};

export default TransactionFilters;
