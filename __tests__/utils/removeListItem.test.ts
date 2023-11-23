import { removeListItemById } from "@/src/utils/removeListItem";

const list = [
	{id: 1, value: "a"},
	{id: 2, value: "b"},
	{id: 3, value: "c"}
];

const id = 3;

describe('Input a list of objects and an ID and remove the object with that ID', () => {
	it('should remove item from list', () => {
		const output = removeListItemById(list, id);
		expect(output).toHaveLength(2)
	})
	
	it('should remove item with id = 3', () => {
		const output = removeListItemById(list, id);
		expect(output).toEqual([
      { id: 1, value: "a" },
      { id: 2, value: "b" }
    ]);
		expect(output).not.toContainEqual({ id: 3, value: "c" });
	})
})