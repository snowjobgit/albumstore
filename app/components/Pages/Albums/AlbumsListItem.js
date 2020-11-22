import React from 'react';
import {Link} from "react-router-dom";
import albumPlaceholder from '../../../assets/images/album-cover-placeholder-light.png';

const AlbumsListItem = (props) => {

    const albumPath = '/albums/'+props.strArtist.toLowerCase().replace(/\W+/g, '') + '-' + props.strAlbum.toLowerCase().replace(/\W+/g, '');
    const colWidth = `${100 / props.columns}%`;

    return(
        <article className="album-item" style={{width: colWidth}}>
            <header>
                <div className="post-format-image post-format-wrapper ">
                    <div className="featured-image">
                        <Link to={albumPath} className="thumb epcl-loader">
                            <span className="fullimage cover lazy loaded" role="img" style={{backgroundImage: `url(${props.strAlbumThumb || props.strAlbumCDart || albumPlaceholder})`, display: "block"}} />
                        </Link>
                        <h1 className="post-title title">
                            <Link to={albumPath} className="mask">
                                {props.strAlbum}
                            </Link>
                        </h1>
                    </div>
                </div>
            </header>
            <div className="meta">
                <Link to={albumPath} title={props.strArtist} className="author meta-info">
                    <span className="author-name">{props.strArtist}</span>
                </Link>
                <time className="meta-info">{props.intYearReleased}</time>
            </div>
        </article>
    );
};

export default AlbumsListItem;