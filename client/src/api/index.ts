import { get, post } from "~/api/fetch";

export const fetchList = async () => {
    const response = await get('/list');
    return JSON.parse(response.data);
}