import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default (props) => {
    const [container, setContainer] = useState(null);

    useEffect(() => {
        if (props.open) {
            document.body.style.overflow = "hidden";
            const element = document.createElement("div");
            element.classList.add("notification");
            document.body.appendChild(element);
            setContainer(element);
            return () => {
                setTimeout(() => {
                    element.remove();
                    document.body.style.overflow = "auto";
                }, 300);
            };
        }
    }, [props.open]);

    return (
        container &&
        ReactDOM.createPortal(
            <AnimatePresence>
                {props.open && (
                    <motion.div
                        className='notification__content'
                        key='notification'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {props.children}
                    </motion.div>
                )}
                <style jsx>
                    {`
                        :global(.notification) {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 10px;
                            position: fixed;
                            top: 20px;
                            left: 50%;
                            font-size: 0.7rem;
                            font-weight: 600;
                            z-index: 1000;
                            min-width: 100px;
                            min-height: 40px;
                            background-color: white;
                            border-radius: 5px;
                            box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.3);
                        }
                        :global(.notification__close) {
                            position: absolute;
                            right: 15px;
                            top: 6px;
                            cursor: pointer;
                            font-size: 0.8rem;
                        }
                        :global(.notification__content) {
                            position: relative;
                            height: 100%;
                            width: 100%;
                            text-align: center;
                        }
                    `}
                </style>
            </AnimatePresence>,
            container
        )
    );
};
