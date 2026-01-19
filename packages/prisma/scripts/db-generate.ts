import { cpSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { executePrismaCommand } from "./executeCommand";

(async () => {
  await executePrismaCommand("prisma generate", { force: true });

  const source = join(__dirname, "../node_modules/.prisma");
  const dest = join(__dirname, "../../../node_modules/.prisma");

  if (existsSync(source)) {
    console.log(`Copying Prisma Client from ${source} to ${dest}`);
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true });
    }
    cpSync(source, dest, { recursive: true, force: true });
  }
})();
