import React, { useState, useRef, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";

export default (props) => {
    const [activeTab, setActiveTab] = useState("sort");
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMedia, seletctMedia] = useState([]);

    const toolSelectedMedia = {
        list: selectedMedia,
        toggle: (mediaId) => {
            let list;
            if (selectedMedia.includes(mediaId)) {
                list = selectedMedia.filter((id) => id !== mediaId);
            } else {
                list = [...selectedMedia, mediaId];
            }
            seletctMedia(list);
        },
    };

    const url = useRef();
    const tab = props.tabs[activeTab];
    const toolbarRef = useRef();
    const handleResize = () => {
        const toolbarWidth = toolbarRef.current?.offsetWidth;

        if (toolbarWidth <= 400) {
        } else {
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='toolbar' ref={toolbarRef}>
            <div className='toolbar__tab'>
                <div
                    className={`toolbar__tab-item ${
                        activeTab === "sort" ? "toolbar__tab-item--active" : ""
                    }`}
                    onClick={() => setActiveTab("sort")}
                >
                    <i className={`fas fa-th-large toolbar__icon`} />
                    <span className='toolbar__tab-item-text'>Sort</span>
                </div>
                <div
                    className={`toolbar__tab-item ${
                        activeTab === "photos" ? "toolbar__tab-item--active" : ""
                    }`}
                    onClick={() => setActiveTab("photos")}
                >
                    <i className='far fa-image toolbar__icon' />
                    <span className='toolbar__tab-item-text'>Photos</span>
                </div>
                <div
                    className={`toolbar__tab-item ${
                        activeTab === "videos" ? "toolbar__tab-item--active" : ""
                    }`}
                    onClick={() => setActiveTab("videos")}
                >
                    <i className='fab fa-youtube toolbar__icon' />
                    <span className='toolbar__tab-item-text'>Videos</span>
                </div>
            </div>

            {!isEditing ? (
                <Button
                    className='btn btn--blue toolbar__edit-btn'
                    onClick={() => setIsEditing(true)}
                >
                    <i className='far fa-edit' /> Edit
                </Button>
            ) : (
                <Button
                    className='btn btn--green toolbar__edit-btn'
                    onClick={() => setIsEditing(true)}
                >
                    <i className='fas fa-cloud' /> Save
                </Button>
            )}

            <div className='toolbar__content'>
                {props.children(tab, isEditing, toolSelectedMedia)}
                <div className='toolbar__url'>
                    <Input
                        ref={url}
                        placeholder='enter or paste url here'
                        className='toolbar__url-input'
                        noAnimation
                    />
                    <Button className='btn btn--gold toolbar__url-add'>
                        <i
                            className='fas fa-plus'
                            onClick={() =>
                                tab.handleAdd({
                                    type: "image",
                                    src: url.current?.value,
                                })
                            }
                        />
                    </Button>
                </div>
            </div>

            <style jsx>{`
                .toolbar {
                    width: 600px;
                    background-color: inherit;
                    display: flex;
                    flex-direction: column;
                }

                .toolbar__tab {
                    display: flex;
                    width: 100%;
                }

                .toolbar__tab-item {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    text-align: center;
                    padding-bottom: 10px;
                    border-bottom: 2px solid var(--grey);
                    border-top: 5px solid transparent;
                }

                .toolbar__tab-item--active {
                    background-color: #ffffff;
                    border-bottom-color: #ffffff;
                    border-top-color: var(--blue);
                }

                .toolbar__icon {
                    font-size: 2rem;
                    padding: 10px;
                }

                .toolbar__tab-item-text {
                    font-size: 0.8rem;
                }

                :global(.toolbar__edit-btn) {
                    align-self: flex-end;
                    margin: 20px 0 !important;
                }

                .toolbar__content {
                    background-color: #ffffff;
                    flex-grow: 1;
                    padding: 20px 10px 10px 10px;
                    position: relative;
                }

                .toolbar__url {
                    display: flex;
                    padding: 10px;
                    position: absolute;
                    bottom: 10px;
                    width: calc(100% - 20px);
                    z-index: 1;
                }

                :global(.toolbar__url-input) {
                    background-color: transparent !important;
                    border: 1px solid #2b2d4280 !important;
                    border-radius: 5px 0 0 5px !important;
                    border-right: none !important;
                }

                :global(.toolbar__url-add) {
                    border-radius: 0 5px 5px 0 !important;
                }
            `}</style>
        </div>
    );
};
