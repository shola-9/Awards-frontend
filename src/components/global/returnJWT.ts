import Cookies from "js-cookie";

export default function returnJWT() {
  const token = Cookies.get("token");
  if (!token) {
    return null;
  }
  return token;
}
