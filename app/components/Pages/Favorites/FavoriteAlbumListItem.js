import React from 'react';
import {connect} from "react-redux";
import {toggleAlbumFavorite} from "../../../redux/reducers/appReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import defaultImg from '../../../assets/images/album-cover-placeholder-light.png';

const FavoriteAlbumListItem = ({albumInfo, toggleAlbumFavorite}) => {

    let {
        idAlbum,
        strAlbumThumb,
        strAlbum,
        strAlbumSlug,
        strArtist,
        strArtistSlug,
        intYearReleased
    } = albumInfo.album;

    const onFavClick = () => {
        toggleAlbumFavorite(idAlbum);
    };

    const getAlbumSlug = (`${strArtistSlug}-${strAlbumSlug}`);

    const getAlbumImage = (
        (strAlbumThumb && strAlbumThumb.length !== 0 &&
            strAlbumThumb
        ) || defaultImg
    );

    return(
        <div className="fav-album-item" style={{width: "100%", paddingBottom: "15px"}}>
            <div className="item-info" style={{float: "left", position: "relative", width: "100%"}}>
                <div className="album-image" style={{width: "125px", float: "left"}}>
                    <Link to={getAlbumSlug}>
                        <img src={getAlbumImage} alt="" style={{width: "125px"}}/>
                    </Link>
                </div>
                <div className="album-meta" style={{paddingLeft: "150px"}}>
                    <h4><Link to={getAlbumSlug}>{strAlbum}</Link></h4>
                    {strArtist} - {intYearReleased}
                </div>
                <div className="album-action" style={{position: "absolute", right: 0, top: 0}}>
                    <Link to="#" onClick={onFavClick}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </Link>
                </div>
            </div>
            <div style={{clear: "both"}}></div>
        </div>
    );
};

export default connect(null, {toggleAlbumFavorite})(FavoriteAlbumListItem);