import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl.js";

export default function logout(callback) {
    axios.put(`${apiBaseUrl}/users/logout`, {}, {withCredentials: true})
        .then((response) => {
            console.log(response);
            callback(response.data);
        }).catch((error) => {
            callback({success: false});
        })
}
