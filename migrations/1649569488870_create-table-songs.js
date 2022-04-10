/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('songs',{
        id:{
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        title:{
            type: 'VARCHAR(255)',
            notNull: true
        },
        year:{
            type: 'INTEGER',
            notNull: true
        },
        performer:{
            type: 'VARCHAR(255)',
            notNull: true
        },
        genre:{
            type: 'VARCHAR(255)',
            notNull: true
        },
        albumId:{
        type: 'VARCHAR(50)',
            notNull: false
        },
        duration:{
            type: 'INTEGER',
            notNull: false
        }
        // ,
        // created_at:{
        //     type: 'VARCHAR(20)',
        //     notNull: true
        // },
        // updated_at:{
        //     type: 'VARCHAR(20)',
        //     notNull: true
        // }
    });
    // pgm.addConstraint('songs', 'songs.albumId', 'FOREIGN KEY(albumId) REFERENCES albums(id)');
};

exports.down = pgm => {
    pgm.dropTable('songs');
};
