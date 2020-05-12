import React, { useEffect, useState, useRef } from "react";
import Router from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SortableList from "../../components/SortableList";
import Modal from "../../components/Modal";
import Upload from "../../components/Upload";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Editor from "../Editor";

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
    const [isGalleryOpened, setGalleryOpen] = useState(false);
    const [videoHeight, setVideoHeight] = useState((800 * 9) / 16);
    const [[pageNum, direction], setPage] = useState([0, 0]);
    const [mediaList, setMediaList] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
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

    const onSortStart = () => setIsDragging(true);
    const onSortEnd = ({ oldIndex, newIndex }) => {
        const array = [...mediaList];
        const startIndex = newIndex < 0 ? array.length + newIndex : newIndex;
        const item = array.splice(oldIndex, 1)[0];
        array.splice(startIndex, 0, item);
        setMediaList(array);
        setIsDragging(false);
    };

    const handleAddMedia = (list = []) => {
        setMediaList([...mediaList, ...list]);
        setModalState(false);
    };

    const handleDeleteMedia = (mediaIndex) => {
        const filteredList = mediaList.filter((_, index) => index !== mediaIndex);
        setMediaList(filteredList);
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
            x: { type: "spring", stiffness: 300, damping: 200, duration: 0.2 },
            opacity: { duration: 0.2 },
        },
    };

    return (
        <Form className='page' onSubmit={handleSubmit}>
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
                                <motion.img {...motionProps} className='media__slide-show' />
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

                <SortableList axis='xy' onSortEnd={onSortEnd} onSortStart={onSortStart} pressDelay={300}>
                    {(SortableItem) => (
                        <ul
                            className={`media__gallery ${
                                isGalleryOpened ? "media__gallery--open" : "media__gallery--closed"
                            }`}
                        >
                            {mediaList.map(({ src }, index) => (
                                <SortableItem index={index} key={`gallery-${index}`}>
                                    <li
                                        className={`media__gallery-item ${
                                            isDragging ? "media__gallery-item--dragging" : ""
                                        }`}
                                    >
                                        <img
                                            className='media__gallery-image'
                                            src={src}
                                            alt=''
                                            style={{ maxHeight: 150 }}
                                        />
                                        <div className='media__gallery-item-delete'>
                                            <i className='fas fa-times' onClick={() => handleDeleteMedia(index)} />
                                        </div>
                                    </li>
                                </SortableItem>
                            ))}
                        </ul>
                    )}
                </SortableList>
            </div>

            <div className='icons'>
                <i className='fab fa-youtube' />
                <i className='far fa-image' onClick={() => setModalState(true)} />
                <i
                    className={`fas fa-th-large toggle__gallery ${isGalleryOpened ? "toggle__gallery--active" : ""}`}
                    onClick={() => setGalleryOpen(!isGalleryOpened)}
                />
                <i className='fas fa-cloud-upload-alt' onClick={() => setModalState(true)} />
            </div>

            <Input ref={title} placeholder='Title' className='edit__title' />
            <Editor value={body} onChange={handleBodyChange} placeholder='Body' className='edit__body' />
            <Modal open={modalOpened} onClose={() => setModalState(false)}>
                {(props) => <Upload handleAddMedia={handleAddMedia} {...props} />}
            </Modal>
        </Form>
    );
};
