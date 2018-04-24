// MAIN IMPORTS
import React from 'react';

// ADDONS
import Slick from 'react-slick';
import { Link } from 'react-router-dom';

// CSS
import style from './slider.css';

// COMPONENT
const NewsTemplate = (props) => {
    // SLIDER TEMPLATES
    let template = null;

    // SLIDER SETTINGS
    const settings = {
        dots:true,
        infinite:true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...props.settings
    }

    switch(props.type){
        case ('featured'):
            template = props.data.map((item,i) => {
                return(
                    <div key={i}>
                        <div className={style.featured_item}>
                            <div className={style.featured_image} style={{ background:`url(../images/articles/${item.image})` }}></div>
                            <Link to={`/articles/${item.id}`}>
                                <div className={style.featured_caption}>
                                    {item.title}
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })
            break;
        default:
            template = null;
    }

    return(
        <Slick {...settings}>
            {template}
        </Slick>
    )
}

export default NewsTemplate;
