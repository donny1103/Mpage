import React from "react";
import { motion } from "framer-motion";

export default ({ children, ...props }) => {
    return (
        <motion.li
            variants={{
                open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        y: { stiffness: 1000, velocity: -100 },
                    },
                },
                closed: {
                    y: 50,
                    opacity: 0,
                    transition: {
                        y: { stiffness: 1000 },
                    },
                },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`sidebar__menu-item ${props?.className}`}
        >
            {children}
        </motion.li>
    );
};
