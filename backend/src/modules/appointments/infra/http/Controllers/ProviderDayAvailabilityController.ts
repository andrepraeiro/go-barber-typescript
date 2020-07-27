import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const ListProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    );

    const availability = await ListProviderDayAvailability.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;
