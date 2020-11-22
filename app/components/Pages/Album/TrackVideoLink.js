import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const TrackVideoLink = (props) => {
    return(
        props.strMusicVid !== null &&
        props.strMusicVid.length !== 0 && (
            <a href={props.strMusicVid}>
                <FontAwesomeIcon icon={faYoutube} />
            </a>
        )
    );
};

export default TrackVideoLink;