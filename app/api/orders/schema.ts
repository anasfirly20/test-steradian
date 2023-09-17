import { z } from "zod";

const schema = z.object({
  pickUpLoc: z.string(),
  dropOffLoc: z.string(),
  pickUpTime: z.string(),
});

export default schema;
