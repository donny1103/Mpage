import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(({ children }) => children);

const SortableList = SortableContainer(({ children }) => {
    return children;
});

export default (props) => <SortableList {...props}>{props.children(SortableItem)}</SortableList>;
