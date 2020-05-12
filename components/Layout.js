import React from "react";
import Sidebar from "./sidebar/";

export default ({ children }) => {
    return (
        <>
            <Sidebar />
            <main className='main'>
                {children}
                <style jsx>{`
                    .main {
                        padding: 12px 12px 12px 212px;
                        width: 100%;
                        min-height: 100vh;
                        background-color: var(--beige);
                    }
                `}</style>
            </main>
        </>
    );
};
