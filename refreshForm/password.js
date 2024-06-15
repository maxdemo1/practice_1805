import axios from "axios";
import queryString from "query-string";
const form = document.querySelector(".passwordRestore");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const parsed = queryString.parse(location.search);
  console.log(parsed);
  const newPassword = e.target.elements.newPassword.value;
  try {
    await axios.post(
      "http://localhost:3001/api/users/refresh/password/new",
      {
        password: newPassword,
      },
      { headers: { Authorization: `Bearer ${parsed.token}` } }
    );
  } catch (error) {
    console.log(error);
  }
});
