import { redirect, useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { deleteExpense, updateExpense } from '~/data/expenses.server';

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..')
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action({ params, request }) {
  const expenseId = params.expenseId;

  switch (request.method) {
    case 'PATCH':
      const formData = await request.formData();
      await updateExpense(parseInt(expenseId), {
        title: formData.get('title') as string,
        amount: parseFloat(formData.get('amount') as string),
        date: new Date(formData.get('date') as string)
      });
      return redirect('/expenses');
    case 'DELETE':
      await new Promise(resolve => setTimeout(resolve, 1000));
      await deleteExpense(parseInt(expenseId));
      return { deletedId: expenseId }
  }


}