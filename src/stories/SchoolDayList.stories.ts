import type { Meta, StoryObj } from "@storybook/react";

import SchoolDayList from "../modules/schedule/components/SchoolDayList";

const meta = {
  title: "School Day List",
  component: SchoolDayList,
  tags: ["autodocs"],
} satisfies Meta<typeof SchoolDayList>;

export default meta;
type Story = StoryObj<typeof meta>;

const schoolDays = [
  {
    id: 99,
    school: 1,
    day: "Monday",
  },
  {
    id: 100,
    school: 1,
    day: "Wednesday",
  },
  {
    id: 101,
    school: 1,
    day: "Thursday",
  },
  {
    id: 102,
    school: 1,
    day: "Friday",
  },
];

export const Empty: Story = {
  args: {
		schoolDays: [],
		handleDeleteSchoolDay: () => {}
  },
};

export const WithSchoolDays: Story = {
  args: {
    schoolDays: schoolDays,
    handleDeleteSchoolDay: () => {},
  },
};
