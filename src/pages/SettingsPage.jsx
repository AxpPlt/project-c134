import { Outlet, Link } from "react-router-dom";
import "../styles/SettingsPage.scss";

const SettingsPage = () => {
  return (
    <div id="settings-page">
      <h1>Настройки</h1>
      <ul>
        <li>
          <Link to="settings-fields">Поля</Link>
        </li>
        <li>Пользователи</li>
        <li>Тест №1</li>
        <li>Тест №2</li>
      </ul>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default SettingsPage;
