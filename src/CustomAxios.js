import axios from "axios";
import { notification } from "antd";

const CustomAxios = axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
  });

CustomAxios.interceptors.response.use(
  function (response) {
    if(response.status === 403) {
      notification.warning({
        message: "Inicie sesión",
      });
    }
    if (response.data === "") {
      notification.warning({
        message: "Error",
        description: "No se encontró información",
      });
    }
    return response.data;
  },
  function (error) {
    notification.error({
      message: "Error",
      description: "Ocurrió un error",
    });
    return Promise.reject(error);
  }
);

export { CustomAxios };
