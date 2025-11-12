import styles from './FullCalendarItem.module.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi';
import listPlugin from '@fullcalendar/list';
function FullCalendarItem() {
    return (
        <div className={styles.FullCalendar}>
            <div className={styles.FullCalendar__main}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    locales={[viLocale]}
                    // locale="vi"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                    }}
                    buttonText={{
                        today: 'Hôm nay',
                        month: 'Tháng',
                        week: 'Tuần',
                        day: 'Ngày',
                        list: 'Lịch biểu',
                    }}
                    // dateClick={(info) => alert('Bạn đã click vào: ' + info.dateStr)}
                    events={[
                        { title: 'Báo cáo dự án', date: '2025-10-25' },
                        { title: 'Làm bài tập React', date: '2025-10-27' },
                    ]}
                />
            </div>
        </div>
    );
}
export default FullCalendarItem;
