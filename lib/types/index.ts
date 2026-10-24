import type z from "zod";
import type { envSchema } from "../validations/env";

export type Env = z.infer<typeof envSchema>;
