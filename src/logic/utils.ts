/* eslint-disable import/prefer-default-export */
export function getRandomListOf<T>(size: number, entities: T[]) {
  const result: T[] = [];

  if (!entities.length) return result;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < size; i++) {
    result.push(
      entities.splice(Math.floor(Math.random() * entities.length), 1)[0]
    );

    // const r = getRandomNumberBetween(0, entities.length - 1);
    //     var r = [];
    // for (var i = 0; i < 5; i++) {
    //     r.push(itemp.splice(
    //         Math.floor(Math.random() * itemp.length), 1
    //     )[0]);
  }

  // result.push(entities[r])

  return result;
}

// function getRandomNumberBetween(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
