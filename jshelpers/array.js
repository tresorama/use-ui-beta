export const inArray = (arr, maybeItem) => arr.find(a => a === maybeItem) !== undefined;
// const inArray2 = (array, thing) => {
//   const Found = true;
//   const NotFound = false;
//   try {
//     array.forEach(_ => {
//       if (_ === thing) throw Found;
//     });
//     throw NotFound;
//   } catch (found) {
//     return found;
//   }
// };
