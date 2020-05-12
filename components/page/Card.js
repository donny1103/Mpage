import React from "react";

export default ({ page, user }) => {
    const createAt = new Date(page.createdAt).toLocaleString("en-CA", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    return (
        <>
            <figure className='card__thumbnail' style={{ backgroundImage: `url('${page?.thumnail.src}')` }} />
            <div className='card__details'>
                <div className='card__avatar'>
                    <img src={user.profilePictureUrl} alt='img' className='card__avatar-picture' />
                </div>

                <div className='card__content'>
                    <h4 className='card__title'>
                        {page?.title} a very small or concise description, representation, or summary. a very small or
                        concise description, representation, or summary.
                    </h4>
                    <div className='card__datetime'>
                        <span className='card__datetime-item'>{user.name || user.email}</span>
                        <span className='card__datetime-item'>{createAt}</span>
                    </div>
                </div>
                <div className='card__actions'>
                    <i className='fas fa-ellipsis-v' />
                </div>
            </div>
            <style jsx>
                {`
                    .card__thumbnail {
                        cursor: pointer;
                        padding-bottom: 56.25%;
                        height: 0;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-color: #25354a;
                        background-position: 50%;
                        position: relative;
                    }

                    .card__details {
                        display: flex;
                        width: 100%;
                        color: var(--black);
                        padding-top: 10px;
                    }

                    .card__avatar {
                        min-width: 40px;
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        margin-right: 5px;
                    }

                    .card__avatar-picture {
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                        border-radius: 50%;
                        overflow: hidden;
                        max-width: 100%;
                    }

                    .card__content {
                        flex-grow: 1;
                        margin: 0 5px;
                        width: calc(100% - 85px);
                    }

                    .card__title {
                        line-height: 1.1;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .card__datetime {
                    }

                    .card__datetime-item {
                        font-size: 0.8rem;
                        margin-right: 10px;
                        color: var(--dark-grey);
                    }
                    .card__actions {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 5px;
                        width: 20px;
                        color: var(--yellow);
                    }
                `}
            </style>
        </>
    );
};
