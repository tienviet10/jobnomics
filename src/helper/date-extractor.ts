const extractDate = (date: Date) => {
  const processingDate = date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("T")[0]
    .split("/");

  const extractedDate = [
    processingDate[2],
    processingDate[0],
    processingDate[1],
  ].join("-");
  return extractedDate;
};

const extractTime = (date: Date) => {
  let hours = String(date.getHours());
  let minutes = String(date.getMinutes());
  const extractedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

  return extractedTime;
};

export { extractDate, extractTime };
