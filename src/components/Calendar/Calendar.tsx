import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

function Calendar(): JSX.Element {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        {
          title: 'event 1',
          start: '2023-05-03',
          end: '2023-05-06',
          url: 'https://fullcalendar.io',
        },
        {
          title: 'event 2',
          date: '2023-05-29',
        },
      ]}
    />
  );
}

export default Calendar;
