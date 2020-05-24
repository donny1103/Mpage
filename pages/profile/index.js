import React, { useState } from "react";
import Form, { Field, Label } from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import getServerData from "../../services/getServerData";
import useAuth from "../../hooks/useAuth";
import useFormInput from "../../hooks/useFormInput";

function Profile(props) {
    const user = useAuth(props.user);
    const name = useFormInput(user.name);
    const email = useFormInput(user.email);
    const profilePictureUrl = useFormInput(user.profilePictureUrl);
    const [errors, setErrors] = useState({});

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
            name: name.value,
            email: email.value,
            profilePictureUrl: profilePictureUrl.value,
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
        }
    };

    return (
        <Layout user={user}>
            <Form onSubmit={handleSubmit}>
                <Field>
                    <Label>Name</Label>
                    <Input type='text' name='name' {...name} />
                </Field>
                <Field>
                    <Label>Email</Label>
                    <Input type='email' name='email' {...email} />
                </Field>
                <Field>
                    <Label>Picture Url</Label>
                    <Input type='text' name='profilePictureUrl' {...profilePictureUrl} />
                </Field>

                <Button type='submit' className='btn btn--green'>
                    Save
                </Button>
            </Form>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    return {
        props: {
            user: await getServerData(ctx, "/api/user"),
        },
    };
}

export default Profile;
