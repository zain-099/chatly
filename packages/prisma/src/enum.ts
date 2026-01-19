import * as PrismaNamespace from "../generated/client";
import {
  ChatProvider,
  CollaborationType,
  GraphNavigation,
  Plan,
  WorkspaceRole,
} from "../generated/client";

// Safe runtime access to the Prisma object (which exists on server, but not on browser)
const Prisma = (PrismaNamespace as any).Prisma;

const JsonNull = Prisma?.JsonNull ?? "JsonNull";
const DbNull = Prisma?.DbNull ?? "DbNull";

// On browser, this falls back to Error. On server, it uses the real class.
const PrismaClientKnownRequestError =
  Prisma?.PrismaClientKnownRequestError ?? Error;

export {
  WorkspaceRole,
  Plan,
  CollaborationType,
  GraphNavigation,
  JsonNull,
  DbNull,
  PrismaClientKnownRequestError,
  ChatProvider,
};
