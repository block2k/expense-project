import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { FaLock } from 'react-icons/fa';

function AuthForm() {
  const [params] = useSearchParams();
  const mode = params.get('mode');
  const validationErrors = useActionData();

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        <FaLock />
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password"  />
      </p>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error: string) => (
            <li >{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button type='submit'>{mode === 'login' ? 'Login' : "Register"}</button>
        <Link to={mode === 'login' ? '/auth?mode=register' : '/auth?mode=login'}>{mode === 'login' ? 'Register account' : 'Log in with existing user'}</Link>
      </div>
    </Form>
  );
}

export default AuthForm;