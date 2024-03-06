import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { authGuard } from '~/data/auth.server';
import { Expense, addExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function AddExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..')
  }

  return (
    <>
      <Modal onClose={closeHandler}>
        <ExpenseForm />
      </Modal>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await authGuard(request);

  const formData = await request.formData();

  const expense: Expense = {
    title: formData.get('title') as string,
    amount: parseFloat(formData.get('amount') as string),
    date: new Date(formData.get('date') as string)
  }

  try {
    validateExpenseInput(expense);
  } catch (error) {
    return error
  }

  await addExpense(expense, user.id);

  // wait 1 second to simulate a slow network
  await new Promise(resolve => setTimeout(resolve, 1000));

  return redirect('/expenses');
}