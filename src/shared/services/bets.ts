import api from "./api";

interface IData {
  id: number;
  numbers: number[];
}

export const newBet = (data: IData[]) =>
  api.post("bet/new-bet", { games: data });

export const fetchAllBets = (queryParams = "") =>
  api.get(`bet/all-bets${queryParams}`);
