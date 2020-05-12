import fetch from "isomorphic-unfetch";
export default async function ({ req, res }, apiPath) {
    const uri = `${process.env.NODE_ENV === "production" ? "https" : "http"}://${req.headers.host}`;

    try {
        const dataResponse = await fetch(`${uri}${apiPath}`, {
            method: "GET",
            headers: {
                cookie: req.headers.cookie,
            },
        });

        if (dataResponse.status === 401) {
            res.writeHead(302, {
                Location: `${uri}/login`,
            });
            res.end();
            return null;
        }

        if (dataResponse.status === 404) {
            res.statusCode = 404;
            res.end();
            return null;
        }

        if (dataResponse.ok) {
            const json = await dataResponse.json();
            return JSON.parse(JSON.stringify(json));
        } else {
            return null;
        }
    } catch (e) {
        res.status(500).end();
        return null;
    }
}
