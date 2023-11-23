import { WeekDay } from "../entities/WeekDay";

class ScheduleAdapter {
	public async listWeekDays(): Promise<WeekDay[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weekdays/`);
		const weekDayList: WeekDay[] = await res.json();

		return weekDayList
	}

}

export const scheduleAdapter = new ScheduleAdapter();