import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create jwt token
export const createJwt = (req) => {
	const token = jwt.sign({ req }, process.env.JWT_SECRET, {
		expiresIn: "", // 4시간(임시임)
	});

	return token;
};

// Verify jwt token
export const verify = (req) => {
	try {
		return jwt.verify(req, process.env.JWT_SECRET);
	} catch (err) {
		return null;
	}
};

// Check jwt token format
export const checkFormat = (req) => {
	if (req.startsWith("Bearer")) {
		return req.split(" ")[1];
	} else {
		return null;
	}
};
