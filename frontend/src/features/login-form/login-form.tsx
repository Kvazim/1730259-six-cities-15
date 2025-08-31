import { FormEvent, memo, useRef } from 'react';
import { useLoginMutation } from '../../entities';
import { validateLoginAndEmail } from '../../shared/lib/utils/utils';
import { toast } from 'react-toastify';

function LoginForm() {
  const formRef = useRef(null);

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
  );
}

const MemoizedLoginForm = memo(LoginForm);

export { MemoizedLoginForm };
