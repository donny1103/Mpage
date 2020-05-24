import React, { useContext } from "react";
import Page from "../../../components/page/index";
import useSWR, { mutate } from "swr";
import Layout from "../../../components/Layout";
import getServerData from "../../../services/getServerData";
import useAuth from "../../../hooks/useAuth";
import { GlobalContext } from "../../../components/GlobalProvider";

const PageEdit = (props) => {
    const user = useAuth(props.user);
    const pageId = props.page._id;
    const { pushNotification } = useContext(GlobalContext);

    const { data: page } = useSWR(
        `/api/page/${pageId}`,
        (route) => fetch(route).then((r) => r.ok && r.json()),
        {
            initialData: props.page,
        }
    );

    const {
        data: { photos, vidoes },
    } = useSWR(`/api/media/list`, (route) => fetch(route).then((r) => r.ok && r.json()), {
        initialData: props.media,
    });

    const handleSubmit = async (data) => {
        const page = await fetch(`/api/page/${pageId}/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, id: pageId }),
        });

        if (page.ok) {
            mutate(`/api/page/${pageId}`, data);

            pushNotification(
                <span style={{ color: "var(--green)" }}>
                    <i className='fas fa-check' /> Saved
                </span>
            );
        }
    };

    return (
        <Layout user={user}>
            <Page page={page} photos={photos} vidoes={vidoes} handleSubmit={handleSubmit} />
        </Layout>
    );
};

export async function getServerSideProps(ctx) {
    return {
        props: {
            page: await getServerData(ctx, `/api/page/${ctx.query.id}/edit`),
            user: await getServerData(ctx, "/api/user"),
            media: await getServerData(ctx, "/api/media/list"),
        },
    };
}

export default PageEdit;
