import React from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Button from "../../components/Button";
import Card from "../../components/page/Card";
import Layout from "../../components/Layout";
import getServerData from "../../services/getServerData";
import Notification from "../../components/Notification";
import { GlobalContext } from "../../components/GlobalProvider";

function Pages(props) {
    const { user } = React.useContext(GlobalContext);

    const { data: pages } = useSWR(
        "/api/page/list",
        (route) =>
            fetch(route).then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                    Router.replace("/login");
                }
            }),
        {
            initialData: props.pages,
        }
    );

    const [open, setO] = React.useState(false);
    return (
        <Layout>
            <div className='page__create'>
                <Button className='btn btn--blue' onClick={() => setO(!open)}>
                    test
                </Button>
                <Button className='btn btn--blue'>
                    <Link href={`/page/create`}>
                        <a>New Page</a>
                    </Link>
                </Button>
            </div>
            <ul className='page__list'>
                {!!pages &&
                    !!pages.length &&
                    pages.map((page) => (
                        <Link href={`/page/${page._id}/edit`} key={page._id}>
                            <li className='page__list-item'>
                                <Card page={page} user={user} />
                            </li>
                        </Link>
                    ))}
            </ul>
            <Notification open={open}>
                <span style={{ color: "var(--green)" }}>
                    <i className='fas fa-check' /> Saved
                </span>
            </Notification>
            <style jsx>{`
                .page__create {
                    display: flex;
                    justify-content: flex-end;
                    padding: 30px;
                }

                .page__list {
                    display: flex;
                    flex-wrap: wrap;
                    background-color: var(--foreground);
                    border: 0 #fff;
                    border-radius: 5px;
                    background-color: transparent;
                }

                .page__list-item {
                    max-width: calc(50% - 20px);
                    flex: 0 0 calc(50% - 20px);
                    border-radius: 10px;
                    padding: 10px;
                    margin: 10px;
                    background-color: white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    return {
        props: {
            pages: await getServerData(ctx, "/api/page/list"),
            user,
        },
    };
}

export default Pages;
