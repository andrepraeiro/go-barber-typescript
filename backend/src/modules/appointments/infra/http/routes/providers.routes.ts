import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../Controllers/ProvidersControllers';
import ProviderMonthAvailabilityController from '../Controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../Controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providerController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
);

export default providersRouter;
