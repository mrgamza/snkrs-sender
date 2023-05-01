const mysql = require('mysql');

const connectionInfo = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

let pool = mysql.createPool(connectionInfo)

function handleDisconnect() {
    pool.on('error', function (error) {
        console.log(`DB Error Another. error code : ${error.code}`);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect()
        } else {
            throw error
        }
    });
}

handleDisconnect();

setInterval(function () {
    pool.query('SELECT 1');
}, 5000);

module.exports.read = function read(dateTime) {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT name, time, link FROM snkrs_data WHERE time = '${dateTime}'`

            pool.query(query, function (error, results, fields) {
                if (error) {
                    reject(error)
                } else {
                    if (results.count === 0 || results[0] === undefined) {
                        resolve(null)
                    } else {
                        resolve(results)
                    }
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.create = function create(name, time, link) {
    return new Promise((resolve, reject) => {
        try {
            let query
            query = `INSERT INTO snkrs_data (name, time, link) VALUES ('${name}', '${time}', '${link}')`

            pool.query(query, function (error, results, fields) {
                if (error) {
                    reject(error)
                } else {
                    resolve(results.affectedRows > 0)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}