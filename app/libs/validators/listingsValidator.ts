import { z } from "zod";

export const listingslValidator = z.object({
  title: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  category: z.string(),
  roomCount: z.number(),
  bathroomCount: z.number(),
  guestCount: z.number(),
  location: z.any(),
  price: z.string(),
});

export type listingsValidatorType = z.infer<typeof listingslValidator>;
