import React, { useRef, useState, useContext, useEffect } from "react";
import Form, { Field, Label } from "./Form";
import Input from "./Input";
import Button from "./Button";

export default (props) => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const profilePictureUrlRef = useRef(null);
    const [errors, setErrors] = useState({});
    const user = props.user;

    const { Content, Footer, Header, onClose } = props;

    useEffect(() => {
        nameRef.current.value = user.name;
        emailRef.current.value = user.email;
        profilePictureUrlRef.current.value = user.profilePictureUrl;
    }, [user]);

    const validate = ({ email }) => {
        let hasError = false;
        let errors = {};

        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email";
            hasError = true;
        }

        setErrors(errors);

        return hasError;
    };

    const handleSubmit = async () => {
        const payload = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            profilePictureUrl: profilePictureUrlRef.current?.value,
        };

        const hasError = validate(payload);

        if (hasError) return;

        const updateRes = await fetch("/api/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (updateRes.ok) {
            user.mutate();
            onClose();
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Header>My Profile</Header>
            <Content>
                <Field>
                    <Label>Name</Label>
                    <Input type='text' name='name' ref={nameRef} />
                </Field>
                <Field>
                    <Label>Email</Label>
                    <Input type='email' name='email' ref={emailRef} />
                </Field>
                <Field>
                    <Label>Picture Url</Label>
                    <Input type='text' name='profilePictureUrl' ref={profilePictureUrlRef} />
                </Field>
            </Content>
            <Footer>
                <Button type='submit' className='btn btn--green'>
                    Save
                </Button>
            </Footer>
        </Form>
    );
};
