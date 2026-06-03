// Prisma client — works without generated client (graceful fallback)
// Run `npx prisma generate` after setting DATABASE_URL to enable DB features

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPrismaClient = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeNoop = (): any =>
  new Proxy(
    {},
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get(_t, _p) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (_args?: unknown) =>
          Promise.reject(new Error("Database not configured. Run: npx prisma generate"));
      },
    }
  );

function createPrismaClient(): AnyPrismaClient {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    return new PrismaClient({ log: ["error"] });
  } catch {
    return new Proxy(
      {},
      {
        get(_target, prop) {
          if (prop === "$connect" || prop === "$disconnect") {
            return () => Promise.resolve();
          }
          return makeNoop();
        },
      }
    );
  }
}

const globalForPrisma = globalThis as unknown as { prisma: AnyPrismaClient | undefined };
export const prisma: AnyPrismaClient = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
