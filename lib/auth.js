import { betterAuth } from "better-auth";
import { getDatabase, databaseConfigured } from "./database.js";
export const authConfigured = () => databaseConfigured() && Boolean(process.env.BETTER_AUTH_SECRET?.length >= 32 && process.env.BETTER_AUTH_URL);
export function createAuth({ bootstrap = false, database } = {}) {
  if (!authConfigured()) throw new Error("authentication_not_configured");
  return betterAuth({
    database: database || getDatabase(), secret: process.env.BETTER_AUTH_SECRET, baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: { enabled: true, disableSignUp: !bootstrap, minPasswordLength: 12, maxPasswordLength: 128 },
    session: { expiresIn: 12 * 60 * 60, updateAge: 60 * 60 },
    rateLimit: { enabled: true, storage: "database", window: 60, max: 30, customRules: { "/sign-in/email": { window: 60, max: 5 } } },
    user: { deleteUser: { enabled: false } },
  });
}
let auth;
export const getAuth = () => auth ||= createAuth();
