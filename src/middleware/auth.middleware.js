// import jwt from "jsonwebtoken";
//
// export const decodeTokenMiddleware = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.decode(token);
//         req.userId = decoded.req.id;
//         next();  // 다음 미들웨어 또는 컨트롤러 함수로 이동
//     } catch (error) {
//         res.status(401).send({ message: 'Unauthorized: Invalid token' });
//     }
// };
