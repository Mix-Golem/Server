export class RankDTO {
  constructor(id, userId, thumbnail, title, userName) {
    this.id = id;
    this.userId = userId;
    this.thumbnail = thumbnail;
    this.title = title;
    this.userName = userName;
  }
}

export const getRankResponseDTO = (type, data) => {
  return {
    status: "OK",
    code: 200,
    message: type === "top" ? "탑랭크 호출" : "투데이 랭크 호출",
    result: {
      songs: data.map(
        (item) =>
          new RankDTO(
            item.id,
            item.userId,
            item.thumbnail,
            item.title,
            item.userName
          )
      ),
    },
    isSuccess: true,
  };
};
