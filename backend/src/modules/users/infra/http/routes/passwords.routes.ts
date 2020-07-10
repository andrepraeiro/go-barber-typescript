import { Router } from 'express';
import ForgotPasswordController from '../Controllers/ForgotPasswordController';
import ResetPasswordControllers from '../Controllers/ResetPasswordControllers';

const passwordsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordControllers = new ResetPasswordControllers();

passwordsRouter.post('/forgot', forgotPasswordController.create);
passwordsRouter.post('/reset', resetPasswordControllers.create);

export default passwordsRouter;
