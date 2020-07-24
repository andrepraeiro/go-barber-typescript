import ListProviderMonthAvailabilityService from '../services/ListProviderMonthAvailabilityService';

export default interface ICreateAppointmentDTO {
  provider_id: string;
  month: number;
  year: number;
}
