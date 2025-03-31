// config/error.js
export class BaseError extends Error {
	constructor(data) {
		super(data.message);
		this.name = this.constructor.name;
		this.data = data;
		this.status = data.status ?? 500; // ✅ 여기 추가
		Error.captureStackTrace(this, this.constructor);
	}
}
``
