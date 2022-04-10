const {Pool} = require('pg');
const {nanoid} = require('nanoid');

class SongService {
    constructor() {
        this._pool = new Pool();
    }
    async addSong({title, year, genre, performer, duration, albumId}){
        const id =  `SONG-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO songs values ($1, $2, $3, $4,$5, $6, $7) RETURNING id',
            values: [id, title, year, genre, performer, duration, albumId]
        };
        const result = await  this._pool.query(query);
        if (!result.rows[0].id){
            throw new Error("Song Gagal Ditambahkan!");
        }
        return result.rows[0].id;
    }

    async getAllSong(){
        const result = await this._pool.query('SELECT id, title, performer FROM songs');
        return result.rows;
    }

    async getSongById(id){
        const query = {
            text: 'SELECT * FROM songs where id=$1',
            values: [id]
        };
        const result = await this._pool.query(query);

        if (!result.rows.length){
            throw new Error("Song Tidak Ditemukan!");
        }
        return result.rows[0];
    }
    async editAlbumById(id, {title, year, genre, performer, duration, albumId}){
        const  query = {
            text: 'UPDATE songs SET title=$1,year=$2, performer=$4, genre=$3, duration=$5, albumId=$6 WHERE id=$3 RETURNING id',
            values: [id,title, year, genre, performer, duration, albumId]
        };
        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new Error("Song Gagal Di Perbaharui, Song Tidak Ditemukan!");
        }
    }
    async deleteSongById(id){
        const query = {
            text: 'DELETE FROM songs WHERE id=$1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new Error('Album Gagal Di Hapus, Album Tidak Ditemukan!');
        }
    }

}
module.exports = SongService;