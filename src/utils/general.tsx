export const shuffleArr = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

export default shuffleArr;
