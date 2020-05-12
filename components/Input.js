import React, { forwardRef } from "react";

export default forwardRef((props, ref) => {
    const borderColor = props.borderColor || "--gold";
    return (
        <div className='input-group__field'>
            <input {...props} className={`input-group__input ${props.className || ""}`} ref={ref} />
            {!props.noAnimation && <span className='input-group__focus' />}

            <style jsx>{`
                .input-group__field {
                    position: relative;
                    width: 100%;
                }
                
                .input-group__input{
                    display: block;
                    width: 100%;
                    border: 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                    box-shadow: none;
                    border-radius: 0;
                    padding: 10px;
                    font-size: 1rem;
                    font-weight: normal;
                    transition: all 0.3s ease;
                    outline-offset: 0;
                    outline-style: none;
                    outline-width: 0;
                    color: var(--black);
                }

                .input-group__input:active,
                .input-group__input:focus {
                    // border-color: var(${borderColor});
                    background-color: var(--beige);
                }

                .input-group__focus {
                    border-bottom: 2px solid var(${borderColor});
                    width: 100%;
                    position: absolute;
                    opacity: 1;
                    transform: scale(0, 1);
                    transition: all 0.4s;
                    bottom: 0;
                }

                .input-group__input:focus ~ .input-group__focus {
                    opacity: 1;
                    transform: scale(1, 1);
                    box-shadow: 0 4px 4px rgba(218, 50, 50, 0.1);
                }
            `}</style>
        </div>
    );
});
