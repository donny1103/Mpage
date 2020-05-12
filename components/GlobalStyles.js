export default ({ children }) => (
    <>
        {children}
        <style global jsx>{`
            :root {
                --background: #ffffff;
                --foreground: #ffffff;
                --grey: #d3d3d3;
                --red: #da2d2d;
                --yellow: #f9dc5c;
                --gold: #d5a95a;
                --green: #43aa8b;
                --blue: #0a2462;
                --purple: #6c4780;
                --black: #272822;
                --beige: #f7f9fa;
                --dark-grey: #494949;
                --cadet: #2b2d42;

                --border-radius: 0.5rem;
                --main-width: 1024px;
                --sidebar-width: 200px;
            }

            body {
                margin: 0;
                padding: 0;
                font-family: "Poppins-Regular", sans-serif;
                min-height: 100vh;
                height: 100vh;
                overflow-y: auto;
                background: var(--background);
            }

            * > * {
                box-sizing: border-box;
            }

            h1,
            h2,
            h3,
            h4,
            h5 {
                margin: 0;
                padding: 0;
                font-family: "Poppins", sans-serif;
            }

            a {
                text-decoration: none;
                color: inherit;
            }

            textarea {
                font: 400 13.3333px Arial;
            }

            ul {
                display: block;
                margin-block-start: 0;
                margin-block-end: 0;
                margin-inline-start: 0;
                margin-inline-end: 0;
                padding-inline-start: 0;
            }

            li {
                list-style: none;
            }

            i {
                cursor: pointer;
            }

            figure {
                display: block;
                margin-block-start: 0;
                margin-block-end: 0;
                margin-inline-start: 0;
                margin-inline-end: 0;
            }

            /* Fonts */
            font-family: "Poppins", sans-serif;
        `}</style>
    </>
);
