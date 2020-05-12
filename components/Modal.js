import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default (props) => {
    const [container, setContainer] = useState(null);

    useEffect(() => {
        if (props.open) {
            document.body.style.overflow = "hidden";
            const element = document.createElement("div");
            element.classList.add("modal");
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
                        className='modal__dialog'
                        key='modal'
                        initial={{ opacity: 0, height: 0, overflow: "auto" }}
                        animate={{ opacity: 1, height: "70%" }}
                        exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    >
                        {props.children({ onClose: props.onClose, Header, Content, Footer })}
                        <span className='modal__close' onClick={props.onClose}>
                            <i className='fas fa-times' />
                        </span>
                    </motion.div>
                )}
                <style jsx>
                    {`
                        :global(.modal) {
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: rgb(0, 0, 0, 0.5);
                            overflow: auto;
                            z-index: 1000;
                            position: fixed;
                        }
                        :global(.modal__close) {
                            position: absolute;
                            right: 15px;
                            top: 6px;
                            cursor: pointer;
                            font-size: 1.5rem;
                        }
                        :global(.modal__dialog) {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            z-index: 1001;
                            position: relative;
                            background: var(--beige);
                            overflow: auto;
                            width: 50%;
                            height: 70%;
                            padding: 40px;
                        }
                    `}
                </style>
            </AnimatePresence>,
            container
        )
    );
};

function Header(props) {
    return (
        <h3 {...props} className='modal__header'>
            {props.children}
            <style jsx>
                {`
                    .modal__header {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 10px;
                    }
                `}
            </style>
        </h3>
    );
}

function Content(props) {
    return (
        <div {...props} className='modal__content'>
            {props.children}
            <style jsx>
                {`
                    .modal__content {
                        flex-grow: 1;
                        padding-bottom: 20px;
                        width: 100%;
                    }
                `}
            </style>
        </div>
    );
}

function Footer(props) {
    return (
        <div {...props} className='modal__footer'>
            {props.children}
            <style jsx>
                {`
                    .modal__footer {
                        display: flex;
                        justify-content: flex-end;
                        width: 100%;
                    }
                `}
            </style>
        </div>
    );
}
