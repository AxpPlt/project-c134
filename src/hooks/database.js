import { Component } from "react";
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
  async LoginData(name, password, rememberme) {
    const itemData = { name, password, rememberme };
    console.log("Отправка данных:", itemData);
    try {
      const response = await fetch(
        "https://ihor24.pythonanywhere.com/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      const result = await response.json();
      console.log("Результат:", result, "Статус ответа:", response.status); // Обработка результата

      return { result, status: response.status };
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
  async getData(url) {
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
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
