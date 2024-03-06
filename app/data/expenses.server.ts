import { prisma } from './database.server';

export type Expense = {
  id?: number;
  title: string;
  amount: number;
  date: Date;
}

export async function addExpense(expenseData: Expense, userId: number) {
  try {
    return await prisma.expenses.create({
      data: {
        title: expenseData.title,
        amount: expenseData.amount,
        createdAt: expenseData.date,
        User: {
          connect: { id: userId }
        }
      }
    })
  } catch (error) {
    console.log("🚀 ~ addExpense ~ error:", error)
  }
}

export async function getAllExpenses(userId: number) {
  try {
    return await prisma.expenses.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        userId
      }
    });
  } catch (error) {
    console.log("🚀 ~ getAllExpenses ~ error:", error)
    throw error;
  }
}

export async function getExpenseById(expenseId: number) {
  try {
    return await prisma.expenses.findUnique({
      where: {
        id: parseInt(expenseId.toString())
      }
    });
  } catch (error) {
    console.log("🚀 ~ getExpenseById ~ error:", error)
    throw error;
  }
}

export async function updateExpense(id: number, newExpense: Partial<Expense>) {
  try {
    return await prisma.expenses.update({
      where: {
        id
      },
      data: {
        title: newExpense.title,
        amount: newExpense.amount,
        createdAt: newExpense.date
      }
    })
  } catch (error) {
    throw error;
  }
}

export async function deleteExpense(id: number) {
  try {
    await prisma.expenses.delete({
      where: {
        id
      }
    });
  } catch (error) {
    throw error;
  }
}