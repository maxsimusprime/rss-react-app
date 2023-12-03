import { FC, FormEvent, useRef, useState } from 'react';
import styles from './Uncontrolled.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Countries, FormDataSource } from '../../dto/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addFormSource } from '../../store/middlewares/converter';
import { useNavigate } from 'react-router-dom';
import { schema } from '../../helpers/schema';

const UncontrolledForm: FC = () => {
  const { countries } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useRef<HTMLFormElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLInputElement>(null);
  const photo = useRef<HTMLInputElement>(null);
  const accepted = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    try {
      schema.validateSync({
        name: name.current?.value,
        age: age.current?.value,
        email: email.current?.value,
        password: password.current?.value,
        passwordConfirm: passwordConfirm.current?.value,
        country: country.current?.value,
        gender: gender.current?.value,
        photo: photo.current?.files,
        accepted: accepted.current?.checked,
      });

      setErrorMessage('');

      const payload: FormDataSource = {
        type: 'uncontrolled',
        name: name.current?.value || '',
        age: age.current?.value || '',
        email: email.current?.value || '',
        password: password.current?.value || '',
        passwordConfirm: passwordConfirm.current?.value || '',
        country: country.current?.value || '',
        gender: gender.current?.value || '',
        photo: photo.current?.files || undefined,
        accepted: accepted.current?.value || '',
      };

      dispatch(addFormSource(payload));
      form.current?.reset();
      navigate('/');
    } catch (error) {
      if (error instanceof Error) setErrorMessage(`${error.message}`);
    }
  };

  return (
    <form
      name="uncontrolled"
      onSubmit={submitHandler}
      className={styles.form}
      autoComplete="on"
      ref={form}
    >
      <div className={styles.form__field_vertical}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className={styles.form__input}
          name="name"
          id="name"
          ref={name}
        />
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          className={styles.form__input}
          name="age"
          id="age"
          ref={age}
        />
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="email">Email address:</label>
        <input
          type="email"
          className={styles.form__input}
          name="email"
          id="email"
          ref={email}
        />
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className={styles.form__input}
          name="password"
          id="password"
          ref={password}
        />
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="password-confirm">Confirm password:</label>
        <input
          type="password"
          className={styles.form__input}
          name="passwordConfirm"
          id="password-confirm"
          ref={passwordConfirm}
        />
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="country">Country:</label>
        <input
          list="countries"
          id="country"
          name='country'
          ref={country}
          className={styles.form__input}
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option
              className={styles.form__option}
              value={Countries[country.code]}
              key={country.code}
            ></option>
          ))}
        </datalist>
      </div>

      <div className={styles.form__field_vertical}>
        <span>Gender:</span>
        <div className={styles.form__field_horizontal}>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            ref={gender}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className={styles.form__field_horizontal}>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            ref={gender}
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/png, image/jpeg"
          ref={photo}
        />
      </div>

      <div className={styles.form__field_horizontal}>
        <input type="checkbox" name="terms" id="terms" ref={accepted} />
        <label htmlFor="terms">Accept Terms & Conditions</label>
      </div>

      <div className={styles.form__field_vertical}>
        <button className={styles.form__button} type="submit">
          Submit
        </button>
        {errorMessage && <p className={styles.form__error}>{errorMessage}</p>}
      </div>
    </form>
  );
};

export default UncontrolledForm;
