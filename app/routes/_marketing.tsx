import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import MainHeader from '~/components/navigation/MainHeader';
import { getUserFromSession } from "~/data/auth.server";
import marketingStyles from "~/styles/marketing.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: marketingStyles },
];

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export function loader({ request }: LoaderFunctionArgs) {
  return getUserFromSession(request)
}