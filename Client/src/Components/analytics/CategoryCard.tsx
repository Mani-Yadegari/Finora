import Card from "../ui/Card";

const CategoryCard = () => {
  return (
    <Card>
      <h3 className="font-semibold">Top Spending</h3>

      <div className="mt-5 space-y-4">
        <div className="flex justify-between">
          <span>Food</span>

          <span className="text-zinc-400">$420</span>
        </div>

        <div className="flex justify-between">
          <span>Shopping</span>

          <span className="text-zinc-400">$300</span>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
