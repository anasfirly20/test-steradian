import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
  email: z.string().email(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  city: z.string(),
  zip: z.number(),
  message: z.string().min(10),
  password: z.string().min(6),
  username: z.string().min(6),
  address: z.string(),
});

export default schema;
