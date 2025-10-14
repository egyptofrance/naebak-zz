import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";
import { allPaths } from "./paths";
import { MiddlewareConfig } from "./types";

export const localeMiddleware: MiddlewareConfig = {
  matcher: ["/((?!api|_next|.*\\..*).*)", ...allPaths],
  middleware: async (request) => {
    // Create the i18n middleware handler using the routing configuration
    const handler = createMiddleware(routing);

    // Handle the request with next-intl middleware
    const response = handler(request);

    return [response, null];
  },
};

