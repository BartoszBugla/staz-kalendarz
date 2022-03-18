export default (n: number) => {
  if (n < 10 && n > -10) {
    return `0${n}`;
  } else return n;
};
