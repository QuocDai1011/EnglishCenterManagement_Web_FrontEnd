import styles from './CreatePost.module.scss';
import ClassName from 'classnames/bind';
import { useState } from 'react';
import { FaPhotoVideo } from "react-icons/fa";
import { Button } from "@mui/material";
import PostDialog from '../../DiaLog/PostDialog'; // Import component mới

const cx = ClassName.bind(styles);

function CreatePost() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={cx('section-main')}>
            <div className={cx('main-inner')}>
                <div className={cx('post')}>
                    <div className={cx('create-post')}>
                        <div className={cx('post-wrap')}>
                            <div className={cx('wrap-image')}>
                                <img src='/images/logo2019_png_1.png' alt='logo' />
                            </div>
                            <Button 
                                className={cx('post-btn')}
                                variant="contained"
                                onClick={handleOpen}
                                sx={{ textTransform: "none", borderRadius: "8px" }}
                            >
                                Tạo bài viết
                            </Button>

                            {/* Dialog Component */}
                            <PostDialog open={open} onClose={handleClose} />
                        </div>
                    </div>

                    <div className={cx('image-video')}>
                        <button className={cx('add-btn')}>
                            <span>
                                <div className={cx('wrap-content')}>
                                    <Button
                                        onClick={handleOpen}
                                        disableRipple
                                        disableFocusRipple
                                        disableTouchRipple
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: "8px",
                                            fontSize: 15,
                                            fontWeight: 400,
                                            color: '#65676b !important',
                                            p: 0,
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                            }
                                        }}
                                        startIcon={<FaPhotoVideo size={26} style={{ marginRight: 0, color: '#65676b !important' }} />}
                                    >
                                        Ảnh/Video
                                    </Button>
                                </div>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;