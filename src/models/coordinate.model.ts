import { z } from "zod";

const CoordinateSchema = z.object({
  latitude: z
    .string()
    .min(1)
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Latitude must be a number." })
    .refine((val) => val >= -90 && val <= 90, {
      message: "Latitude must be between -90 and 90.",
    }),
  longitude: z
    .string()
    .min(1)
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Longitude must be a number." })
    .refine((val) => val >= -180 && val <= 180, {
      message: "Longitude must be between -180 and 180.",
    }),
});

export default CoordinateSchema;
