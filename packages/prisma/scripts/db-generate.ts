import { cpSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { executePrismaCommand } from "./executeCommand";

(async () => {
  await executePrismaCommand("prisma generate", { force: true });
})();
