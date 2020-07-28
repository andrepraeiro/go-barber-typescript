import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ForgotPasswordController from '../Controllers/ForgotPasswordController';
import ResetPasswordControllers from '../Controllers/ResetPasswordControllers';

const passwordsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordControllers = new ResetPasswordControllers();

passwordsRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create
);
passwordsRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordControllers.create
);

export default passwordsRouter;
