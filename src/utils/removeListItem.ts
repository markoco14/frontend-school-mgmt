export function removeListItem(setState: Function, id: number) {
  setState((prevList: any[]) => prevList.filter((item) => item.id !== id));
}

