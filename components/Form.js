import React from "react";

export default (props) => {
    return (
        <>
            <form
                {...props}
                className={`form ${props.className || ""}`}
                onSubmit={(event) => {
                    event.preventDefault();
                    event.persist();

                    props.onSubmit && props.onSubmit(event);
                }}
            >
                {props.children}
            </form>
            <style jsx>{`
                .form {
                    display: flex;
                    height: 100%;
                    width: 100%;
                    flex-direction: column;
                    align-items: center;
                }
            `}</style>
        </>
    );
};

export const Field = (props) => (
    <div className='form__field'>
        {props.children}
        <style jsx>{`
            .form__field {
                width: 100%;
                position: relative;
                margin: 20px 0;
            }
        `}</style>
    </div>
);

export const Label = ({ children }) => (
    <label className='form__label'>
        {children}{" "}
        <style jsx>{`
            .form__label {
                display: block;
                margin: 0 20px 5px 0;
                white-space: nowrap;
            }
        `}</style>
    </label>
);
