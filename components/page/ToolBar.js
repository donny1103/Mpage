import React, { useState, useRef } from "react";
import Input from "../Input";
import Button from "../Button";

export default (props) => {
    const [activeTab, setActiveTab] = useState("sort");
    const url = useRef();
    const tab = props.tabs[activeTab];
    return (
        <div className='toolbar'>
            <div className='toolbar__tab'>
                <div
                    className={`toolbar__tab-item ${activeTab === "sort" ? "toolbar__tab-item--active" : ""}`}
                    onClick={() => setActiveTab("sort")}
                >
                    <i className={`fas fa-th-large toolbar__icon`} />
                    <span className='toolbar__tab-item-text'>Sort</span>
                </div>
                <div
                    className={`toolbar__tab-item ${activeTab === "photos" ? "toolbar__tab-item--active" : ""}`}
                    onClick={() => setActiveTab("photos")}
                >
                    <i className='far fa-image toolbar__icon' />
                    <span className='toolbar__tab-item-text'>Photos</span>
                </div>
                <div
                    className={`toolbar__tab-item ${activeTab === "videos" ? "toolbar__tab-item--active" : ""}`}
                    onClick={() => setActiveTab("videos")}
                >
                    <i className='fab fa-youtube toolbar__icon' />
                    <span className='toolbar__tab-item-text'>Videos</span>
                </div>
            </div>
            <div className='toolbar__content'>
                <div className='toolbar__url'>
                    <Input ref={url} placeholder='enter or paste url here' className='toolbar__url-input' noAnimation />
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
                {props.children(tab)}
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

                .toolbar__content {
                    background-color: #ffffff;
                    flex-grow: 1;
                    padding: 10px;
                }

                .toolbar__url {
                    display: flex;
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
