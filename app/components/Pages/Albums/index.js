import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import {Col, Container, Row} from "reactstrap";
import ResizeDetector from 'react-resize-detector';
import AlbumsListItem from "./AlbumsListItem";
import {loadAlbums} from "../../../redux/reducers/appReducer";
import SpinnerPage from "../../Layout/SpinnerPage";
import SearchLocalBar from "../../Layout/SearchLocalBar";
import SortBar from "../../Layout/SortBar";

const breakpointCols = {
    default: 4,
    768: 1,
    992: 2,
    1200: 3,
};

class AlbumsListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: 0,
            columns: 4,
        };
    }

    componentDidMount() {
        // when the album page was loaded first (by permanent link to album)
        // we have no albums loaded when back button was clicked, so load them
        this.props.sortAlbumsKey !== '' && this.props.loadAlbums(this.props.sortAlbumsKey);
    }

    componentDidUpdate(prevProps) {
        // component will update when sorting field key will be set up by initialization thunk
        if (this.props.sortAlbumsKey !== prevProps.sortAlbumsKey) {
            this.props.loadAlbums(this.props.sortAlbumsKey);
        }
    }

    onResize = (screenWidth) => {
        this.setState({screenWidth});
        let columns = breakpointCols.default;

        for (let width in breakpointCols) {
            if (width !== 'default') {
                if (screenWidth <= width) {
                    columns = breakpointCols[width];
                    break;
                }
            }
        }

        this.setState({columns});
    };

    displayAlbums = () => {
        let albums = this.props.albums;
        let search = this.props.searchTermLocal.toLowerCase();
        if (this.props.searchTermLocal !== '') {
            albums = albums.filter(album => {
                return album.strArtist.toLowerCase().includes(search) ||
                    album.strAlbum.toLowerCase().includes(search) ||
                    (album.strStyle && album.strStyle.toLowerCase().includes(search)) ||
                    (album.strGenre && album.strGenre.toLowerCase().includes(search));
            });
        }
        return albums;
    };

    render() {
        const albums = this.displayAlbums();

        return(
            <>
                <Container className="pt-4">
                    <Row>
                        <Col md="3" sm="4" xs="8"><SearchLocalBar /></Col>
                        <Col/>
                        <Col md="3" sm="4" xs="4" className="text-right"><SortBar /></Col>
                    </Row>
                    {this.props.isFetching ?
                        <SpinnerPage/> :
                        <Row className="pt-1">
                            <Col className="album-columns grid-items">
                                {albums.length !== 0 ? this.renderData(albums) : this.renderEmpty()}
                            </Col>
                        </Row>
                    }
                </Container>
                <ResizeDetector handleWidth onResize={this.onResize} />
            </>
        );
    }

    renderData = (data) => {
        const { columns } = this.state;
        return data.map(el => <AlbumsListItem columns={columns} key={el.idAlbum} {...el} />);
    };

    renderEmpty = () => (
        "No albums found. Relax your filters..."
    );
}

const mapStateToProps = state => ({
    isFetching: state.app.isFetching,
    sortAlbumsKey: state.app.sortAlbumsKey,
    searchTermLocal: state.app.searchTermLocal,
    albums: state.app.albums
});

export default compose(
    withRouter,
    connect(mapStateToProps, {loadAlbums})
)(AlbumsListContainer);