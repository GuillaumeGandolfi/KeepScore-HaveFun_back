const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/database');

class User extends CoreDatamapper {
    tableName = 'user';

    async signin(email,password){
        let user;
        try{
            const sqlQuery = `
                SELECT  u.id,name,lastname,isAdmin 
                FROM "user" u
                WHERE mail=$1 AND password=$2`;
            const response = await client.query(sqlQuery,[email,password]);
            user = response.rows[0];
        }
        catch(error){
            console.error(error);
        }

        return user;
    }
}

module.exports = new User(client);