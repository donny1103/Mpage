export default async function ({ req, res }) {
    const uri = `${process.env.NODE_ENV === "production" ? "https" : "http"}://${req.headers.host}`;

    const userRes = await fetch(`${uri}/api/user`, {
        method: "GET",
        headers: {
            cookie: req?.headers.cookie,
        },
    });

    if (userRes.status === 401) {
        res.writeHead(302, {
            Location: `${uri}/login`,
        });
        res?.end();
    }

    if (res.status === 500) {
        // Todo: handle server error
    }

    const user = await userRes.json();

    return user;
}
