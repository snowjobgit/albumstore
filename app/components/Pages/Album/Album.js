import React from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from "reactstrap";
import AlbumDescription from "./AlbumDescription";
import TrackVideoLink from "./TrackVideoLink";
import AlbumImages from "./AlbumImages";
import FavAlbum from "./FavAlbum";

const Album = (props) => {

    return(
        <Container className="pt-3">
            {props.error && <div>{props.error}</div>}
            {props.isAlbumLoaded &&
            <>
                <Row>
                    <Col><h2>
                        {props.albumInfo.strArtist}: {props.albumInfo.strAlbum}
                        &nbsp;
                        <FavAlbum {...props}/>
                    </h2></Col>
                </Row>
                {(props.albumInfo.strStyle || props.albumInfo.strGenre || props.albumInfo.strLabel) && (
                    <Row>
                        <Col>
                            {props.albumInfo.strStyle && <span>Style: <em>{props.albumInfo.strStyle}</em></span>}&nbsp;
                            {props.albumInfo.strGenre && <span>Genre: <em>{props.albumInfo.strGenre}</em></span>}&nbsp;
                            {props.albumInfo.strLabel && <span>Label: <em>{props.albumInfo.strLabel}</em></span>}
                        </Col>
                    </Row>
                )}
                <Row className="pt-3">
                    <Col xs="12" sm="12" md="6">
                        <AlbumImages {...props}/>
                    </Col>
                    <Col xs="12" sm="12" md="6">
                        <ol>
                            {props.albumTracks.map(el => <li key={el.idTrack}>{el.strTrack} <TrackVideoLink {...el} /></li>)}
                        </ol>
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col>
                        <AlbumDescription {...props} />
                    </Col>
                </Row>
            </>
            }
        </Container>
    );
};

export default Album;

Album.propTypes = {
    albumInfo: PropTypes.object,
    albumTracks: PropTypes.array
};