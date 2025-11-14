import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ListPlugin from '@fullcalendar/list';
import Sidebar from '~/layouts/component/Sidebar';
import viLocale from '@fullcalendar/core/locales/vi';
import WorkSchedule from '~/layouts/component/DiaLog/AddWorkSchedule';
import styles from './Calendar.module.scss';
import Swal from 'sweetalert2';

function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateClick = (info) => {
    const dateClicked = info.dateStr;
    const today = new Date().toISOString().split('T')[0];

    if (dateClicked < today){
      Swal.fire({
        title:'thông báo',
        text: 'Không thể lên lịch cho ngày đã qua',
        icon: 'warning',
      });
      return;
    }

    setSelectedDate(dateClicked);

    console.log("Ngày đã chọn:", dateClicked);

    setIsOpen(true);
  };

  return (
    <>
      <Sidebar />

      <div className="pt-2 pl-2 h-[calc(100%-8px)] overflow-x-hidden overflow-y-visible w-full flex flex-wrap m-0 basis-10/12 grow-0 max-w-10/12 fixed right-0">
        <div className={`max-w-440 w-[93%] mx-auto mt-28 ${styles.CalendarContainer}`}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, ListPlugin]}
            initialView="dayGridMonth"
            locale={viLocale}
            height="auto"
            firstDay={1}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            views={{
              dayGridMonth: {
                titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
              }
            }}
            dayHeaderFormat={{ weekday: 'long' }}
            dateClick={handleDateClick}
          />
        </div>
      </div>

      {isOpen && (
        <WorkSchedule 
          date={selectedDate} 
          open={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}

export default Calendar;
