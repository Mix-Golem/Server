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

export const verifyPasswordDTO = (req) => {
	return {
		password: req.password,
	};
};

export const updateUserRequestDTO = (req) => {
	return {
		name: req.name,
		introduce: req.introduce,
		password: req.password,
	};
};

export const userNoticeResponseDTO = (req) => {
	return {
		id: req.id,
		userId: req.user_id,
		contents: req.content,
		read: req.read,
		createdAt: req.created_at,
		notificationType: req.notification_type,
		targetId: req.target_id,
	};
};
