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
      <header>
        <p>CRM</p>
        <li onClick={handleLogout} className="aside-btn">
          Выйти
        </li>
      </header>
      <div id="main-screen">
        <aside>
          <ul>
            <div id="main-btn">
              <li className="aside-btn">
                <Link to="/main">
                  {" "}
                  <button type="button">Главная</button>
                </Link>
              </li>
              <li className="aside-btn">
                <Link to="/main/settings">
                  <button type="button"> Настройки</button>
                </Link>
              </li>
            </div>
          </ul>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
      <footer>CRM 2024</footer>
    </div>
  );
};

export default MainPage;
