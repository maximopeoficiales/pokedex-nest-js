import * as Joi from "joi";
import { ConfigEnv } from "./interfaces/config.interface";

export const JoiValidationSchema = Joi.object<ConfigEnv>({
  MONGO_DB: Joi.required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(10),
  ENV: Joi.string().default("dev"),
});