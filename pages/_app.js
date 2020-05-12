import React from "react";
import Head from "next/head";
import GlobalProvider from "../components/GlobalProvider";
import GlobalStyles from "../components/GlobalStyles";
import "../style.scss";
import "react-quill/dist/quill.snow.css";

export default function App({ Component, pageProps }) {
    return (
        <GlobalStyles>
            <div className='container'>
                <GlobalProvider>
                    <Component {...pageProps} />
                </GlobalProvider>
                <Head>
                    <link
                        rel='stylesheet'
                        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css'
                        integrity='sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ='
                        crossorigin='anonymous'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
                        rel='stylesheet'
                    ></link>
                </Head>
            </div>
        </GlobalStyles>
    );
}
