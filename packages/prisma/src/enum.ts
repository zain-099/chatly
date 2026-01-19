import {
  ChatProvider,
  CollaborationType,
  GraphNavigation,
  Plan,
  Prisma,
  WorkspaceRole,
} from "../generated/client";

const JsonNull = Prisma?.JsonNull ?? "JsonNull";
const DbNull = Prisma?.DbNull ?? "DbNull";

const PrismaClientKnownRequestError = Prisma?.PrismaClientKnownRequestError;

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
