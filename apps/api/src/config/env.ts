import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.coerce.number().default(3001),
	HOST: z.string().default("0.0.0.0"),
	DATABASE_URL: z.string().optional(),
	CORS_ORIGIN: z.string().default("*"),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
