import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl.js";

export default function login(email, password, callback) {
    axios
        .put(`${apiBaseUrl}/users/login`, { email: email, password: password }, { withCredentials: true })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            callback({ success: false });
        });
}
