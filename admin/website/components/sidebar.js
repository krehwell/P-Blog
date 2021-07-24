export default function Sidebar({ page }) {
    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-list">
                <ul>
                    <a className={page === "blog-posts" ? "active" : null} href="/">
                        <li>
                            <span>Blog Post</span>
                        </li>
                    </a>
                    <a className={page === "sitemap" ? "active" : null} href="/sitemap">
                        <li>
                            <span>Sitemap</span>
                        </li>
                    </a>

                    <a className={page === "password" ? "active" : null} href="/change-password">
                        <li>
                            <span>Change Password</span>
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    );
}
