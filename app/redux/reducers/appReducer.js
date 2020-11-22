import {albumStore} from "../../components/API/album-store";

const DEFAULT_ALBUM_SORTING_FIELD = 'releaseDate';

const STORAGE_ALBUMS_SORTING_KEY = 'sortAlbumsKey';
const STORAGE_FAVORITE_ALBUMS = 'favAlbums';
const STORAGE_ALBUMS = 'albums';

export const SET_INITIALIZED = 'app/SET_INITIALIZED';
export const SET_FETCHING = 'app/SET_FETCHING';
export const SET_ERROR = 'app/SET_ERROR';
export const SET_IS_ALBUM_LOADED = 'app/SET_IS_ALBUM_LOADED';

export const LOAD_FAVORITE_ALBUMS = 'app/LOAD_FAVORITE_ALBUMS';
export const LOAD_STORED_ALBUMS = 'app/LOAD_STORED_ALBUMS';
export const TOGGLE_ALBUM_FAVORITE = 'app/TOGGLE_ALBUM_FAVORITE';

export const SET_ALBUMS_ITEMS = 'app/SET_ALBUMS_ITEMS';
export const SET_ALBUM_INFO = 'app/SET_ALBUM_INFO';
export const UNSET_ALBUM_INFO = 'app/UNSET_ALBUM_INFO';

export const SET_ALBUMS_SORTING_FIELD = 'app/SET_ALBUMS_SORTING_FIELD';
export const SET_SEARCH_TERM_LOCAL = 'app/SET_SEARCH_TERM_LOCAL';
export const SET_SEARCH_TERM_GLOBAL = 'app/SET_SEARCH_TERM_GLOBAL';

export const setError = payload => ({
    type: SET_ERROR,
    payload
});

export const setAlbumsItems = items => ({
    type: SET_ALBUMS_ITEMS,
    payload: {
        items
    }
});

export const setAlbumInfo = payload => ({
    type: SET_ALBUM_INFO,
    payload
});

export const unsetAlbumInfo = () => ({
    type: UNSET_ALBUM_INFO,
});

export const setAlbumsSortingField = sortBy => ({
    type: SET_ALBUMS_SORTING_FIELD,
    payload: {sortBy}
});

export const toggleAlbumFavorite = albumId => ({
    type: TOGGLE_ALBUM_FAVORITE,
    payload: {albumId}
});

export const loadFavoriteAlbums = () => ({
    type: LOAD_FAVORITE_ALBUMS
});

export const loadStoredAlbums = () => ({
    type: LOAD_STORED_ALBUMS
});

export const setSearchTerm = searchTerm => ({
    type: SET_SEARCH_TERM_LOCAL,
    payload: {searchTerm}
});

export const setIsFetching = isFetching => ({
    type: SET_FETCHING,
    payload: {isFetching}
});

export const setIsAlbumLoaded = isLoaded => ({
    type: SET_IS_ALBUM_LOADED,
    payload: {isLoaded}
});

export const initializedSuccessfully = () => ({
    type: SET_INITIALIZED
});

export const setSearchTermLocal = (payload) => ({
    type: SET_SEARCH_TERM_LOCAL,
    payload
});

export default function reducer(state = {
    // error message
    error: '',
    // set to true when application has initialized: fav albums loaded, stored albums loaded, sorting field loaded
    isInit: false,
    // dealing with remote API flag
    isFetching: false,
    // check if album loaded before render album's page
    isAlbumLoaded: false,
    // input value for local search
    searchTermLocal: '',
    // input value for global search
    searchTermGlobal: '',
    // albums sorting field
    sortAlbumsKey: '', // releaseDate, sales, popularity
    // albums we got from API sorted by `sortAlbumsKey`
    albums: [],
    // album info for album's page render
    albumInfo: null,
    // album tracks for album's page
    albumTracks: [],
    // albums we visited, stored in localStorage
    storedAlbums: [],
    // albums we made favorite, stored in localStorage
    favAlbums: [],
}, action) {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                isInit: true
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.payload.isFetching
            };
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        case SET_ALBUM_INFO:
            let {idAlbum, strArtistSlug, strAlbumSlug} = action.payload.album;
            let albumSlug = strArtistSlug + '-' + strAlbumSlug;

            let currentStoredAlbums = localStorage.getItem(STORAGE_ALBUMS);
            currentStoredAlbums = currentStoredAlbums !== null && currentStoredAlbums.length !== 0 ? JSON.parse(currentStoredAlbums) : {};

            if (! (albumSlug in currentStoredAlbums)) {
                currentStoredAlbums[albumSlug] = {album: action.payload.album, tracks: action.payload.tracks};
                localStorage.setItem(STORAGE_ALBUMS, JSON.stringify(currentStoredAlbums));
            }

            let newStoredAlbums = state.storedAlbums;
            newStoredAlbums[idAlbum] = {album: action.payload.album, tracks: action.payload.tracks};

            return {
                ...state,
                albumInfo: action.payload.album,
                albumTracks: action.payload.tracks,
                storedAlbums: newStoredAlbums
            };
        case SET_IS_ALBUM_LOADED:
            return {
                ...state,
                error: '',
                isAlbumLoaded: action.payload.isLoaded
            };
        case SET_ALBUMS_ITEMS:
            return {
                ...state,
                error: '',
                albums: action.payload.items
            };
        case UNSET_ALBUM_INFO:
            return {
                ...state,
                albumInfo: null,
                albumTracks: []
            };
        case TOGGLE_ALBUM_FAVORITE: {
            // add or remove album by its Id
            let albumId = action.payload.albumId;
            let newFavAlbums = state.favAlbums.includes(albumId) ? state.favAlbums.filter(i => i !== albumId) : [ ...state.favAlbums, albumId ];

            // save to localStorage
            localStorage.setItem(STORAGE_FAVORITE_ALBUMS, JSON.stringify(newFavAlbums));

            return {
                ...state,
                favAlbums: newFavAlbums
            };
        }
        case LOAD_FAVORITE_ALBUMS: {
            return {
                ...state,
                favAlbums: JSON.parse(localStorage.getItem(STORAGE_FAVORITE_ALBUMS)) || []
            }
        }
        case LOAD_STORED_ALBUMS: {
            let storedAlbumsObj = JSON.parse(localStorage.getItem(STORAGE_ALBUMS)) || [];
            let newStoredAlbums = {};
            for (let slug in storedAlbumsObj) {
                let {album, tracks} = storedAlbumsObj[slug];
                newStoredAlbums[album.idAlbum] = {album, tracks};
            }
            return {
                ...state,
                storedAlbums: newStoredAlbums
            }
        }
        case SET_ALBUMS_SORTING_FIELD:
            localStorage.setItem(STORAGE_ALBUMS_SORTING_KEY, action.payload.sortBy);

            return {
                ...state,
                sortAlbumsKey: action.payload.sortBy
            };
        case SET_SEARCH_TERM_LOCAL:
            return {
                ...state,
                searchTermLocal: action.payload.searchTermLocal
            };
    }
    return state;
}

export const loadAlbums = (sortAlbumsKey) => (dispatch, getState) => {
    dispatch(setIsFetching(true));
    return albumStore.loadAlbums(sortAlbumsKey)
        .then(data => {
            dispatch(setAlbumsItems(data.items));
            dispatch(setIsFetching(false));
        }).catch(error => {
            console.log(error);
        });
};

export const loadAlbumInfo = (slug) => async (dispatch) => {

    let currentStoredAlbums = localStorage.getItem(STORAGE_ALBUMS);
    currentStoredAlbums = currentStoredAlbums !== null && currentStoredAlbums.length !== 0 ? JSON.parse(currentStoredAlbums) : {};

    if ( ! (slug in currentStoredAlbums) ) {
        dispatch(setIsFetching(true));
        try {
            let albumData = await albumStore.loadAlbum(slug);
            dispatch(setAlbumInfo({album: albumData.album, tracks: albumData.tracks}));
            dispatch(setIsAlbumLoaded(true));
            dispatch(setIsFetching(false));
        } catch (e) {
            //console.error("No album information found");
            dispatch(setError({error: "No album information found"}));
            dispatch(setIsFetching(false));
        }
    } else {
        let albumData = currentStoredAlbums[slug];
        dispatch(setAlbumInfo({album: albumData.album, tracks: albumData.tracks}));
        dispatch(setIsAlbumLoaded(true));
    }
};

// export const onChangeSearchTermInput = (searchTerm) => (dispatch) => {
//     dispatch(setSearchTerm(searchTerm));
//     dispatch(setIsFetching(true));
//     return albumStore.searchAlbums(searchTerm)
//         .then(data => {
//             dispatch(setAlbumsItems(data.items));
//             dispatch(setIsFetching(false));
//         })
// };

export const initializeApplication = () => (dispatch) => {
    let promises = [];

    let sortAlbumsKey = localStorage.getItem(STORAGE_ALBUMS_SORTING_KEY);
    sortAlbumsKey = (sortAlbumsKey !== null && sortAlbumsKey.length !== 0) ? sortAlbumsKey : DEFAULT_ALBUM_SORTING_FIELD;

    promises.push(dispatch(loadFavoriteAlbums()));
    promises.push(dispatch(loadStoredAlbums()));
    promises.push(dispatch(setAlbumsSortingField(sortAlbumsKey)));

    Promise.all(promises)
        .then(() => {
            dispatch(initializedSuccessfully());
        })
};