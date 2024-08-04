export const getSocial = async (type) => {
  if (type === "top") {
    return [
      {
        id: 1,
        userId: 2,
        thumbnail: "thumbnailURL1",
        title: "시흥 밤바다",
        userName: "김성진",
      },
      {
        id: 2,
        userId: 3,
        thumbnail: "thumbnailURL2",
        title: "",
        userName: "",
      },
      {
        id: 3,
        userId: 4,
        thumbnail: "thumbnailURL3",
        title: "",
        userName: "",
      },
    ];
  } else if (type === "today") {
    return [
      {
        id: 1,
        userId: 5,
        thumbnail: "",
        title: "",
        userName: "",
      },
      {
        id: 2,
        userId: 6,
        thumbnail: "thumbnailURL5",
        title: "",
        userName: "",
      },
      {
        id: 3,
        userId: 7,
        thumbnail: "thumbnailURL6",
        title: "",
        userName: "",
      },
    ];
  } else {
    throw new Error("Invalid type");
  }
};
