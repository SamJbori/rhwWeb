import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_AUTH_TOKEN: z.string(),
    NEXT_PUBLIC_API_EP: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_AUTH_TOKEN: process.env.NEXT_PUBLIC_AUTH_TOKEN,
    NEXT_PUBLIC_API_EP: process.env.NEXT_PUBLIC_API_EP,
  },
  emptyStringAsUndefined: true,
});
