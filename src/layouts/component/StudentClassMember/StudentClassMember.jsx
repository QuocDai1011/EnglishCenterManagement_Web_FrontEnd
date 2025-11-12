import { useEffect, useState } from 'react';
import styles from './StudentClassMember.module.scss';
import { IoSearch } from 'react-icons/io5';

function StudentClassMember({ classId }) {
    const [studentMembers, setStudentMembers] = useState([]);
    const [teacherMembers, setTeacherMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchClassMembers();
    }, []);

    const fetchClassMembers = async () => {
        try {
            const response = await fetch('https://localhost:7069/api/Class/get-students/' + classId);
            const data = await response.json();
            setStudentMembers(data[0].students);
        } catch (error) {
            console.error('Error fetching class members:', error);
        }
        try {
            const response = await fetch('https://localhost:7069/api/Class/get-teachers/' + classId);
            const data = await response.json();
            setTeacherMembers(data[0].teachers);
        } catch (error) {
            console.error('Error fetching class members:', error);
        }
    };
    const filteredMembers = studentMembers.filter((member) =>
        member.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    // console.log('Student Members:', studentMembers);
    // console.log('Teacher Members:', teacherMembers);
    return (
        <div className={styles.StudentClassMember}>
            <div className={styles.StudentClassMember__main}>
                <div className={styles.StudentClassMember__title}>
                    <h2>Thành viên</h2>
                </div>
                <div className={styles.StudentClassMember__memberLists}>
                    <div className={styles.StudentClassMember__memberList}>
                        <div className={styles.StudentClassMember__headerMemberList}>
                            <div className={styles.StudentClassMember__titleQuantity}>
                                <p>Quản trị viên</p>
                                <p>{teacherMembers.length}</p>
                            </div>
                        </div>
                        {teacherMembers.length > 0 && (
                            <div className={styles.StudentClassMember__memberItems}>
                                {teacherMembers.map((member) => (
                                    <div key={member.teacherId} className={styles.StudentClassMember__memberItem}>
                                        <img
                                            src={member.avatarUrl || '/images/StudentClassItem-background.jpg'}
                                            alt="Ảnh Đại Diện"
                                        />
                                        <p>{member.fullName || 'Nguyễn Văn A'}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={`${styles.StudentClassMember__memberList} ${styles.StudentHr}`}>
                        <div className={styles.StudentClassMember__headerMemberList}>
                            <div className={styles.StudentClassMember__titleQuantity}>
                                <p>Học viên</p>
                                <p>{filteredMembers.length}</p>
                            </div>
                            <div className={styles.StudentClassMember__search}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm thành viên"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <IoSearch className={styles.StudentClassMember__searchIcon} />
                            </div>
                        </div>
                        <div className={styles.StudentClassMember__memberItems}>
                            {filteredMembers.length > 0 ? (
                                filteredMembers.map((member) => (
                                    <div key={member.studentId} className={styles.StudentClassMember__memberItem}>
                                        <img
                                            src={member.avatarUrl || '/images/StudentClassItem-background.jpg'}
                                            alt="Ảnh Đại Diện"
                                        />
                                        <p>{member.fullName || 'Nguyễn Văn A'}</p>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.StudentClassMember__noResult}>Không tìm thấy học viên nào</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentClassMember;
