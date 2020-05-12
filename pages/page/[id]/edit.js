import Page from "../../../components/page/index";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import getServerData from "../../../services/getServerData";

const PageEdit = (props) => {
    const router = useRouter();
    const pageId = router.query.id;

    const { data: page } = useSWR(`/api/page/${pageId}`, (route) => fetch(route).then((r) => r.ok && r.json()), {
        initialData: props.page,
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
            await mutate(`/api/page/${router.query.id}`, page.json());
        }
    };

    return (
        <Layout>
            <Page page={page} handleSubmit={handleSubmit} />
        </Layout>
    );
};

export async function getServerSideProps(ctx) {
    return {
        props: {
            page: await getServerData(ctx, `/api/page/${ctx.query.id}/edit`),
        },
    };
}

export default PageEdit;
