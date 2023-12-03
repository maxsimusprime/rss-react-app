import { FC } from 'react';
import styles from '../Uncontrolled/Uncontrolled.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../helpers/schema';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import type { FormData, FormDataSource } from '../../dto/types';
import { addFormSource } from '../../store/middlewares/converter';
import { useNavigate } from 'react-router-dom';
import { Countries } from '../../dto/types';

const ControlledForm: FC = () => {
  const { countries } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      passwordConfirm: '',
      country: '',
      gender: '',
      photo: undefined,
      accepted: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormData> = (data): void => {
    const payload: FormDataSource = { ...data, ...{ type: 'controlled' } };
    dispatch(addFormSource(payload));
    reset();
    navigate('/');
  };

  return (
    <form
      name="controlled"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      autoComplete="on"
    >
      <div className={styles.form__field_vertical}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className={styles.form__input}
          {...register('name')}
        />
        {errors.name && (
          <p className={styles.form__error}>{errors.name.message}</p>
        )}
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          className={styles.form__input}
          {...register('age')}
        />
        {errors.age && (
          <p className={styles.form__error}>{errors.age.message}</p>
        )}
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="email">Email address:</label>
        <input
          type="email"
          id="email"
          className={styles.form__input}
          {...register('email')}
        />
        {errors.email && (
          <p className={styles.form__error}>{errors.email.message}</p>
        )}
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className={styles.form__input}
          {...register('password')}
        />
        {errors.password && (
          <p className={styles.form__error}>{errors.password.message}</p>
        )}
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="password-confirm">Confirm password:</label>
        <input
          type="password"
          id="password-confirm"
          className={styles.form__input}
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && (
          <p className={styles.form__error}>{errors.passwordConfirm.message}</p>
        )}
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="country">Country:</label>
        <select
          className={styles.form__select}
          {...register('country')}
          id="country"
        >
          <option className={styles.form__option} value="">
            Select Country
          </option>
          {countries.map((country) => (
            <option
              className={styles.form__option}
              value={country.code}
              key={country.code}
            >
              {Countries[country.code]}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className={styles.form__error}>{errors.country.message}</p>
        )}
      </div>

      <div className={styles.form__field_vertical}>
        <span>Gender:</span>
        <div className={styles.form__field_horizontal}>
          <input type="radio" {...register('gender')} value="male" id="male" />
          <label htmlFor="male">Male</label>
        </div>
        <div className={styles.form__field_horizontal}>
          <input
            type="radio"
            {...register('gender')}
            value="female"
            id="female"
          />
          <label htmlFor="female">Female</label>
        </div>
        {errors.gender && (
          <p className={styles.form__error}>{errors.gender.message}</p>
        )}
      </div>

      <div className={styles.form__field_vertical}>
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          accept="image/png, image/jpeg"
          {...register('photo')}
        />
        {errors.photo && (
          <p className={styles.form__error}>{errors.photo.message}</p>
        )}
      </div>

      <div className={styles.form__field_vertical}>
        <div className={styles.form__field_horizontal}>
          <input type="checkbox" {...register('accepted')} id="terms" />
          <label htmlFor="terms">Accept Terms & Conditions</label>
        </div>
        {errors.accepted && (
          <p className={styles.form__error}>{errors.accepted.message}</p>
        )}
      </div>

      <div className={styles.form__field_vertical}>
        <button className={styles.form__button} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ControlledForm;
