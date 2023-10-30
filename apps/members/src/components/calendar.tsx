"use client"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { EventInput } from "@fullcalendar/core/index.js"

export const EventsCalendar: React.FC<{
	events: EventInput[]
}> = (events) => {
	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			aspectRatio={2}
			fixedWeekCount={false}
			eventTimeFormat={{
				hour: 'numeric',
				minute: '2-digit',
				meridiem: 'short'
			}}
			events={events}
		/>
	)
}
