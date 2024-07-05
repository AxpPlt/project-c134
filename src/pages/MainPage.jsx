import "../styles/MainPage.scss";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const MainPage = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <header>CRM</header>
      <div id="main-screen">
        <aside>
          <ul>
            <div id="main-btn">
              {" "}
              <li className="aside-btn">
                <Link to="/main">Главная</Link>
              </li>
              <li className="aside-btn">
                <Link to="/main/settings">Настройки</Link>
              </li>
            </div>
            <li onClick={handleLogout} className="aside-btn">
              Выйти
            </li>
          </ul>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
      <footer>Axpplt Producation</footer>
    </div>
  );
};

export default MainPage;
