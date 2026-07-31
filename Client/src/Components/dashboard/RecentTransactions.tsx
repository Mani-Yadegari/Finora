import Card from "../ui/Card";

const transactions = [
  {
    title: "Netflix Subscription",
    category: "Entertainment",
    amount: "-$15",
  },
  {
    title: "Freelance Payment",
    category: "Income",
    amount: "+$1200",
  },
  {
    title: "Coffee Shop",
    category: "Food",
    amount: "-$8",
  },
];

const RecentTransactions = () => {
  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
      </div>

      <div className="space-y-4">
        {transactions.map((item) => (
          <div
            key={item.title}
            className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              bg-white/5
            "
          >
            <div>
              <p className="font-medium">{item.title}</p>

              <p className="text-sm text-zinc-400">{item.category}</p>
            </div>

            <span
              className="
              font-semibold
            "
            >
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
