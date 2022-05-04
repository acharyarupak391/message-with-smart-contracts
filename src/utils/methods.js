export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function sortDataByTimestamp(arr1 = [], arr2 = []) {
  return [...arr1, ...arr2].sort((a, b) => {
    if (a._timestamp < b._timestamp) return 1;
    else if (a._timestamp > b._timestamp) return -1;
  });
}
