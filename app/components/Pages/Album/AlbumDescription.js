import React from 'react';

const AlbumDescription = (props) => {
    return(
        props.albumInfo &&
        props.albumInfo.strDescriptionEN !== null &&
        props.albumInfo.strDescriptionEN.length !== 0 &&
        (
            <div>
                <hr />
                {props.albumInfo.strDescriptionEN.split("\n").map(
                    (item, key) => <p key={key}>{item}</p>
                )}
            </div>
        )
    )
};

export default AlbumDescription;