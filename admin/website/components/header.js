import { useRouter } from "next/router";
import Link from "next/link";

import logout from "../api/admin-user/logout.js";

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
                <Link href="/">
                    <a>
                        <span>Admin Dashboard</span>
                    </a>
                </Link>
            </div>
            <div onClick={() => requestLogout()} className="header-log-out">
                <span>Logout</span>
            </div>
        </div>
    );
}
