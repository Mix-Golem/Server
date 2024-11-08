import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create jwt token
export const createJwt = (req) => {
	const token = jwt.sign({ req }, process.env.JWT_SECRET, {
		expiresIn: "4h", // 4시간(임시임)
	});

	return token;
};
//미들웨어 토큰
export const verify = (req, res, next) => {
	const excludedPaths = [
		"/login",
		"/signup",
		"/signup/google",
		"/signup/email/send-verification-code",
		"/signup/email/check-verification-code",
		"/signup/kakao",
		"/rank/today",
		"/rank/top",
		"/search",
		"/popular",
		"/music/random"
	];

	// 현재 요청 URL이 제외할 경로에 포함되는지 확인
	if (excludedPaths.includes(req.path)) {
		return next();
	}

	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1]; // Bearer token 형식에서 토큰 분리

		if (!token) {
			return res.status(401).json({ message: "토큰이 없습니다." });
		}

		// 토큰 검증
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				return res.status(403).json({ message: "토큰이 유효하지 않습니다." });
			}

			req.userId = user.req.id; // 검증된 유저 정보를 요청 객체에 담음
			next(); // 다음 미들웨어로 이동
		});
	} catch (err) {
		return res.status(500).json({ message: "서버 에러" });
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
