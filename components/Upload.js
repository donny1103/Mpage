import React, { useState, useRef } from "react";
import Input from "./Input";
import Button from "./Button";

export default (props = { handleAddMedia: () => {} }) => {
    const { Header, Content, Footer } = props;
    const file = useRef();
    const url = useRef();
    const [list, setList] = useState([]);
    const openFileDialog = () => file.current.click();
    const onFileChange = (e) => {
        const { files } = e.target;
        console.log(files);
    };

    const checkUrlType = async (url) => {
        // const response = await fetch("/api/page/getUrlType", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         url,
        //     }),
        // });

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url,
            }),
        });
        console.log(response);
    };

    const addImage = async () => {
        const _url = url.current.value;
        if (!!_url && !!_url.trim()) {
            // await checkUrlType(_url);
            setList([...list, { type: "image", src: url.current.value }]);
            url.current.value = "";
        }
    };

    const deleteImage = (itemIndex) => {
        const newList = list.filter((_, index) => index !== itemIndex);
        setList(newList);
    };

    return (
        <>
            <Content>
                <div className='upload'>
                    <div className='upload__content'>
                        <div className='upload__input-group'>
                            <Input
                                ref={url}
                                placeholder='enter or paste url here'
                                className='upload__url'
                                noAnimation
                            />
                            <Button className='btn btn--gold upload__add' onClick={addImage}>
                                <i className='fas fa-plus' />
                            </Button>
                        </div>
                        <input type='file' multiple className='upload__input' ref={file} onChange={onFileChange} />

                        <ul className='upload__preview'>
                            {/* <span className='upload__preview-text'>Drop files here</span> */}
                            {!!list.length &&
                                list.map((item, index) => (
                                    <li className='upload__preview-item' key={`preview-${index}`}>
                                        <img src={item.src || ""} />
                                        <Button className='btn btn--red' onClick={() => deleteImage(index)}>
                                            <i className='fas fa-times' />
                                        </Button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </Content>
            <Footer>
                <Button className='btn btn--blue upload__open-file'>
                    <i className='fas fa-cloud-upload-alt' onClick={openFileDialog} />
                </Button>
                <Button type='button' className='btn btn--green' onClick={() => props.handleAddMedia(list)}>
                    Submit
                </Button>
            </Footer>
        </>
    );
};
