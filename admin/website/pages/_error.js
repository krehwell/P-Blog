export default function Error({ statusCode }) {
    return (
        <div className="layout-wrapper">
            <div className="error-page-wrapper">
                {statusCode === 404 ? (
                    <div className="error-page-msg">
                        <span>404 Page Not Found</span>
                    </div>
                ) : null}
                {statusCode === 500 ? (
                    <div className="error-page-msg">
                        <span>500 Error</span>
                    </div>
                ) : null}
                {statusCode !== 404 && statusCode !== 500 ? (
                    <div className="error-page-msg">
                        <span>An Error Occurred</span>
                    </div>
                ) : null}
            </div>
            <div className="error-page-msg">
                <a href="/">Go Home 🏠</a>
            </div>
        </div>
    );
}

export async function getInitialProps({ req, res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return {
        statusCode: statusCode,
    };
}
