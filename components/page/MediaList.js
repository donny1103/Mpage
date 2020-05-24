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
                <SortableList
                    axis='xy'
                    onSortEnd={onSortEnd}
                    onSortStart={onSortStart}
                    pressDelay={300}
                >
                    {(SortableItem) => (
                        <ul className='media__list'>
                            {props.list.map(({ _id, src }, index) => {
                                const isSelected = props.toolSelectedMedia.list.includes(_id);
                                return (
                                    <SortableItem index={index} key={`media-${index}`}>
                                        <li
                                            className={`media__item ${
                                                isDragging ? "media__item--dragging" : ""
                                            }`}
                                            onClick={() => props.toolSelectedMedia.toggle(_id)}
                                        >
                                            <figure
                                                className='media__image'
                                                style={{ backgroundImage: `url('${src}')` }}
                                            />
                                            {props.isEditing && (
                                                <>
                                                    <span
                                                        className='media__item-delete'
                                                        title='delete'
                                                    >
                                                        <i
                                                            className='fas fa-times'
                                                            onClick={() => props.handleDelete(_id)}
                                                        />
                                                    </span>
                                                    <span className='media__item-select'>
                                                        <i
                                                            className={
                                                                isSelected
                                                                    ? "far fa-circle"
                                                                    : "fas fa-circle"
                                                            }
                                                        />
                                                    </span>
                                                </>
                                            )}
                                        </li>
                                    </SortableItem>
                                );
                            })}
                        </ul>
                    )}
                </SortableList>

                <style jsx>{`
                    .media__list {
                        display: flex;
                        flex-wrap: wrap;
                    }

                    .media__item {
                        max-width: 50%;
                        flex: 0 0 50%;
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

                    .media__item-select {
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        left: 2px;
                        top: 2px;
                        color: #ffffff;
                        background-color: var(--green);
                        border-radius: 50%;
                        height: 25px;
                        width: 25px;
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
                `}</style>
            </>
        )
    );
};
