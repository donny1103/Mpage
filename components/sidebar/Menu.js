import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import Modal from "../Modal";
import Button from "../Button";
import ProfileSetting from "../ProfileSetting";

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

export default ({ pathname }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    return (
        <motion.ul variants={variants} className='sidebar__menu'>
            <MenuItem active={pathname.indexOf("/page") > -1}>
                <Link href={`/page`}>
                    <a className='sidebar__link'>Page</a>
                </Link>
            </MenuItem>
            <MenuItem active={pathname.indexOf("/message") > -1}>
                <Link href={`/message`}>
                    <a className='sidebar__link'>Message</a>
                </Link>
            </MenuItem>
            <MenuItem active={pathname.indexOf("/contact") > -1}>
                <Link href={`/contact`}>
                    <a className='sidebar__link'>Contact</a>
                </Link>
            </MenuItem>
            <MenuItem>
                <Button className='sidebar__link btn--link' onClick={() => setProfileOpen(true)}>
                    Profile
                </Button>
            </MenuItem>
            <Modal open={profileOpen} onClose={() => setProfileOpen(false)}>
                {(props) => <ProfileSetting {...props} />}
            </Modal>
        </motion.ul>
    );
};
