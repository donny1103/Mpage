import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../../../components/Button";
import getServerData from "../../../services/getServerData";

const variants = {
    enter: (direction) => ({
        x: direction < 0 ? 100 : -100,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0,
    }),
};

function PageView(props) {
    const [videoHeight, setVideoHeight] = useState((800 * 9) / 16);
    const [[pageNum, direction], setPage] = useState([0, 0]);
    const [mediaList, setMediaList] = useState([]);
    const videoRef = useRef();

    const router = useRouter();
    const pageId = router.query.id;

    const { data: page } = useSWR(`/api/page/${pageId}`, (route) => fetch(route).then((r) => r.ok && r.json()), {
        initialData: props.page,
    });

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (props.page) {
            setMediaList(props.page?.media || []);
        }
    }, [props.page]);

    const handleResize = () => {
        const videoWidth = videoRef.current && videoRef.current.offsetWidth;
        setVideoHeight((videoWidth * 9) / 16);
    };

    const paginate = (newDirection) => {
        const nextPage = pageNum + newDirection;
        const newPage = nextPage > mediaList.length - 1 ? 0 : nextPage < 0 ? mediaList.length - 1 : nextPage;
        setPage([newPage, newDirection]);
    };

    const mediaItem = mediaList.length ? mediaList[pageNum] : "";
    const motionProps = {
        key: pageNum,
        src: mediaItem.src,
        custom: direction,
        variants: variants,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: {
            x: { type: "spring", stiffness: 300, damping: 200, duration: 0.2 },
            opacity: { duration: 0.2 },
        },
    };

    return (
        <div className='page'>
            <div className='page__top-buttons'>
                <div>
                    <Link href='/page'>
                        <a>
                            <Button className='btn'>Back</Button>
                        </a>
                    </Link>
                </div>
                <div>
                    <Link href={`/page/${props.page?._id}`}>
                        <a>
                            <Button className='btn btn--blue'>Share</Button>
                        </a>
                    </Link>
                </div>
            </div>

            {Boolean(mediaList.length) && (
                <div className='media' ref={videoRef}>
                    <AnimatePresence initial={false} custom={direction}>
                        {mediaItem && mediaItem.type === "video" && (
                            <motion.iframe
                                {...motionProps}
                                type='text/html'
                                style={{ height: videoHeight }}
                                className='media__slide-show'
                                width='100%'
                                frameBorder='0'
                            />
                        )}
                        {mediaItem.type === "image" && <motion.img {...motionProps} className='media__slide-show' />}
                    </AnimatePresence>
                    <i
                        className='fas fa-chevron-left  media__control media__control--prev'
                        onClick={() => paginate(-1)}
                    />
                    <i
                        className='fas fa-chevron-right media__control media__control--next'
                        onClick={() => paginate(1)}
                    />
                </div>
            )}
            <div className='view__title'>{page.title}</div>

            <div className='view__body' dangerouslySetInnerHTML={{ __html: page.body }} />
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const data = await getServerData(ctx, `/api/page/${ctx.query.id}`);
    if (!data) {
        ctx.res.statusCode = 404;
        ctx.res.end();
    }
    return {
        props: {
            page: await getServerData(ctx, `/api/page/${ctx.query.id}`),
        },
    };
}

export default PageView;
