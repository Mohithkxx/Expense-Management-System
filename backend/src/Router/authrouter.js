import express from 'express';
const router = express.Router();
import userprofile from '../Controllers/userControl.js';
import IncomeMangement from '../Controllers/incomeControl.js'
import ExpenseMethod from '../Controllers/expenseControl.js';
import { upload, Resumeupload } from '../Middleware/multer.js';
import Authorization from '../Middleware/isAuthorized.js';

// Create User Profile Controller router;
router.post("/api/register",upload, userprofile.register);
router.post("/api/login", userprofile.login);
router.post("/api/update",Authorization, Resumeupload, userprofile.updateprofile);
router.post("/api/logout", userprofile.logout);
//income management controller router adding income for admin users
router.post("/api/add-income",IncomeMangement.createIncome );
router.get("/api/get-allincome",IncomeMangement.getIncomes);
router.post("/api/delete-income",IncomeMangement.deleteIncome);
//expense management controller router;
router.post("/api/add-expense",ExpenseMethod.addingExpense);
router.get("/api/get-expense",ExpenseMethod.getExpense);
router.post("/api/delete-expense",ExpenseMethod.deleteExpense);

export default router;