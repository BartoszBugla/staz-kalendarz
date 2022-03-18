export default (id: string) => {
  const arr = id.split("-");
  return { year: Number(arr[0]), month: Number(arr[1]), day: Number(arr[2]) };
};
