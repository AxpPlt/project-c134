import { Component } from "react";
import Cookies from "js-cookie";
class DataBaseDo extends Component {
  // Измененная функция sendData для использования токена из куки
  // async sendData(data, url, isAuthRequest = false) {
  //   const itemData = data;
  //   try {
  //     const response = await fetch(`http://localhost:5000/${url}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${this.getTokenFromCookies()}`, // Добавляем токен из куки
  //       },
  //       body: JSON.stringify(itemData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Ошибка при отправке данных");
  //     }

  //     const result = await response.json();
  //     console.log(result); // Обработка результата

  //     // Если это запрос аутентификации, сохраняем токен в куки
  //     if (isAuthRequest && result.token) {
  //       this.saveTokenToCookies(result.token);
  //     }
  //   } catch (error) {
  //     console.error("Ошибка:", error);
  //   }
  // }
  // async getData(url) {
  //   try {
  //     const response = await fetch(`http://localhost:5000/${url}`, {
  //       method: "GET",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Ошибка при отправке данных");
  //     }

  //     const result = await response.json();
  //     console.log(result); // Обработка результата
  //     return result;
  //   } catch (error) {
  //     console.error("Ошибка:", error);
  //   }
  // }
  getTokenFromCookies() {
    return Cookies.get("jwt");
  }
  async LoginData(name, password) {
    const itemData = { name, password };
    console.log("Отправка данных:", itemData);
    try {
      const response = await fetch(
        "https://ihor24.pythonanywhere.com/api/v1/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      const result = await response.json();
      console.log(
        "Результат:",
        result,
        "Статус ответа:",
        response.status,
        "Токен: ",
        result.token
      ); // Обработка результата

      return { result, status: response.status };
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
  async getData(url) {
    try {
      const token = this.getTokenFromCookies();
      console.log(token);
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          Authorization: `${token}`, // Добавление токена в заголовок
        },
      });

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
}

export default DataBaseDo;
