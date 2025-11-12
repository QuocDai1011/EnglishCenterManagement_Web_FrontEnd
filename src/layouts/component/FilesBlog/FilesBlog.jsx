import React from 'react';
import styles from './FilesBlog.module.scss';
function FilesBlog() {
    return (
        <>
            <h2>File phương tiện</h2>
            <div className={`${styles.FilesBlog__anotherBlogContent} ${styles.FilesBlog__Files}`}></div>
        </>
    );
}
export default FilesBlog;
