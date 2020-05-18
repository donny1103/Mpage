import React, { useEffect, useState, useRef } from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import { mutate } from "swr";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Modal from "../../components/Modal";
import Upload from "../../components/Upload";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Editor from "../Editor";
import ToolBar from "./ToolBar";
import MediaList from "./MediaList";

const variants = {
    enter: (direction) => ({
        x: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
};

export default (props) => {
    const [videoHeight, setVideoHeight] = useState((800 * 9) / 16);
    const [[pageNum, direction], setPage] = useState([0, 0]);
    const [mediaList, setMediaList] = useState([]);
    const [photos, setPhotos] = useState(props.photos || []);
    const [videos, setVideos] = useState(props.videos || []);
    const [modalOpened, setModalState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState("");

    const title = useRef();
    const videoRef = useRef();

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (props.page) {
            title.current.value = props.page.title || "";
            setMediaList(props.page.media || []);
            setBody(props.page.body);
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

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const array = [...mediaList];
        const startIndex = newIndex < 0 ? array.length + newIndex : newIndex;
        const item = array.splice(oldIndex, 1)[0];
        array.splice(startIndex, 0, item);
        setMediaList(array);
    };

    const handleAddMediaToPage = async (media) => {
        const response = await fetch(`/api/page/${props.page._id}/addMedia`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(media),
        });

        const newMedia = await response.json();

        if (response.ok) {
            const page = { ...props.page, media: [...props.page.media, newMedia] };
            mutate(`/api/page/${props.page._id}`, page);
        }
    };

    const handleDeleteMediaFromPage = async (mediaId) => {
        const newMedia = await fetch(`/api/page/${props.page._id}/removeMedia`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mediaId }),
        });

        if (newMedia.ok) {
            const page = { ...props.page, media: props.page.media.filter((id) => id !== mediaId) };
            mutate(`/api/page/${props.page._id}`, page);
        }
    };

    const handleAddMediaToUser = async (media) => {
        const response = await fetch(`/api/media/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(media),
        });

        if (response.ok) {
            const newMedia = await response.json();

            const mediaObj = props.media;
            if (media.type === "image") {
                mediaObj.photos.push(newMedia);
            } else if (media.type === "video") {
                mediaObj.videos.push(newMedia);
            }
            mutate(`/api/media/list`, mediaObj);
        }
    };

    const handleDeleteMediaFromUser = async (id) => {
        const response = await fetch(`/api/media/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            const deletedMedia = await response.json();
            let newPhotos = newPhotos;
            let newVideos = videos;

            if (deletedMedia.type === "image") {
                newPhotos = photos.filter((m) => m._id !== id);
            } else if (deletedMedia.type === "video") {
                newVideos = videos.filter((m) => m._id !== id);
            }

            mutate(`/api/media/list`);
        }
    };

    const handleBodyChange = (value) => setBody(value);

    const handleSubmit = async () => {
        setLoading(true);
        const data = {
            title: title.current.value,
            body,
            media: mediaList,
        };

        if (typeof props.handleSubmit === "function") {
            await props.handleSubmit(data);
        }
        setLoading(false);
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
            x: { type: "spring", stiffness: 300, damping: 200, duration: 0.3 },
            opacity: { duration: 0.3 },
        },
    };

    return (
        <div className='page'>
            <Form className='page__form' onSubmit={handleSubmit}>
                <div className='page__top-buttons'>
                    <div>
                        <Button type='button' className='btn' onClick={Router.back}>
                            Back
                        </Button>
                    </div>
                    <div>
                        <Link href={`/page/${props.page?._id}`}>
                            <a>
                                <Button type='button' className='btn btn--blue'>
                                    Preview
                                </Button>
                            </a>
                        </Link>

                        <Button className='btn btn--green' type='submit' loading={loading}>
                            Save
                        </Button>
                    </div>
                </div>

                <div className='media' ref={videoRef}>
                    {Boolean(mediaList.length) ? (
                        <>
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
                                {mediaItem.type === "image" && (
                                    <div className='meida__slide'>
                                        <motion.figure
                                            {...motionProps}
                                            className='media__image'
                                            style={{ backgroundImage: `url(${mediaItem.src})` }}
                                        />
                                    </div>
                                )}
                            </AnimatePresence>
                            <i
                                className='fas fa-chevron-left  media__control media__control--prev'
                                onClick={() => paginate(-1)}
                            />
                            <i
                                className='fas fa-chevron-right media__control media__control--next'
                                onClick={() => paginate(1)}
                            />
                        </>
                    ) : (
                        <div className='media__placeholder'>
                            Click the buttons below to start adding Videos, Images, YouTube
                        </div>
                    )}
                </div>

                <Input ref={title} placeholder='Title' className='edit__title' />
                <Editor value={body} onChange={handleBodyChange} placeholder='Body' className='edit__body' />
                <Modal open={modalOpened} onClose={() => setModalState(false)}></Modal>
            </Form>
            <ToolBar
                tabs={{
                    sort: {
                        list: mediaList,
                        handleAdd: handleAddMediaToPage,
                        handleDelete: handleDeleteMediaFromPage,
                    },
                    photos: {
                        list: photos,
                        handleAdd: handleAddMediaToUser,
                        handleDelete: handleDeleteMediaFromUser,
                    },
                    videos: {
                        list: videos,
                        handleAdd: handleAddMediaToUser,
                        handleDelete: handleDeleteMediaFromUser,
                    },
                }}
            >
                {(tab) => <MediaList list={tab.list} onSortEnd={onSortEnd} handleDelete={tab.handleDelete} />}
            </ToolBar>

            <style jsx>{`
                .page {
                    display: flex;
                }

                :global(.page__form) {
                    max-width: 800px;
                    margin: 0 20px;
                    background-color: var(--foreground);
                    display: block !important;
                    padding: 20px;
                }

                .page__top-buttons {
                    background: #fff;
                    height: 64px;
                    padding: 8px 16px;
                    margin-bottom: 20px;
                    width: 100%;
                    z-index: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: var(--main-width);
                }

                :global(.media) {
                    min-height: 350px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #ffffff;
                    flex-direction: column;
                    position: relative;
                    z-index: 0;
                    margin-bottom: 30px;
                }

                :global(.media__slide-show) {
                    position: absolute;
                    max-height: 100%;
                    max-width: 100%;
                    width: auto;
                    height: auto;
                }

                :global(.media__image) {
                    cursor: pointer;
                    padding-bottom: 56.25%;
                    height: 0;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-color: #25354a;
                    background-position: 50%;
                    position: relative;
                }

                .meida__slide {
                    height: 100%;
                    width: 100%;
                }

                .media__control {
                    position: absolute;
                    font-size: 3rem;
                    color: var(--black);
                    z-index: 1;
                }
                .media__control--prev {
                    left: 0;
                }

                .media__control--next {
                    right: 0;
                }

                .media__gallery {
                    position: absolute;
                    bottom: 0;
                    height: 0;
                    width: 100%;
                    background: var(--black);
                    padding: 10px 5px;
                    height: 0;
                    z-index: 2;
                    display: flex;
                    overflow-y: hidden;
                    overflow-x: auto;
                    align-items: center;
                }
                .media__gallery--open {
                    visibility: visible;
                    height: 50%;
                    transition: all 0.4s ease;
                }

                .media__gallery--open li {
                    display: inline-block;
                }

                .media__gallery--closed {
                    visibility: hidden;
                    height: 0;
                    transition: all 0.4s ease;
                }

                .media__gallery--closed li {
                    display: none;
                }

                .media__gallery-item {
                    display: inline-block;
                    margin: 5px;
                    border: 3px solid white;
                    border-radius: 5px;
                    height: 150px;
                    cursor: grab;
                    position: relative;
                }

                .media__gallery-image {
                    height: 100%;
                    width: auto;
                }

                .media__gallery-item--dragging {
                    height: 140px !important;
                    transition: height 0.1s linear;
                    height: 140px !important;
                    cursor: e-resize !important;
                }

                .media__gallery-item-delete {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    right: 2px;
                    top: 2px;
                    color: #ffffff;
                    background-color: var(--red);
                    border-radius: 50%;
                    height: 25px;
                    width: 25px;
                }

                .media__placeholder {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--dark-grey);
                    color: #ffffff;
                    height: 100%;
                    width: 100%;
                    min-height: 400px;
                }

                :global(.edit) {
                    background: #ffffff;
                    padding: 32px;
                    min-height: 300px;
                }

                :global(.edit__title) {
                    height: 48px;
                    font-size: 20px !important;
                    font-weight: 600 !important;
                    line-height: 48px;
                }

                :global(.edit__body) {
                    margin-top: 30px;
                }
            `}</style>
        </div>
    );
};
