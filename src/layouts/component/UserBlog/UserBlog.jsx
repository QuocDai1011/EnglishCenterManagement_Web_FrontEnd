import React from 'react';
import { useState } from 'react';
import { FaGift, FaInfoCircle, FaPhone } from 'react-icons/fa';
import styles from './UserBlog.module.scss';
function UserBlog({studentData }) {
    return (
        <>
            <h2>Giới thiệu</h2>
            <div className={styles.UserBlog__anotherBlogContents}>
                <div className={styles.UserBlog__anotherBlogContent}>
                    <FaGift className={styles.UserBlog__anotherBlogIcon} />
                    <p>{studentData.dateOfBirth}</p>
                </div>
                <div className={styles.UserBlog__anotherBlogContent}>
                    <FaPhone className={styles.UserBlog__anotherBlogIcon} />
                    <p>{studentData.phoneNumber}</p>
                </div>
                {studentData.introduction && (
                    <div className={styles.UserBlog__anotherBlogContent}>
                        <FaInfoCircle className={styles.UserBlog__anotherBlogIcon} />
                        <p>{studentData.introduction}</p>
                    </div>
                )}
            </div>
        </>
    );
}
export default UserBlog;
