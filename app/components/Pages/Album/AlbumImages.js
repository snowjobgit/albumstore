import React, {useState} from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
} from 'reactstrap';

import defaultAlbumThumb from '../../../assets/images/album-cover-placeholder-light.png';

const AlbumImages = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const getAlbumImages = () => {
        let items = [];
        if (props.isAlbumLoaded) {
            let {strAlbumThumb, strAlbumThumbBack, strAlbumCDart} = props.albumInfo;

            strAlbumThumb && strAlbumThumb.length && items.push({src: strAlbumThumb});
            strAlbumThumbBack && strAlbumThumbBack.length && items.push({src: strAlbumThumbBack});
            strAlbumCDart && strAlbumCDart.length && items.push({src: strAlbumCDart});
        }

        return items;
    };

    const items = getAlbumImages();

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt="" className="d-block w-100"/>
            </CarouselItem>
        );
    });

    return (
        <div style={{maxHeight: "500px"}}>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                {slides}
                {items.length > 1 && <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />}
                {items.length > 1 && <CarouselControl direction="next" directionText="Next" onClickHandler={next} />}
            </Carousel>
        </div>
    );
};

export default AlbumImages;

