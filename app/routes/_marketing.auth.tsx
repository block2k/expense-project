import { ActionFunctionArgs, LinksFunction } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import { login, register } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';
import styles from '~/styles/auth.css';

export default function AuthPage() {
  return (
    <>
      <AuthForm />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const authData = Object.fromEntries(formData)
  console.log("🚀 ~ action ~ formData:", authData)

  try {
    validateCredentials(authData)
  } catch (error) {
    console.log(error);
    return error
  }

  if (authMode === 'login') {
    // login logic
    return await login({ email: authData.email, password: authData.password })
  } else {
    // register logic
    try {
      return await register({ email: authData.email, password: authData.password })
    } catch (error) {
      console.log(error);
      return error
    }
  }
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];