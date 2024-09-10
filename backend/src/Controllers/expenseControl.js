import ExpenseSchema from "../Models/expenseModel.js";

const ExpenseMethod = {
  addingExpense: async (req, res) => {
    try {
      const { title, amount, category, description, date } = req.body;

      if (!title || !amount || !date || !category || !description) {
        return res.status(400).json({
          message: "Please enter all required fields",
        });
      }

      const newExpense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
      });

      await newExpense.save();

      return res.status(201).json({
        message: "Expense added successfully",
        expense: newExpense,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  getExpense: async (req, res) => {
    try {
      const expenses = await ExpenseSchema.find().sort({ createdAt: -1 }); // Closing the chain properly

      if (!expenses || expenses.length === 0) {
        return res.status(400).json({
          message: "No expenses found",
        });
      }

      return res.status(200).json({
        message: "Expenses fetched successfully",
        expenses,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);

      if (!deletedExpense) {
        return res.status(404).json({
          message: "Expense not found",
        });
      }

      return res.status(200).json({
        message: "Expense deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

export default ExpenseMethod;
