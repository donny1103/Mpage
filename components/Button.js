import React from "react";

export default (props) => (
    <>
        <button
            className={props.className || ""}
            type={props.type || "button"}
            onClick={props.onClick}
            style={props.style || {}}
        >
            <span className={`btn__text ${props.loading ? "btn__text--loading" : ""}`}>{props.children}</span>
            <i className={`fas fa-spinner btn__spinner ${props.loading ? "btn__spinner--loading" : ""}`} />
        </button>
        <style jsx>
            {`
                .btn {
                    font-size: 1rem;
                    position: relative;
                    margin: 0;
                    padding: 5px 8px;
                    text-rendering: auto;
                    color: black;
                    word-spacing: normal;
                    text-transform: none;
                    display: inline-block;
                    text-align: center;
                    cursor: pointer;
                    border-radius: 5px;
                    border: 1px solid black;
                    background-color: transparent;
                    position: relative;
                    transition: all 0.2s;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                }

                .btn--link {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    text-align: inherit;
                }

                .btn:focus,
                .btn--link {
                    outline: none;
                }

                .btn:active {
                    transform: scale(0.9);
                }

                .btn:hover {
                    color: white !important;
                }

                .btn::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    opacity: 0;
                    transition: all 0.4s;
                    transform: scale(0.2, 1);
                    background-color: black;
                }

                .btn:hover::before,
                .btn:active::before {
                    opacity: 1;
                    transform: scale(1, 1);
                }

                .btn__text {
                    position: inherit;
                    display: inherit;
                    width: 100%;
                    height: 100%;
                    z-index: 2;
                    transform: scale(1);
                    opacity: 1;
                    transition-property: opacity, transform;
                    transition-duration: 0.5s;
                    transition-timing-funcion: linear;
                }

                .btn__text--loading {
                    transform: scale(1.5);
                    opacity: 0;
                }

                .btn__spinner {
                    display: none;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    height: 20px;
                }

                .btn__spinner--loading {
                    display: inline !important;
                    animation: spin 1s linear infinite;
                    z-index: 2;
                }

                @keyframes spin {
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .btn--blue {
                    color: var(--blue) !important;
                    border-color: var(--blue) !important;
                }
                .btn--blue::before,
                .btn--blue:active::before {
                    background-color: var(--blue) !important;
                }

                .btn--red {
                    color: var(--red) !important;
                    border-color: var(--red) !important;
                }
                .btn--red::before,
                .btn--red:active::before {
                    background-color: var(--red) !important;
                }

                .btn--green {
                    color: var(--green) !important;
                    border-color: var(--green) !important;
                }
                .btn--green::before,
                .btn--green:active::before {
                    background-color: var(--green) !important;
                }

                .btn--yellow {
                    color: var(--yellow) !important;
                    border-color: var(--yellow) !important;
                }
                .btn--yellow::before,
                .btn--yellow:active::before {
                    background-color: var(--yellow) !important;
                }

                .btn--gold {
                    color: var(--gold) !important;
                    border-color: var(--gold) !important;
                }
                .btn--gold::before,
                .btn--gold:active::before {
                    background-color: var(--gold) !important;
                }

                .btn--grey {
                    color: var(--grey) !important;
                    border-color: var(--grey) !important;
                }
                .btn--grey::before,
                .btn--grey:active::before {
                    background-color: var(--grey) !important;
                }

                .btn--dark-gey {
                    color: var(--dark-gey) !important;
                    border-color: var(--dark-gey) !important;
                }
                .btn--dark-gey::before,
                .btn--dark-gey:active::before {
                    background-color: var(--dark-gey) !important;
                }
            `}
        </style>
    </>
);
