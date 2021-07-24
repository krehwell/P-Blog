import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl.js";

export default function removeAdminUserCookie() {
    axios
        .put(`${apiBaseUrl}/users/remove-admin-user-cookie`, {}, { withCredentials: true })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return;
        });
}
