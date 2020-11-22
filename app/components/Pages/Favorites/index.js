import React, {useEffect} from 'react';
import FavoriteAlbumListItem from "./FavoriteAlbumListItem";
import {connect} from "react-redux";
import {Col, Container, Row} from "reactstrap";
import {loadStoredAlbums} from "../../../redux/reducers/appReducer";

const Favorites = ({favAlbums, storedAlbums, loadStoredAlbums}) => {
    useEffect(() => {
        loadStoredAlbums();
    }, []);

    const renderData = (favAlbums) => {
        return (
            <div className="favorites">
                {favAlbums.map(albumId => <FavoriteAlbumListItem key={albumId} albumInfo={storedAlbums[albumId]} />)}
            </div>
        );
    };

    const renderEmpty = () => (
        <div>No favorite albums found.</div>
    );

    return(
        <Container className="pt-3">
            <Row>
                <Col><h2>Favorite albums</h2></Col>
            </Row>
            <Row>
                <Col>
                    {favAlbums.length !== 0 ? renderData(favAlbums) : renderEmpty()}
                </Col>
            </Row>
        </Container>

    );
};

const mapStateToProps = (state) => ({
    favAlbums: state.app.favAlbums,
    storedAlbums: state.app.storedAlbums
});

export default connect(mapStateToProps, {loadStoredAlbums})(Favorites);