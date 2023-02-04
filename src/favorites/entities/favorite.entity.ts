import {Artist} from "../../artists/entities/artist.entity";
import {Album} from "../../albums/entities/album.entity";
import {Track} from "../../tracks/entities/track.entity";

export class Favorite {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids

    constructor() {
        this.albums = [];
        this.artists = [];
        this.tracks = [];
    }
}

export enum EntityTitles {
    TRACK = 'Track',
    ALBUM = 'Album',
    ARTIST = 'Artist',
    USER = 'User',
}

export interface Favorites {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}
