import { useRouter } from "next/router";
import logout from "../_api/admin-user/logout.js";

export default function Header() {
    const router = useRouter();

    const requestLogout = () => {
        logout(function () {
            router.push("/login");
        });
    };

    return (
        <div className="header-wrapper">
            <div className="header-logo">
                <a href="/">
                    <span>Admin Dashboard</span>
                </a>
            </div>
            <div onClick={() => requestLogout()} className="header-log-out">
                <span>Logout</span>
            </div>
        </div>
    );
}
