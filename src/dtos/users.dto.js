//=================================
//             Users
//=================================

export const checkVerificationRequestDTO = (req) => {
	return {
		cipherCode: req.cipherCode,
		code: req.code,
	};
};
