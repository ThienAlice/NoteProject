import { GRAPHQL_URL } from "./constantRequest";

export const GrapQLrequest = async (payload, option = {}) => {
  if (localStorage.getItem("access_token")) {
    const res = await fetch(`${GRAPHQL_URL}/grapql`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")} `,
        ...option,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      if (res.status === 400) {
        return null;
      }
    }
    const { data } = await res.json();
    return data;
  }
  return null;
};
