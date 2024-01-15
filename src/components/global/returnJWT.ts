import Cookies from "js-cookie";

export default function returnJWT() {
  const token = Cookies.get("token");
  if (!token) {
    console.log("token not found");

    return null;
  }
  return token;
}
