import {
  uniqueNamesGenerator,
  colors,
  starWars,
  NumberDictionary,
} from "unique-names-generator";

const createUsername = () => {
  const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });

  const username = uniqueNamesGenerator({
    dictionaries: [starWars, colors, numberDictionary],
    separator: "_",
    style: "lowerCase",
    length: 3,
  })
    ?.replace(" ", "_")
    .trim();

  return { username };
};

export { createUsername };
