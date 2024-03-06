import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpenseHeader";
import expensesStyle from "~/styles/expenses.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyle },
];

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}