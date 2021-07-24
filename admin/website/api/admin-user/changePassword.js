import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl.js";

export default function changePassword(currentPassword, newPassword, callback) {
    axios
        .put(
            `${apiBaseUrl}/users/change-password`,
            { currentPassword: currentPassword, newPassword: newPassword },
            { withCredentials: true }
        )
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            callback({ submitError: true });
        });
}
