export const rankDTO = (req) => {
	return {
		id: req.id,
		userId: req.userId,
		thumbnail: req.thumbnail,
		title: req.title,
		userName: req.userName,
	};
};

export const followDTO = (req) => {
	return {
		followingId: req.followingId,
	};
};

export const unfollowDTO = (req) => {
	return {
		followingId: req.followingId,
	};
};

export const followlistDTO = (req) => {
	return {
		id: req.id,
		profile: req.profile,
		introduce: req.introduce,
	};
};

export const popularResponseDTO = (req) => {
	return {
		userId: req.id,
		profile: req.profile,
		userName: req.userName,
		totalLikes: req.total_likes,
	};
};
