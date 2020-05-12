import React from "react";

export default ({ page }) => {
    return (
        <>
            <figure className='page__card__thumbnail' style={{ backgroundImage: `url('${page.media[0].src}')` }} />
            <div className='page__card__details'>
                <div className='page__card__details__avatar'>
                    <span>Mia</span>
                </div>
                <div className='page__card__details__content'>
                    <h3 className='page__card__details__content__title'>
                        {page.title} a very small or concise description, representation, or summary. a very small or
                        concise description, representation, or summary.
                    </h3>
                    <div className='page__card__details__content__datetime'>
                        <span className='item'>Mia Li</span>
                        <span className='item'>May 01, 2020</span>
                    </div>
                </div>
                <div className='page__card__details__actions'>
                    <i className='fas fa-ellipsis-v' />
                </div>
            </div>
        </>
    );
};
