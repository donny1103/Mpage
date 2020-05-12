import Page from "../../components/page/index";
import Layout from "../../components/Layout";
import auth from "../../services/auth";
import Router from "next/router";

const PageCreate = (props) => {
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
            <Page handleSubmit={handleSubmit} />
        </Layout>
    );
};

export async function getServerSideProps(ctx) {
    await auth(ctx);
    return {
        props: {},
    };
}

export default PageCreate;
