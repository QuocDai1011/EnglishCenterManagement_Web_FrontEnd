// Calendar.jsx
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
  
  // State để lưu danh sách events
  const [events, setEvents] = useState([
    // Events mẫu để demo
    {
      id: '1',
      title: 'Họp team',
      start: '2025-01-20T09:00:00',
      end: '2025-01-20T10:00:00',
      backgroundColor: '#3788d8',
      borderColor: '#3788d8',
      extendedProps: {
        category: 'Hẹn gặp',
        description: 'Họp review sprint',
        object: 'Teacher - Nguyễn Văn A'
      }
    },
    {
      id: '2',
      title: 'Training nhân viên mới',
      start: '2025-01-22',
      backgroundColor: '#f56954',
      borderColor: '#f56954',
      extendedProps: {
        category: 'Training',
        description: 'Đào tạo quy trình làm việc'
      }
    }
  ]);

  const handleDateClick = (info) => {
    const dateClicked = info.dateStr;
    const today = new Date().toISOString().split('T')[0];

    if (dateClicked < today){
      Swal.fire({
        title:'Thông báo',
        text: 'Không thể lên lịch cho ngày đã qua',
        icon: 'warning',
      });
      return;
    }

    setSelectedDate(dateClicked);
    console.log("Ngày đã chọn:", dateClicked);
    setIsOpen(true);
  };

  // Hàm thêm event mới
  const handleAddEvent = (newEventData) => {
    // Tạo event object theo format của FullCalendar
    const newEvent = {
      id: Date.now().toString(), // ID tạm thời
      title: newEventData.title,
      start: `${newEventData.date}T${newEventData.startTime}:00`,
      end: `${newEventData.date}T${newEventData.endTime}:00`,
      backgroundColor: getCategoryColor(newEventData.category),
      borderColor: getCategoryColor(newEventData.category),
      extendedProps: {
        category: newEventData.category,
        description: newEventData.description,
        object: newEventData.object,
        user: newEventData.user,
        branch: newEventData.branch,
        type: newEventData.type
      }
    };

    // Thêm event vào state
    setEvents(prevEvents => [...prevEvents, newEvent]);

    // Hiển thị thông báo thành công
    Swal.fire({
      title: 'Thành công!',
      text: 'Đã thêm lịch làm việc',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });

    // Đóng dialog
    setIsOpen(false);
  };

  // Hàm lấy màu theo category
  const getCategoryColor = (category) => {
    const colors = {
      'Email': '#00a65a',
      'Gặp mặt đối tác': '#f39c12',
      'Gọi điện': '#00c0ef',
      'Hẹn gặp': '#3c8dbc',
      'Khác': '#605ca8',
      'Kỷ niệm': '#f56954',
      'Training': '#dd4b39',
      'Đi ăn': '#39cccc'
    };
    return colors[category] || '#3788d8';
  };

  // Hàm xử lý khi click vào event
  const handleEventClick = (info) => {
    const event = info.event;
    const props = event.extendedProps;

    Swal.fire({
      title: event.title,
      html: `
        <div style="text-align: left; font-size: 16px;">
          <p><strong>Thời gian:</strong> ${new Date(event.start).toLocaleString('vi-VN')}</p>
          ${event.end ? `<p><strong>Đến:</strong> ${new Date(event.end).toLocaleString('vi-VN')}</p>` : ''}
          <p><strong>Danh mục:</strong> ${props.category || 'Không có'}</p>
          ${props.object ? `<p><strong>Đối tượng:</strong> ${props.object}</p>` : ''}
          ${props.description ? `<p><strong>Mô tả:</strong> ${props.description}</p>` : ''}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Đóng',
      confirmButtonColor: '#d33',
      
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa event
        setEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
        Swal.fire('Đã xóa!', 'Lịch làm việc đã được xóa.', 'success');
      }
    });
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
            events={events} // Truyền events vào FullCalendar
            eventClick={handleEventClick} // Xử lý khi click vào event
            editable={true} // Cho phép kéo thả event
            eventDrop={(info) => {
              // Cập nhật event sau khi kéo thả
              const updatedEvents = events.map(e => {
                if (e.id === info.event.id) {
                  return {
                    ...e,
                    start: info.event.start.toISOString(),
                    end: info.event.end ? info.event.end.toISOString() : null
                  };
                }
                return e;
              });
              setEvents(updatedEvents);
              Swal.fire({
                icon: 'success',
                title: 'Đã cập nhật!',
                text: 'Thời gian lịch đã được thay đổi',
                timer: 1500,
                showConfirmButton: false
              });
            }}
            eventResize={(info) => {
              // Cập nhật event sau khi resize
              const updatedEvents = events.map(e => {
                if (e.id === info.event.id) {
                  return {
                    ...e,
                    start: info.event.start.toISOString(),
                    end: info.event.end ? info.event.end.toISOString() : null
                  };
                }
                return e;
              });
              setEvents(updatedEvents);
            }}
          />
        </div>
      </div>

      {isOpen && (
        <WorkSchedule 
          date={selectedDate} 
          open={isOpen} 
          onClose={() => setIsOpen(false)}
          onSubmit={handleAddEvent} // Truyền callback để nhận data
        />
      )}
    </>
  );
}

export default Calendar;