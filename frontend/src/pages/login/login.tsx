import { FormEvent, memo, useRef, useState } from 'react';
import MemoizedLocationItem from '../../shared/ui/location-item/location-item';
import { getRandomArrayItem, validateLoginAndEmail } from '../../shared/lib/utils/utils';
import { Cities } from '../../shared/lib/const/const';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../entities/header-nav/model/user-api';

function Login() {
  const formRef = useRef(null);
  const [randomCity,] = useState(getRandomArrayItem<Cities>(Object.values(Cities)));
  const [login, { isLoading }] = useLoginMutation();

  const handleFormSubit = (evt: FormEvent) => {
    evt.preventDefault();

    if (formRef.current !== null) {
      const formData = new FormData(formRef.current);

      if (validateLoginAndEmail(formData)) {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        login({email, password}).unwrap();
      } else {
        toast.warn('Пароль должен содержать минимум одну цифру и латинскую букву');
      }
    }

  };

  return (
    <main className="page__main page__main--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" ref={formRef} onSubmit={handleFormSubit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button className="login__submit form__submit button" disabled={isLoading} type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <MemoizedLocationItem city={randomCity} />
        </section>
      </div>
    </main>
  );
}

const MemoizedLogin = memo(Login);

export { MemoizedLogin };
