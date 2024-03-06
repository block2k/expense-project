import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaPlus } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import ExpenseList from '~/components/expenses/ExpensesList';
import { authGuard } from "~/data/auth.server";
import { getAllExpenses } from "~/data/expenses.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authGuard(request);

  return getAllExpenses(user.id);
}

export default function ExpensesPage() {
  const expenses = useLoaderData();

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>
              Add New Expense
            </span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpenseList expenses={expenses} />
      </main>
    </>
  );
}