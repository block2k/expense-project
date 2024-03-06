import { ActionFunctionArgs } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";

export function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  return destroyUserSession(request, '/auth?mode=login')
}