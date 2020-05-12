import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default (props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const handleClick = (e) => {
        const isClickInSide = ref.current?.contains(e.target);
        if (isClickInSide) {
            return;
        } else if (isClickInSide === undefined) {
            document?.removeEventListener("mousedown", handleClick, false);
        } else {
            setOpen(false);
        }
    };

    useEffect(() => {
        document?.addEventListener("mousedown", handleClick, false);
    });

    const Ul = (props) => {
        return (
            <AnimatePresence>
                {open && (
                    <motion.ul
                        ref={ref}
                        className='dropdown__list'
                        key='dropdown'
                        initial={{ opacity: 0, maxHeight: 500 }}
                        animate={{ opacity: 1, maxHeight: 500 }}
                        exit={{ opacity: 0, maxHeight: 500 }}
                        onClick={handleClick}
                    >
                        {props.children}
                    </motion.ul>
                )}
            </AnimatePresence>
        );
    };

    return (
        <div {...props}>
            {props.children({ Ul, Li, setOpen })}
            <style jsx>
                {`
                    :global(.dropdown__list) {
                        position: absolute;
                        background: var(--beige);
                        overflow: auto;
                        min-width: 90px;
                        max-height: 500px;
                        padding: 10px;
                        border-radius: 5px;
                        z-index: 1000;
                        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
                        transform: translate(-40%, 5px);
                    }

                    :global(.dropdown__list-item) {
                        font-size: 0.6rem;
                        color: var(--black);
                        cursor: pointer;
                        padding: 3px 0;
                    }
                `}
            </style>
        </div>
    );
};

function Li(props) {
    return (
        <li {...props} className='dropdown__list-item'>
            {props.children}
        </li>
    );
}
