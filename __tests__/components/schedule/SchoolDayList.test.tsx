/**
 * @jest-environment jsdom
*/
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import SchoolDayList from "@/src/modules/schedule/components/SchoolDayList";
import UserContextProvider from '@/src/contexts/UserContext';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(), // Mock any function you use from useRouter
      // ... other properties and functions as needed
    };
  },
}));

describe('School Day List', () => {
	it('renders no school days chosen', () => {
		const mockHandleDeleteSchoolDay = jest.fn(); // Mock function for setSchoolDays
    render(
			<UserContextProvider>
				<SchoolDayList schoolDays={[]} handleDeleteSchoolDay={mockHandleDeleteSchoolDay} />,
			</UserContextProvider>
    );
    const paragraph = screen.getByText("No school days chosen.");
		
    expect(paragraph).toBeInTheDocument();
  });
	
	it('renders a list of days the school is open', async () => {
		const mockHandleDeleteSchoolDay = jest.fn(); // Mock function for setSchoolDays
		const schoolDays = [
      { day: "Monday", school: 1, id: 1 },
      { day: "Thursday", school: 1, id: 4 },
    ];
		render(
      <UserContextProvider>
        <SchoolDayList
          schoolDays={schoolDays}
          handleDeleteSchoolDay={mockHandleDeleteSchoolDay}
        />
        ,
      </UserContextProvider>,
    );

		const days = await screen.findAllByRole('listitem');
		expect(days).toHaveLength(2)
	});
});

