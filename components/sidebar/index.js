import React, { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import Menu from "./Menu";
import HamBurgerButton from "./HamBurgerButton";

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

function Sidebar({ user }) {
    const [isOpen, toggleOpen] = useCycle(false, true);

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
            <HamBurgerButton onClick={() => toggleOpen()} />
            <div className='sidebar__account'>
                {user.profilePictureUrl && (
                    <div className='sidebar__profile'>
                        <img
                            src={user.profilePictureUrl}
                            alt='img'
                            className='sidebar__profile-picture'
                        />
                    </div>
                )}
                {user && (
                    <div className='sidebar__profile-name'>
                        {user.name ? user.name : user.email}
                    </div>
                )}
            </div>
            <Menu
                handleLogout={() => {
                    user?.logout();
                    setOpen(false);
                }}
            />
            <style jsx>{`
                :global(.sidebar) {
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: var(--sidebar-width);
                    background-color: var(--black);
                    padding: 24px 0;
                    display: flex;
                    flex-direction: column;
                    z-index: 1000;
                    position: fixed;
                }

                :global(.sidebar__account) {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    color: var(--beige);
                    margin: 50px 0 20px 0;
                    text-align: center;
                    flex-direction: column;
                }

                :global(.sidebar__profile) {
                    min-width: 80px;
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                    margin-bottom: 20px;
                }

                :global(.sidebar__profile-picture) {
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    overflow: hidden;
                    max-width: 100%;
                }

                :global(.sidebar__profile-name) {
                    position: relative;
                    padding: 0 40px 0 10px;
                    width: 100%;
                    font-size: 0.8rem;
                    word-break: break-word;
                    color: var(--beige);
                }

                :global(.sidebar__setting-trigger) {
                    position: absolute;
                    right: 15px;
                    top: 0;
                    color: var(--grey);
                }

                :global(.sidebar__menu) {
                    position: relative;
                    padding: 0px 0 48px 0;
                    margin: 0;
                    z-index: 1;
                    flex: 1 0 0;
                    display: flex;
                    flex-direction: column;
                }

                :global(.sidebar__menu-item) {
                    color: var(--beige);
                }

                :global(.sidebar__link) {
                    line-height: 32px;
                    font-size: 15px;
                    display: block;
                    color: inherit;
                    padding: 8px 8px 8px 20px;
                    text-decoration: none;
                    width: 100%;
                }

                :global(.sidebar__link--active) {
                    font-weight: 700;
                    color: #ffffff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    background-color: var(--red);
                }

                :global(.sidebar__menu-button) {
                    outline: none;
                    border: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    cursor: pointer;
                    position: absolute;
                    top: 18px;
                    left: 15px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: transparent;
                }
            `}</style>
        </motion.nav>
    );
}

export default Sidebar;
