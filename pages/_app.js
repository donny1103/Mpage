import React from "react";
import Head from "next/head";
import "../style.scss";
import "react-quill/dist/quill.snow.css";

export default function App({ Component, pageProps }) {
    return (
        <div className='container'>
            <Component {...pageProps} />
            <Head>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css'
                    integrity='sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ='
                    crossorigin='anonymous'
                />
            </Head>
        </div>
    );
}
