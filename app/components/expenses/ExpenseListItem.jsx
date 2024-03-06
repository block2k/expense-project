import { Link, useFetcher } from "@remix-run/react";

function ExpenseListItem({ id, title, amount }) {
  const fetcher = useFetcher();

  function deleteExpenseItemHandler() {
    const confirmDelete = confirm("Are you sure you want to delete this expense?");

    if (!confirmDelete) return;

    fetcher.submit(null, {
      action: `/expenses/${id}`,
      method: "DELETE",
    });
  }

  if (fetcher.state !== "idle") {
    return <article className="expense-item locked">Deleting...</article>;
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* <Form method="DELETE" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id.toString()}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
