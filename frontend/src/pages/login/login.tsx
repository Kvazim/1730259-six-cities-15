import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { MemoizedLoginForm } from '../../features';
import { MemoizedRandomCity } from '../../widgest';

function Login() {
  return (
    <main className="page__main page__main--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <MemoizedLoginForm />
        </section>
        <MemoizedRandomCity />
      </div>
    </main>
  );
}

const MemoizedLogin = memo(Login);

export { MemoizedLogin };
