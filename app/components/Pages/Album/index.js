import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";
import {loadAlbumInfo} from "../../../redux/reducers/appReducer";
import Album from './Album';
import SpinnerPage from "../../Layout/SpinnerPage";

class AlbumContainer extends React.Component {

    componentDidMount() {
        // load album info from API/localStorage
        let albumSlug = this.props.match.params.albumSlug;
        this.props.loadAlbumInfo(albumSlug);
    }

    render(){
        return (this.props.isFetching ?
            <SpinnerPage/> :
            <Album {...this.props} />
        );
    }
}

let mapStateToProps = (state) => ({
    error: state.app.error,
    isFetching: state.app.isFetching,
    isAlbumLoaded: state.app.isAlbumLoaded,
    albumInfo: state.app.albumInfo,
    albumTracks: state.app.albumTracks,
});

export default compose(
    withRouter,
    connect(mapStateToProps, {loadAlbumInfo})
)(AlbumContainer);
