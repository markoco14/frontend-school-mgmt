/**
 * @jest-environment jsdom
 */
import SchoolDayList from "@/src/modules/schedule/components/SchoolDayList";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";


describe("School Day List", () => {
  it("renders no school days chosen", () => {
    const mockHandleDeleteSchoolDay = jest.fn(); // Mock function for setSchoolDays
    render(
      <SchoolDayList
        schoolDays={[]}
        handleDeleteSchoolDay={mockHandleDeleteSchoolDay}
      />,
    );
    const paragraph = screen.getByText("No school days chosen.");

    expect(paragraph).toBeInTheDocument();
  });

  it("renders a list of days the school is open", async () => {
    const mockHandleDeleteSchoolDay = jest.fn(); // Mock function for setSchoolDays
    const schoolDays = [
      { day: "Monday", school: 1, id: 1 },
      { day: "Thursday", school: 1, id: 4 },
    ];
    render(
      <SchoolDayList
        schoolDays={schoolDays}
        handleDeleteSchoolDay={mockHandleDeleteSchoolDay}
      />,
    );

    const days = await screen.findAllByRole("listitem");
    expect(days).toHaveLength(2);
  });
});
