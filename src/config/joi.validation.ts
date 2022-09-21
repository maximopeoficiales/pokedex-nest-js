import * as Joi from "joi";
import { ConfigEnv } from "./interfaces/config.interface";

export const JoiValidationSchema = Joi.object<ConfigEnv>({
  MONGO_BD: Joi.required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(5),
  ENV: Joi.string().default("dev"),
});