import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://albumstore.getsandbox.com/',
    withCredentials: true
});

export const albumStore = {
    loadAlbums(sortBy) {
        return instance
            .get('albums?sortBy='+sortBy)
            .then(response => {
                return response.data;
            })
    },

    loadAlbum(slug) {
        return instance
            .get('albums/'+slug)
            .then(response => {
                return response.data
            })
    },
};
