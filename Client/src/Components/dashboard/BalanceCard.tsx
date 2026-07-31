import Card from "../ui/Card";

const BalanceCard = () => {
  return (
    <Card
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-green-500/20
      to-transparent
    "
    >
      <p className="text-zinc-300">Total Balance</p>

      <h2
        className="
        text-5xl
        font-semibold
        mt-5
      "
      >
        $24,580.00
      </h2>

      <p
        className="
        mt-4
        text-green-400
      "
      >
        +12.5% this month
      </p>
    </Card>
  );
};

export default BalanceCard;
