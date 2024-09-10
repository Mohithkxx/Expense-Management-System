import IncomeSchema from "../Models/incomeModel.js";
import dotenv from "dotenv";
dotenv.config();

const IncomeController = {
  createIncome: async (req, res) => {
    try {
      const { title, amount, type, date, category, description } = req.body;
      if (!title || !amount || !type || !category || !description) {
        res.status(400).json({
          message: "please enter all fields are required ",
        });
        if (amount <= 0 || !amount === "number") {
          return res
            .status(400)
            .json({ message: "Amount must be a number!" })
        }
        const income = new IncomeSchema({
          title,
          amount,
          type,
          date,
          category,
          description,
        });
        await income.save();
        res.status(201).json({
          message: "Income created successfully",
          data: income,
          success: true,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getIncomes: async (req, res) => {
    try {
        const incomeuser = await IncomeSchema.find().sort({ createdAt: -1 });
        if(!incomeuser) {
            res.status(400).json({
                message: "No income found",
                success: false,
            })
        }
        res.status(200).json({
            message: "Incomes fetched successfully",
            data: incomeuser,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
},
    deleteIncome : async (req, res) => {
        try {
            const {id} = req.params.id;
            const income = await IncomeSchema.findByIdAndDelete(id);
            if(!income){
                res.status(400).json({
                    message: "Income not found",
                    success: false,
                })
            }
            res.status(200).json({
                message: "Income deleted successfully",
                data: income,
                success: true,
            });
        } catch (error) {
            console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
        }
    }
};


export default IncomeController;