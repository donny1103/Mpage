import React, { createContext, useState, useEffect } from "react";
import Notification from "./Notification";

export const GlobalContext = createContext({});

export default (props) => {
    const [notiIsOpend, setNotiOpen] = useState(false);
    const [notiChildren, setNotiChildren] = useState(null);

    const pushNotification = (element) => {
        setNotiChildren(element);
        setNotiOpen(true);
    };

    useEffect(() => {
        const closeNotification = () => setNotiOpen(false);
        if (notiIsOpend) {
            setTimeout(closeNotification, 1500);
        }

        return () => clearTimeout(closeNotification);
    }, [notiIsOpend]);

    return (
        <GlobalContext.Provider value={{ pushNotification }}>
            {props.children}
            <Notification open={notiIsOpend}>{notiChildren}</Notification>
        </GlobalContext.Provider>
    );
};
