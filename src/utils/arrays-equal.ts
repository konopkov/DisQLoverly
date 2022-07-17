import R from "ramda";

export function arraysEqual<T>(a1: T[], a2: T[]): boolean {
  return R.isEmpty(R.symmetricDifference(a1, a2));
}
