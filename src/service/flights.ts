import axios from "axios";
import { JSON_SERVER_API } from "../configs/backend-base-url";
import { Flight } from "../views/pages/flights/types";

export const listFlights = () => axios
.get(`${JSON_SERVER_API}/flights`)

export const addFlight = (data: Flight) => axios
.post(`${JSON_SERVER_API}/flights`, data)

export const getFlight = (id: number|string) => axios
.get(`${JSON_SERVER_API}/flights/${id}`)

export const updateFlight = (id: number|string, data: Flight) => axios
.put(`${JSON_SERVER_API}/flights/${id}`, data)

export const deleteFlight = (id: number) => axios
.delete(`${JSON_SERVER_API}/flights/${id}`)
