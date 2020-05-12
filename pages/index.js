import React from "react";
import Link from "next/link";
import Button from "../components/Button";

const Home = (props) => {
    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 10%" }}>
            <h3>Home Page</h3>
            <div>
                <Link href='/login'>
                    <a style={{ marginRight: 20 }}>
                        <Button className='btn btn--red'>Login</Button>
                    </a>
                </Link>
                <Link href='/signup'>
                    <a>
                        <Button className='btn btn--blue'>Signup</Button>
                    </a>
                </Link>
            </div>
        </nav>
    );
};

export default Home;
