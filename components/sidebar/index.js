import React, { useRef, useState, useContext } from "react";
import { useRouter } from "next/router";
import { motion, useCycle } from "framer-motion";
import Menu from "./Menu";
import ToggleButton from "./ToggleButton";
import Dropdown from "../Dropdown";
import Modal from "../Modal";
import { UserContext } from "../Layout";
import ProfileSetting from "../ProfileSetting";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 100,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(25px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

function Sidebar() {
    const user = useContext(UserContext);
    const { pathname } = useRouter();
    const [isOpen, toggleOpen] = useCycle(false, true);
    const [profileOpen, setProfileOpen] = useState(false);

    const ref = useRef(null);
    const height = ref.current?.offsetHeight || 1000;

    return (
        <motion.nav
            initial={false}
            variants={sidebar}
            animate={isOpen ? "open" : "closed"}
            className='sidebar'
            custom={height}
            ref={ref}
        >
            <ToggleButton onClick={() => toggleOpen()} />
            <div className='sidebar__account'>
                {user?.profilePictureUrl && (
                    <div className='sidebar__profile'>
                        <img src={user.profilePictureUrl} alt='img' className='sidebar__profile-picture' />
                    </div>
                )}
                {user && (
                    <div className='sidebar__profile-name'>
                        {user.name ? user.name : user.email}
                        <Dropdown className='sidebar__setting-trigger'>
                            {({ Ul, Li, setOpen }) => (
                                <>
                                    <i className='fas fa-chevron-down ' onClick={() => setOpen(true)} />
                                    <Ul>
                                        <Li onClick={() => setProfileOpen(true)}>My Profile</Li>
                                        <Li
                                            onClick={() => {
                                                user?.logout();
                                                setOpen(false);
                                            }}
                                        >
                                            Log out
                                        </Li>
                                    </Ul>
                                </>
                            )}
                        </Dropdown>
                    </div>
                )}
            </div>
            <Menu pathname={pathname} />
            <Modal open={profileOpen} onClose={() => setProfileOpen(false)}>
                {(props) => <ProfileSetting {...props} />}
            </Modal>
        </motion.nav>
    );
}

export default Sidebar;
