import React, { useState, useEffect } from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Button from "../components/Button";
import validateFields from "../helpers/validateFields";

export default (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => setErrors({}), [email, password, confirmPassword]);

    const handleSubmit = async () => {
        const { hasError, errors } = validateFields({ email, password, confirmPassword });

        if (hasError) return setErrors(errors);

        const signupRes = await fetch("/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (signupRes.ok) {
            const user = await signupRes.json();
            if (user.exist) {
                setErrors({ email: "Email already exists, please login." });
            } else {
                Router.push("/page");
            }
        } else {
            // handle server error
        }
    };

    return (
        <div className='container'>
            <div className='signup'>
                <div className='signup__title'>Page App</div>
                <div className='signup__field'>
                    <label className='signup__label'>Email</label>
                    <div className='signup__input-group'>
                        <input type='email' className='signup__input' onChange={(e) => setEmail(e.target.value)} />
                        <i className='fas fa-envelope signup__icon' />
                        {!!errors.email && <i className='fas fa-exclamation signup__invalid-icon' />}
                        <span className='signup__focus' />
                    </div>
                    {!!errors.email && <div className='signup__invalid-feedback'>{errors.email}</div>}
                </div>
                <div className='signup__field'>
                    <label className='signup__label'>Password</label>
                    <div className='signup__input-group'>
                        <input
                            type='password'
                            className='signup__input'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className='fas fa-lock signup__icon' />
                        {!!errors.password && <i className='fas fa-exclamation signup__invalid-icon' />}
                        <span className='signup__focus' />
                    </div>
                    {!!errors.password && <div className='signup__invalid-feedback'>{errors.password}</div>}
                </div>

                <div className='signup__field'>
                    <label className='signup__label'>Confirm Password</label>
                    <div className='signup__input-group'>
                        <input
                            type='password'
                            className='signup__input'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <i className='fas fa-lock signup__icon' />
                        {!!errors.confirmPassword && <i className='fas fa-exclamation signup__invalid-icon' />}
                        <span className='signup__focus' />
                    </div>
                    {!!errors.confirmPassword && (
                        <div className='signup__invalid-feedback'>{errors.confirmPassword}</div>
                    )}
                </div>

                <Button
                    className='btn btn--blue'
                    style={{
                        width: "100%",
                        boxShadow: "0 8px 4px rgba(10, 36, 98, 0.1)",
                        padding: "8px",
                        marginBottom: "15%",
                    }}
                    onClick={handleSubmit}
                >
                    SIGNUP
                </Button>

                <div className='signup__alternative'>
                    <span>Or Sigup Using</span>
                    <div className='signup__alternative-group'>
                        <i className='fab fa-facebook signup__alternative-icon signup__alternative-icon--facebook' />
                        <i className='fab fa-google signup__alternative-icon signup__alternative-icon--google' />
                    </div>
                </div>

                <div className='login__signup'>
                    <span>Already have an account?</span>
                    <Link href='/login'>
                        <a className='login_signup-button'>
                            <Button
                                className='btn btn--red'
                                style={{
                                    marginTop: "10%",
                                    width: "100%",
                                    boxShadow: "0 8px 4px rgba(218, 50, 50, 0.1)",
                                }}
                            >
                                Login
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .container {
                    min-height: 100vh;
                    width: 100%;
                    background-color: var(--black);
                    position: relative;
                    display: flex;
                    justify-content: center;
                    padding: 30px 0;
                }

                .signup {
                    border-radius: 10px;
                    padding: 50px;
                    width: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: var(--beige);
                }

                .signup__title {
                    font-family: Poppins-Bold;
                    font-size: 2rem;
                    color: #333333;
                    line-height: 1.2;
                    text-align: center;
                    margin-bottom: 10%;
                }

                .signup__field {
                    margin-bottom: 10%;
                    width: 100%;
                    border-bottom: 2px solid var(--grey);
                    position: relative;
                }

                .signup__label {
                    font-size: 1rem;
                    color: var(--black);
                    line-height: 1.5;
                    padding-left: 7px;
                }

                .signup__input-group {
                    position: relative;
                }

                .signup__icon {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 8px;
                    font-size: 1.2rem;
                    color: var(--grey);
                    transition: color 0.4s;
                }

                .signup__invalid-icon {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 5px;
                    font-size: 1rem;
                    color: var(--red);
                }

                .signup__input {
                    font-size: 0.9rem;
                    color: #333333;
                    line-height: 1.2;
                    display: block;
                    width: 100%;
                    height: 45px;
                    background: transparent;
                    padding: 0 7px 0 43px;
                    outline: none;
                    border: none;
                    font-size: 1rem;
                }

                .signup__focus {
                    border-bottom: 2px solid var(--blue);
                    width: 100%;
                    position: absolute;
                    opacity: 0;
                    transform: scale(0, 1);
                    transition: all 0.4s;
                }

                .signup__input:focus ~ .signup__focus {
                    opacity: 1;
                    transform: scale(1, 1);
                    box-shadow: 0 4px 4px rgba(218, 50, 50, 0.1);
                }

                .signup__input:focus ~ .signup__icon {
                    color: var(--blue);
                }

                .signup__invalid-feedback {
                    color: var(--red);
                    font-size: 0.7rem;
                    position: absolute;
                    margin-top: 10px;
                    width: 100%;
                    text-align: center;
                }

                .signup__alternative {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.8rem;
                    color: var(--dark-grey);
                }

                .signup__alternative-group {
                    margin: 20px;
                }

                .signup__alternative-icon {
                    font-size: 2rem;
                    margin: 0 5px;
                    transition: color 0.4s;
                }

                .signup__alternative-icon--facebook {
                    color: #3b5998;
                }

                .signup__alternative-icon--facebook:hover {
                    color: #2f477a;
                }

                .signup__alternative-icon--google {
                    color: #de5246;
                }

                .signup__alternative-icon--google:hover {
                    color: #c63023;
                }

                .login__signup {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.8rem;
                    color: var(--dark-grey);
                    margin: 5% 0;
                    width: 50%;
                }

                .login_signup-button {
                    width: 100%;
                }

                @media screen and (max-width: 600px) {
                    .container {
                        padding: 0;
                    }

                    .login {
                        padding: 10px 20px;
                    }

                    .signup__title {
                        margin-bottom: 10%;
                    }

                    .login__signup {
                        margin: 5% 0;
                    }
                }
            `}</style>
        </div>
    );
};
