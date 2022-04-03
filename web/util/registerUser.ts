import { api } from "./api";

export async function registerUser(idToken: string) {
  try {
    const result = await api({
      url: "/auth/create",
      method: "POST",
      data: {
        authToken: idToken,
      },
    });
    return result.data;
  } catch (err) {
    return err;
  }
}
