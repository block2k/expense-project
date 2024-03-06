import { Form, Link, useActionData, useMatches, useNavigation, useParams } from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const validationErrors = useActionData();
  const navigation = useNavigation();
  // const expense = useLoaderData();
  const matches = useMatches();
  const params = useParams();
  const expenses = matches.find((m) => m.id === "routes/_app.expenses").data;
  const expense = expenses.find((e) => e.id == params.expenseId);
  console.log("🚀 ~ ExpenseForm ~ expense:", expense);

  const defaultValue = expense
    ? {
        title: expense.title,
        amount: expense.amount,
        date: expense.createdAt,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  const isSubmitting = navigation.state !== "idle";

  return (
    <Form method={expense ? "PATCH" : "POST"} className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" defaultValue={defaultValue.title} name="title" required maxLength={30} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            defaultValue={defaultValue.amount}
            min="0"
            step="0.01"
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required defaultValue={defaultValue.date.slice(0, 10)} />
        </p>
      </div>
      {validationErrors && (
        <div>
          <h2>Validation Errors</h2>
          <ul>
            {Object.values(validationErrors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Expense"}</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
