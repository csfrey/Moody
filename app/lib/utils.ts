export function parseDateString(date: Date | string) {
  console.log("Raw time: ", date);

  let d = new Date(date);
  let hours = d.getHours();
  let ampm = hours > 12 ? "pm" : "am";
  hours = hours > 12 ? hours - 12 : hours;
  let ds = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()} at ${hours}:${d.getMinutes()} ${ampm}`;

  return ds;
}
