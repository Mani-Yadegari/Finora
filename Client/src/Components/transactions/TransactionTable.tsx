import Card from "../ui/Card";

const transactions = [
  {
    name: "Netflix Subscription",
    category: "Entertainment",
    date: "Aug 01, 2026",
    amount: "-$15",
  },
  {
    name: "Freelance Payment",
    category: "Income",
    date: "Aug 02, 2026",
    amount: "+$1200",
  },
  {
    name: "Grocery Shopping",
    category: "Food",
    date: "Aug 03, 2026",
    amount: "-$85",
  },
];

const TransactionTable = () => {
  return (
    <Card>
      <div className="space-y-4">
        {transactions.map((item) => (
          <div
            key={item.name}
            className="
              grid
              grid-cols-4
              items-center
              p-4
              rounded-xl
              bg-white/5
            "
          >
            <span>{item.name}</span>

            <span className="text-zinc-400">{item.category}</span>

            <span className="text-zinc-400">{item.date}</span>

            <span
              className={
                item.amount.startsWith("+") ? "text-green-400" : "text-red-400"
              }
            >
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionTable;
