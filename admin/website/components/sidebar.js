import Link from "next/link";

export default function Sidebar({ page }) {
    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-list">
                <ul>
                    <Link href="/">
                        <a className={page === "blog-posts" ? "active" : null}>
                            <li>
                                <span>Blog Posts</span>
                            </li>
                        </a>
                    </Link>
                    <Link href="/sitemap">
                        <a className={page === "sitemap" ? "active" : null}>
                            <li>
                                <span>Sitemap</span>
                            </li>
                        </a>
                    </Link>
                    <Link href="/change-password">
                        <a className={page === "password" ? "active" : null}>
                            <li>
                                <span>Change Password</span>
                            </li>
                        </a>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
