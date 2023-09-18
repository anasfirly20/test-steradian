import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  carType: z.string().min(1),
  rating: z.number(),
  fuel: z.string(),
  image: z.string(),
  hourRate: z.string(),
  dayRate: z.string(),
  monthRate: z.string(),
});

export default schema;
