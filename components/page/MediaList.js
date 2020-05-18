import React, { useState } from "react";
import SortableList from "../SortableList";

export default (props) => {
    const [isDragging, setIsDragging] = useState(false);
    const onSortStart = () => setIsDragging(true);
    const onSortEnd = ({ oldIndex, newIndex }) => {
        props.onSortEnd && props.onSortEnd({ oldIndex, newIndex });
        setIsDragging(false);
    };

    return (
        props.list && (
            <>
                <span className='sort-hint'>Hold down 3 seconds to enable sort</span>
                <SortableList axis='xy' onSortEnd={onSortEnd} onSortStart={onSortStart} pressDelay={300}>
                    {(SortableItem) => (
                        <ul className='media__list'>
                            {props.list.map(({ _id, src }, index) => (
                                <SortableItem index={index} key={`media-${index}`}>
                                    <li className={`media__item ${isDragging ? "media__item--dragging" : ""}`}>
                                        <figure className='media__image' style={{ backgroundImage: `url('${src}')` }} />
                                        <div className='media__item-delete' title='delete'>
                                            <i className='fas fa-times' onClick={() => props.handleDelete(_id)} />
                                        </div>
                                    </li>
                                </SortableItem>
                            ))}
                        </ul>
                    )}
                </SortableList>

                <style jsx>{`
                    .media__list {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 10px;
                    }

                    .media__item {
                        max-width: calc(50%);
                        flex: 0 0 calc(50%);
                        padding: 10px;
                        background-color: white;
                        border-radius: 5px;
                        cursor: grab;
                        position: relative;
                    }

                    .media__image {
                        cursor: pointer;
                        padding-bottom: 56.25%;
                        height: 0;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-color: #25354a;
                        background-position: 50%;
                        position: relative;
                    }

                    :global(media__item--dragging) {
                        transform: scale(0.9) !important;
                        cursor: e-resize !important;
                    }

                    .media__item-delete {
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

                    .sort-hint {
                        text-align: center;
                        display: block;
                        margin: 10px;
                        color: var(--grey);
                        font-size: 15px;
                    }
                `}</style>
            </>
        )
    );
};
