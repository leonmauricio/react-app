import { CustomAxios } from "./CustomAxios";

export const getTickers = () => {
  return CustomAxios.get("?archetype=Blue-Eyes");
};

export const getSpecificTicker = id => {
  return CustomAxios.get(`?archetype=Blue-Eyes&id=${id}`);
};
