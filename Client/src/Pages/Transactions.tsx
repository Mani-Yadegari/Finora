import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";

const Transactions = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold">Transactions</h2>

        <p className="text-zinc-400 mt-2">
          Manage and track your financial activity
        </p>
      </div>

      <TransactionFilters />

      <TransactionTable />
    </div>
  );
};

export default Transactions;
