import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import Logo from "../util/Logo";

function MainHeader() {
  const user = useLoaderData();

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {user && (
              <Form method="POST" id="logout-form" action="/logout">
                <button className="cta-alt">Logout</button>
              </Form>
            )}
            {!user && (
              <Link to="/auth?mode=login" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
