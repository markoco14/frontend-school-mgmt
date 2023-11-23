export function removeListItemById(list: any[], id: number) {
  const filteredList = list.filter((item: any) => item.id !== id);
  return filteredList
}

// removed because hard to test with set state function
export function removeListItem(setState: Function, id: number) {
  setState((prevList: any[]) => prevList.filter((item) => item.id !== id));
}
