import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import Modal from "../Modal";
import Button from "../Button";
import ActiveLink from "../ActiveLink";
import ProfileSetting from "../ProfileSetting";

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

export default ({ handleLogout, ...props }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    return (
        <motion.ul variants={{ variants }} className='sidebar__menu'>
            <MenuItem>
                <ActiveLink href='/page' activeClassName='sidebar__link--active'>
                    <a className='sidebar__link'>Page</a>
                </ActiveLink>
            </MenuItem>
            <MenuItem>
                <ActiveLink href='/message' activeClassName='sidebar__link--active'>
                    <a className='sidebar__link'>Message</a>
                </ActiveLink>
            </MenuItem>
            <MenuItem>
                <ActiveLink href='/contact' activeClassName='sidebar__link--active'>
                    <a className='sidebar__link'>Contact</a>
                </ActiveLink>
            </MenuItem>
            <MenuItem>
                <ActiveLink href='/profile' activeClassName='sidebar__link--active'>
                    <a className='sidebar__link'>Profile</a>
                </ActiveLink>
            </MenuItem>
            <MenuItem className='sidebar__logout'>
                <Button className='sidebar__link btn--link' onClick={handleLogout}>
                    Log out
                </Button>
            </MenuItem>
            <Modal open={profileOpen} onClose={() => setProfileOpen(false)}>
                {(props) => <ProfileSetting {...props} />}
            </Modal>
            <style jsx>{`
                :global(.sidebar__logout) {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                }
            `}</style>
        </motion.ul>
    );
};
