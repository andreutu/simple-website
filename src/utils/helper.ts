export const getUniqueValues = (data: any[], type: string) => {
  let unique = data.map((object) => object[type]);

  if (type === "colors") {
    unique = unique.flat();
  }

  return ["all", ...new Set(unique)]
}