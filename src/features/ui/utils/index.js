export * from "./cn";

export function mergeKeepValues(t1, t2) {
  const obj1 = { ...t1 };
  const obj2 = { ...t2 };

  for (let key in obj2) {
    if (!(key in obj1)) {
      obj1[key] = obj2[key];
    } else {
      obj1[key] += " " + obj2[key];
    }
  }

  return obj1;
}
