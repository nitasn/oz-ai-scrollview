const WORDS = [
  "quick","brown","fox","jumps","over","lazy","dog","bright","stars","whisper",
  "silent","code","runs","smooth","under","rustling","leaves","clever","minds",
  "build","simple","tools","solve","hard","problems","swiftly","clear","constraints",
  "useful","feedback","guides","progress","forward","every","tiny","choice","shapes",
  "result","craft","matters","details","accumulate","quality","appears","naturally",
  "test","early","iterate","often","ship","confidently","learn","improve","repeat"
];

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function generateRandomSentence(config: { minWords: number; maxWords: number }) {
  const n = randInt(config.minWords, config.maxWords);
  const words = Array.from({ length: n }, () => WORDS[randInt(0, WORDS.length - 1)]);
  const s = words.join(" ");
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}
