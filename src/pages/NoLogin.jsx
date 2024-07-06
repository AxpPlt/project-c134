import React, { useState } from "react";
import "../styles/NoLogin.scss";
import { useAuth } from "../hooks/useAuth";
import DataBaseDo from "../hooks/database";
import Cookies from "js-cookie"; // Импорт js-cookie

const NoLogin = () => {
  const DataBaseLogin = new DataBaseDo();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useAuth();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   // Here you would usually send a request to your backend to authenticate the user
  //   // For the sake of this example, we're using a mock authentication
  //   if (username === "login_alexander" && password === "AxpPlt2024") {
  //     // Replace with actual authentication logic
  //     await login({ username });
  //   } else {
  //     alert("Invalid username or password");
  //   }
  // };
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isRegisterFormVisible) setIsRegisterFormVisible(false); // Скрывать форму регистрации при открытии формы логина
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    DataBaseLogin.LoginData(username, password)
      .then(({ result, status }) => {
        if (status === 200) {
          // Проверка на числовой статус
          login({ username });
          Cookies.set("jwt", result.token, {
            expires: 7,
            sameSite: "None",
            secure: true,
          }); // Токен сохраняется на 7 дней
          const token = Cookies.get("jwt"); // Получение токена для проверки
          if (token) {
            console.log("Токен успешно записан:", token);
            // Здесь можно добавить дополнительные действия после успешной записи токена
          } else {
            console.error("Ошибка записи токена");
            // Обработка ситуации, когда токен по каким-то причинам не был записан
          }
        } else if (status === 401) {
          // Проверка на числовой статус
          alert("Invalid username or password");
        } else {
          alert("Unknown error");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        // Здесь можно добавить дополнительную логику для обработки ошибок аутентификации
        if (error.response && error.response.status === 401) {
          alert("Invalid username or password");
        }
      });
  };
  return (
    <div id="no-login-page">
      <div id="login">
        {!isFormVisible && !isRegisterFormVisible ? (
          <>
            <button onClick={toggleFormVisibility}>Вход</button>
          </>
        ) : null}
        {isFormVisible ? (
          <form onSubmit={handleLogin} className="login-form">
            {/* Форма входа */}
            <input
              id="username"
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              id="password"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={() => setIsFormVisible(false)}>Назад</button>
            <button type="submit">Войти</button>
          </form>
        ) : null}
      </div>
      <footer>AxpPlt&IhorBehtiev Product. All right reserverd 2024</footer>
    </div>
  );
};

export default NoLogin;
