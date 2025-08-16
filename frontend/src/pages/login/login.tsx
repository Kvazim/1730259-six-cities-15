import { FormEvent, memo, useRef, useState } from 'react';
import MemoizedLocationItem from '../../components/location-item/location-item';
import { getRandomArrayItem, validateLoginAndEmail } from '../../utils/utils';
import { Cities } from '../../const';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { toast } from 'react-toastify';

function Login():JSX.Element {
  const formRef = useRef(null);
  const [randomCity,] = useState(getRandomArrayItem<Cities>(Object.values(Cities)));
  const dispatch = useAppDispatch();

  const handleFormSubit = (evt: FormEvent) => {
    evt.preventDefault();

    if (formRef.current !== null) {
      const formData = new FormData(formRef.current);

      if (validateLoginAndEmail(formData)) {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        dispatch(loginAction({email, password}));
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
            <button className="login__submit form__submit button" type="submit">Sign in</button>
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

export default MemoizedLogin;
