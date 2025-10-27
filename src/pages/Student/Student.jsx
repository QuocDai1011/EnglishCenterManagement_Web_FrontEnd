import styles from './Student.module.scss'
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5088/api/Student')
      .then(res => res.json())
      .then(result => setStudents(result))
      .catch(err => console.error('Error fetching students:', err));
  }, []);

  if (students.length === 0) {
    return <p>Không có sinh viên nào.</p>;
  }

  return (
    <div style={{marginTop: 50}} className={cx('student-list')}>
      <h2>Danh sách sinh viên</h2>
      <ul>
        {students.map(s => (
          <li key={s.studentId}>
            <b>{s.fullName}</b> ({s.userName}) - {s.email}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Student;
