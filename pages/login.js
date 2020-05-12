import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import Link from "next/link";
import Button from "../components/Button";
import validateFields from "../helpers/validateFields";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => setErrors({}), [email, password]);

    const handleSubmit = async () => {
        const payload = { email, password };

        const { hasError, erros } = validateFields(payload);

        if (hasError) return setErrors(erros);

        const loginRes = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (loginRes.ok) {
            Router.push("/page");
        }

        if (loginRes.status === 401) {
            setErrors({
                password: "The username and password do not match.",
            });
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") return handleSubmit();
    };

    return (
        <div className='container'>
            <div className='login'>
                <div className='login__title'>Page App</div>
                <div className='login__field'>
                    <label className='login__label'>Email</label>
                    <div className='login__input-group'>
                        <input type='email' className='login__input' onChange={(e) => setEmail(e.target.value)} />
                        <i className='fas fa-envelope login__input-icon' />
                        {!!errors.email && <i className='fas fa-exclamation login__invalid-icon' />}
                        <span className='login__field-focus' />
                    </div>
                    {!!errors.email && <div className='login__invalid-feedback'>{errors.email}</div>}
                </div>
                <div className='login__field'>
                    <label className='login__label'>Password</label>
                    <div className='login__input-group'>
                        <input
                            type='password'
                            className='login__input'
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={onKeyDown}
                        />
                        <i className='fas fa-lock login__input-icon' />
                        {!!errors.password && <i className='fas fa-exclamation login__invalid-icon' />}
                        <span className='login__field-focus' />
                    </div>
                    {!!errors.password && <div className='login__invalid-feedback'>{errors.password}</div>}
                </div>

                <Button
                    className='btn btn--red'
                    style={{
                        width: "100%",
                        boxShadow: "0 8px 4px rgba(218, 50, 50, 0.1)",
                        padding: "8px",
                        marginBottom: "15%",
                    }}
                    onClick={handleSubmit}
                >
                    LOGIN
                </Button>

                <div className='login__alternative'>
                    <span>Or Login Using</span>
                    <div className='login__alternative-group'>
                        <i className='fab fa-facebook login__alternative-icon login__alternative-icon--facebook' />
                        <i className='fab fa-google login__alternative-icon login__alternative-icon--google' />
                    </div>
                </div>

                <div className='login__signup'>
                    <span>Don't have an account?</span>
                    <Link href='/signup'>
                        <a className='login_signup-button'>
                            <Button
                                className='btn btn--blue'
                                style={{
                                    marginTop: "10%",
                                    width: "100%",
                                    boxShadow: "0 8px 4px rgba(10, 36, 98, 0.1)",
                                }}
                            >
                                Sign up
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

                .login {
                    border-radius: 10px;
                    padding: 50px;
                    width: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: var(--beige);
                }

                .login__title {
                    font-family: Poppins-Bold;
                    font-size: 2rem;
                    color: #333333;
                    line-height: 1.2;
                    text-align: center;
                    margin-bottom: 20%;
                }

                .login__field {
                    margin-bottom: 15%;
                    width: 100%;
                    border-bottom: 2px solid var(--grey);
                    position: relative;
                }

                .login__label {
                    font-size: 1rem;
                    color: var(--black);
                    line-height: 1.5;
                    padding-left: 7px;
                }

                .login__input-group {
                    position: relative;
                }

                .login__input-icon {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 8px;
                    font-size: 1.2rem;
                    color: var(--grey);
                    transition: color 0.4s;
                }

                .login__invalid-icon {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 5px;
                    font-size: 1rem;
                    color: var(--red);
                }

                .login__input {
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

                .login__field-focus {
                    border-bottom: 2px solid var(--red);
                    width: 100%;
                    position: absolute;
                    opacity: 0;
                    transform: scale(0, 1);
                    transition: all 0.4s;
                }

                .login__input:focus ~ .login__field-focus {
                    opacity: 1;
                    transform: scale(1, 1);
                    box-shadow: 0 4px 4px rgba(218, 50, 50, 0.1);
                }

                .login__input:focus ~ .login__input-icon {
                    color: var(--red);
                }

                .login__invalid-feedback {
                    color: var(--red);
                    font-size: 0.7rem;
                    position: absolute;
                    margin-top: 10px;
                    width: 100%;
                    text-align: center;
                }

                .login__alternative {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.8rem;
                    color: var(--dark-grey);
                }

                .login__alternative-group {
                    margin: 20px;
                }

                .login__alternative-icon {
                    font-size: 2rem;
                    margin: 0 5px;
                    transition: color 0.4s;
                }

                .login__alternative-icon--facebook {
                    color: #3b5998;
                }

                .login__alternative-icon--facebook:hover {
                    color: #2f477a;
                }

                .login__alternative-icon--google {
                    color: #de5246;
                }

                .login__alternative-icon--google:hover {
                    color: #c63023;
                }

                .login__signup {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.8rem;
                    color: var(--dark-grey);
                    margin: 10% 0;
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

                    .login__title {
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
