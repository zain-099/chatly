import type { NextApiRequest, NextApiResponse } from "next";
import cors from "nextjs-cors";
import { createOpenApiNextHandler } from "trpc-to-openapi";
import { createContext } from "@/helpers/server/context";
import { publicRouter } from "@/helpers/server/routers/publicRouter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res, {
    origin: [
      "https://doc.typebot.io",
      "https://chatly.vercel.app",
      "https://chatly-builder.vercel.app",
    ],
  });

  return createOpenApiNextHandler({
    router: publicRouter,
    createContext,
  })(req, res);
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default handler;
