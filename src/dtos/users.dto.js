//=================================
//             Users
//=================================

export const checkVerificationRequestDTO = (req) => {
	return {
		cipherCode: req.cipherCode,
		code: req.code,
	};
};

export const signupRequestDTO = (req) => {
	return {
		email: req.email,
		password: req.password,
		passwordCheck: req.passwordCheck,
		name: req.name,
		phonenumber: req.phonenumber,
		gender: req.gender,
		birth: req.birth,
	};
};

export const loginRequestDTO = (req) => {
	return {
		email: req.email,
		password: req.password,
	};
};

export const setProfileRequestDTO = (req) => {
	return {
		profile: req.profile,
	};
};
