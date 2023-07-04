import { z } from "zod";

export const reservationValidator = z.object({
  listingId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  totalPrice: z.number(),
});

export type reservationValidatorType = z.infer<typeof reservationValidator>;
