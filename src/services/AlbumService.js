const {Pool} = require('pg');
const {nanoid} = require('nanoid');

class AlbumService{
    constructor() {
        this._pool = new Pool();
    }
    async addAlbum({name, year}){
        const id =  `ALBUM-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO albums values ($1,$2,$3) RETURNING id',
            values: [id,name, year]
        };
        const result = await  this._pool.query(query);
        if (!result.rows[0].id){
            throw new Error("Album Gagal Ditambahkan!");
        }
        return result.rows[0].id;
    }

    async getAllAlbums(){
        const result = await this._pool.query('SELECT * FROM albums');
        return result.rows;
    }

    async getAlbumById(id){
        const query = {
            text: 'SELECT * FROM albums where id=$1',
            values: [id]
        };
        const result = await this._pool.query(query);

        if (!result.rows.length){
            throw new Error("Album Tidak Ditemukan!");
        }
        return result.rows[0];
    }
    async editAlbumById(id, {name, year}){
        const  query = {
            text: 'UPDATE albums SET name=$1,year=$2 WHERE id=$3 RETURNING id',
            values: [name, year,id]
        };
        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new Error("Album Gagal Di Perbaharui, Album Tidak Ditemukan!");
        }
    }
    async deleteAlbumById(id){
        const query = {
            text: 'DELETE FROM albums WHERE id=$1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new Error('Album Gagal Di Hapus, Album Tidak Ditemukan!');
        }
    }

}
module.exports = AlbumService;