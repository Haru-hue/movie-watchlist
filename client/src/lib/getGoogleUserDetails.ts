import axios from "axios";

export default async function getGoogleUserDetails(user: any) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          Accept: "application/json",
        },
      }
    );
    const userData = await response.data;
    return userData;
  } catch (e) {
    console.error(e);
  }
}
