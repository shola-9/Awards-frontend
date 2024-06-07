import { NominationForm } from "../typesAndInterfaces/nominationForm";
import Cookies from "js-cookie";

async function nominationFn({ formData }: { formData: NominationForm }) {
  const token = Cookies.get("token");

  const url = "https://e-awards.ooshinfo.com/api/v1/nominate";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  // check for if res fails
  if (!res.ok) {
    const exactErrorMsg = await res.json();
    throw new Error(
      `Request failed with status ${res.status}, ${exactErrorMsg.message}`
    );
  }

  // get good res at this stage
  const data = await res.json();

  return data;
}
export default nominationFn;
