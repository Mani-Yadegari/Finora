import Card from "../ui/Card";

type Props = {
  title: string;
  value: string;
  change: string;
};

const StatCard = ({ title, value, change }: Props) => {
  return (
    <Card>
      <p className="text-sm text-zinc-400">{title}</p>

      <h3 className="text-3xl font-semibold mt-3">{value}</h3>

      <p className="text-sm text-green-400 mt-3">{change}</p>
    </Card>
  );
};

export default StatCard;
