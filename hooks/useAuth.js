import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Router from "next/router";

export default function useAuth(initialData) {
    const { data: user, mutate } = useSWR(
        "/api/user",
        async (route) => {
            const authRequest = await fetch(route);

            if (authRequest.ok) {
                return authRequest.json();
            } else {
                logout();
            }
        },
        { initialData }
    );

    return {
        ...user,
        logout,
        mutate: () => {
            mutate("/api/user", user);
        },
    };
}

async function logout() {
    await fetch("/api/user/logout", {
        method: "POST",
    });
    Router.replace("/login");
    return;
}
