class AlbumHandler{
    constructor(service) {
        this._service = service;
        this.addAlbumHandler = this.addAlbumHandler.bind(this);
        this.getAllAlbumHandler = this.getAllAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.editAlbumByIdHandler = this.editAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);


    }
    async addAlbumHandler(request, h){
        try{
            const {name, year} = request.payload;
            const album = await this._service.addAlbum({name, year});

            if ({name, year} === null){
                const response = h.response({
                    status: 'Gagal',
                    message: "Data Tidak Boleh Kosong",
                });
            }
            const response = h.response({
                status: "success",
                message: "Album Berhasil Ditambah",
                data : {
                    albumId : album
                }
            });
            response.code(201);
            return response;
        }catch(error) {
            const response = h.response({
               status: 'fail',
               message: error.message
            });
            response.code(400);
            return response;
        }

    }

    async getAllAlbumHandler(){
        const albums = await  this._service.getAllAlbums();
        return {
            status: "success",
            data: {
                album: albums
            }
        }
    }
    async getAlbumByIdHandler(request, h){
        try{
            const {id} = request.params;
            const album = await this._service.getAlbumById(id);
            return {
                status: 'success',
                data: {
                    album
                }
            }
        }catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(404);
            return response;
        }
    }

    async editAlbumByIdHandler(request, h){
        try{
            const {id} = request.params;
            const {name, year} = request.payload;
            const album = await this._service.editAlbumById(id, {name, year});
            return {
                status: 'success',
                message: "Album berhasil diubah"
            };
        }catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(400);
            return response;
        }
    }

    async deleteAlbumByIdHandler(request, h){
        try{
            const {id} = request.params;
            await this._service.deleteAlbumById(id);
            return {
                status: 'success',
                message: 'Album Berhasil di Hapus'
            };
        }catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(404);
            return response;
        }
    }
}
module.exports = AlbumHandler;