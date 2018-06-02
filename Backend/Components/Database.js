pool = require("./pool");
class Database extends BackendPOS {
	__construct() {
		const pool = new Pool(config);
	}
	async query(sql) {
		try {
			const response = await pool.query(sql);
			return response;
		}
		catch (e) {
			console.log(e)
		}
	}
};
export default Database;