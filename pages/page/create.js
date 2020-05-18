import useSWR from "swr";
import getServerData from "../../services/getServerData";
import Page from "../../components/page/index";
import Layout from "../../components/Layout";
import Router from "next/router";

const PageCreate = (props) => {
    const { data: media } = useSWR(`/api/media/list`, (route) => fetch(route).then((r) => r.ok && r.json()), {
        initialData: props.media,
    });

    const handleSubmit = async (data) => {
        const page = await fetch("/api/page/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const pageObj = await page.json();

        if (page.ok) {
            Router.push(`/page/${pageObj._id}`);
        }
    };

    return (
        <Layout>
            <Page handleSubmit={handleSubmit} {...media} />
        </Layout>
    );
};

export async function getServerSideProps(ctx) {
    return {
        props: { media: await getServerData(ctx, "/api/media/list") },
    };
}

export default PageCreate;
