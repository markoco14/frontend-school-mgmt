import { addListItem } from "@/src/utils/addListItem";

const list = ['a', 'b,', 'c']

const item = 'd'

describe('Input a list and an item and append item to list', () => {
	it('should add to end of list', () => {
		const output = addListItem(list, item)
		expect(output).toHaveLength(4)
	});
	
	it('should contain the letter d', () => {
		const output = addListItem(list, item)
		expect(output).toContain('d')		
	});
});