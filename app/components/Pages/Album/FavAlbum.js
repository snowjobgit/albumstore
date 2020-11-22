import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import {connect} from "react-redux";
import {toggleAlbumFavorite} from "../../../redux/reducers/appReducer";
import {Link} from "react-router-dom";

const FavAlbum = ({favAlbums, toggleAlbumFavorite, albumInfo}) => {
    const icon = favAlbums.includes(albumInfo.idAlbum) ? faHeart : farHeart;

    const onFavClick = () => {
        toggleAlbumFavorite(albumInfo.idAlbum);
    };

    return(
        <Link to="#" onClick={onFavClick}>
            <FontAwesomeIcon icon={icon}/>
        </Link>
    )
};

const mapStateToProps = (state) => ({
    albumInfo: state.app.albumInfo,
    favAlbums: state.app.favAlbums
});

export default connect(mapStateToProps, {toggleAlbumFavorite})(FavAlbum);