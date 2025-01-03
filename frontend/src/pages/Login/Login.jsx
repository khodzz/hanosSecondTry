import React, { useState } from "react";
import "./Login.scss";
import { Link, Navigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/reducers/user/user";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { user, status, error } = useSelector((s) => s.user);

  const dispatch = useDispatch();

  const submitForm = (data) => {
    dispatch(loginUser(data));
  };

  if (status === "success") {
    return <Navigate to="/personalPage" />;
  }

  return (
    <div className="login">
      <div className="container">
        <div className="login__line">
          <div className="login__here">
            <p>
              Вы здесь:
              <Link className="login__here-link" to="/home">
                Домой
              </Link>
              <span>&gt; Войти в аккаунт</span>
            </p>
          </div>
          <form className="login__form" onSubmit={handleSubmit(submitForm)}>
            <h1>Войти в аккаунт</h1>
            <h4>
              У вас уже есть аккаунт? <br /> Войдите, чтобы получить настройки
              своей учетной записи.
            </h4>
            <p>
              Обратите внимание: учетная запись известна нам только в том
              случае, <br />
              если вы получаете поставки от HANOS.
            </p>
            <div>
              <span className="login__form-label">Электронная почта</span>
              <div className="login__form-inputs">
                <MdOutlineEmail className="login__form-inputs-icons-email" />
                <input
                  {...register("email", { required: true })}
                  className="login__form-input"
                  type="email"
                  required
                  placeholder="Введите свою электронную почту"
                />
              </div>
              <span className="login__form-label">Пароль</span>
              <div className="login__form-inputs">
                <RiLockPasswordLine className="login__form-inputs-icons-password" />
                <input
                  {...register("password", { required: true })}
                  className="login__form-input"
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  placeholder="Введите свой пароль"
                />
                <div
                  className="login__form-input-icons"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <FaRegEye className="login__form-inputs-icons-show" />
                  ) : (
                    <FaRegEyeSlash className="login__form-inputs-icons-hide" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="login__form-signin-btn">
                Войти
              </button>
              <button className="login__form-forgot-password">
                Забыли пароль?
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="login__empty"></div>
    </div>
  );
};

export default Login;
