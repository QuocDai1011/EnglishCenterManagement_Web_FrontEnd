import React, { useEffect, useState } from 'react';
import styles from './StudentUser.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import CreateBlog from '~/layouts/component/CreateBlog';
import { FaPencilAlt, FaCamera, FaUserCog } from 'react-icons/fa';
import UserBlog from '~/layouts/component/UserBlog';
import FilesBlog from '~/layouts/component/FilesBlog';
function StudentUser() {
    //Cố định userId
    const idStudent = 1;
    const [studentData, setStudentData] = useState([]);
    useEffect(() => {
        fetchStudentData();
    }, []);
    const fetchStudentData = async () => {
        try {
            const response = await fetch('https://localhost:7069/api/Student/' + idStudent);
            const data = await response.json();
            setStudentData(data);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };
    console.log('Fetched student data:', studentData);
    const [handleAction, setHandleAction] = useState(1);
    const [showEditOptions, setShowEditOptions] = useState(false);
    return (
        <div className={styles.StudentUser}>
            <div className={styles.StudentUser__header}>
                <div className={styles.StudentUser__headerContent}>
                    <div className={styles.StudentUser__info}>
                        <div className={styles.StudentUser__infoContent}>
                            <img src="/images/avatarStudent.jpg" alt="Ảnh đại diện" />
                            <p>{studentData.fullName}</p>
                            <button>
                                <FaCamera className={styles.StudentUser__btnIcon} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.StudentUser__btnRevise}>
                        <button>
                            <FaCamera />
                            Chỉnh sửa ảnh bìa
                        </button>
                    </div>
                </div>
                <div className={styles.StudentUser__headerActions}>
                    <button className={handleAction === 1 ? styles.active : ''} onClick={() => setHandleAction(1)}>
                        Bài viết
                    </button>
                    <button className={handleAction === 2 ? styles.active : ''} onClick={() => setHandleAction(2)}>
                        Giới thiệu
                    </button>
                    <button className={handleAction === 3 ? styles.active : ''} onClick={() => setHandleAction(3)}>
                        File phương tiện
                    </button>
                    <button className={styles.StudentUser__btnEdit}>
                        <BsThreeDots
                            className={styles.StudentUser__editIcon}
                            onClick={() => setShowEditOptions(!showEditOptions)}
                        />
                    </button>
                    <div className={`${styles.StudentUser__editOptions} ${showEditOptions ? styles.show : ''}`}>
                        <button className={styles.StudentUser__editOption}>
                            <FaPencilAlt className={styles.StudentUser__editOptionIcon} />
                            <span>Chỉnh sửa thông tin cá nhân</span>
                        </button>
                        <button className={styles.StudentUser__editOption}>
                            <FaUserCog className={styles.StudentUser__editOptionIcon} />
                            <span>Đổi mật khẩu</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.StudentUser__body}>
                {handleAction === 1 && (
                    <div className={styles.StudentUser__blogs}>
                        <div className={styles.StudentUser__blog}>
                            <div className={styles.StudentUser__anotherBlog}>
                                <CreateBlog />
                            </div>
                        </div>
                        <div className={styles.StudentUser__anotherBlogs}>
                            <div className={styles.StudentUser__anotherBlog}>
                                <UserBlog studentData={studentData} />
                            </div>
                            <div className={styles.StudentUser__anotherBlog}>
                                <FilesBlog />
                            </div>
                        </div>
                    </div>
                )}
                {handleAction === 2 && (
                    <div className={styles.StudentUser__blogs}>
                        <div className={styles.StudentUser__blog}>
                            <div className={styles.StudentUser__anotherBlog}>
                                <UserBlog studentData={studentData} />
                            </div>
                        </div>
                        <div className={styles.StudentUser__anotherBlogs}>
                            <div className={styles.StudentUser__anotherBlog}>
                                <FilesBlog />
                            </div>
                        </div>
                    </div>
                )}
                {handleAction === 3 && (
                    <div className={styles.StudentUser__blogs}>
                        <div className={styles.StudentUser__blog}>
                            <div className={styles.StudentUser__anotherBlog}>
                                <FilesBlog />
                            </div>
                        </div>
                        <div className={styles.StudentUser__anotherBlogs}>
                            <div className={styles.StudentUser__anotherBlog}>
                                <UserBlog studentData={studentData} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default StudentUser;
