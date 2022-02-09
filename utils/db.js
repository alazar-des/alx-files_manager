import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
	const host = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
	const port = process.env.DB_PORT ? process.env.DB_PORT : 27017;
	const db = process.env.DB_DATABASE ? process.env.DB_DATABASE : 'files_manager';

	const url = `mongodb://${host}:${port}/db`;

	this._client = new MongoClient(url);
	this._client.connect((err) => console.log(err));
    }

    isAlive() {
	return this._client.isConnected();
    }

    async nbUsers() {
	return users.countDocuments();
    }

    async nbFiles() {
	return files.countDocuments();
    }
}

const dbClient = new DBClient();
module.exports = dbClient;
