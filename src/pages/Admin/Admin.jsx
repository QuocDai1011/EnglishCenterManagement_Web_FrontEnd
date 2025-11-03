import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import Header from '~/layouts/component/Header/Header'
import SideBar from '~/layouts/component/Sidebar/Sidebar'
import Post from '~/layouts/component/Post/Post';
import { MessageCircle, Send } from 'lucide-react';
import { LiaRobotSolid } from "react-icons/lia";
import { PiHandsClapping } from "react-icons/pi";
import ChatBox from '~/layouts/component/ChatBox';

import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);

function Admin() {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleClickChat = () =>{
        const text = document.getElementById('text');
        const box = document.getElementById('box');
        const content = document.getElementById('content');


        box.style.display = 'none';
        text.style.display = 'flex';
        content.style.display = 'flex';
        setShowInput(!showInput);
    }

    const handleClick = () => {
        setIsOpen(!isOpen);
    }




    return (
        <>
            <Header />
            <div className={cx('container')}>
                <SideBar />

                <div className={cx('main')}>
                    {/* section main */}
                    <Post />
                    {/* right bar */}
                    <div className={cx('right-bar')}>
                        <div className={cx('right-bar__inner')}>
                            <div className={cx('scroll-bar')}>
                                <div className={cx('birthday-today')}>
                                    <p>Sinh nhật hôm nay</p>
                                    <img src='/images/birthday.dbd23cbf.svg' alt='birthday' />
                                    <p className={cx('label')}>No one</p>
                                </div>

                                <div className={cx('upcoming-birthday')}>
                                    <p>Sinh nhật sắp tới</p>
                                    <div className={cx('birthday-in-month')}></div>
                                    <p className={cx('label')}>Không có sinh nhật trong tuần tới</p>
                                </div>

                                <div className={cx('social-media')}>
                                    <p>Mạng xã hội</p>
                                    <div className={cx('social-media__body')}></div>
                                </div>

                                <div className={cx('events')}>
                                    <p>Sự kiện</p>
                                    <div className={cx('events-body')}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* chatbox */}
                <ChatBox />

                {/* <div className="fixed right-4 bottom-[0px] z-[999]">
                    <button className="cursor-pointer" onClick={handleClick}>
                        <MessageCircle size={50} />
                    </button>
                </div>


                {isOpen ? (
                    <div className={("min-w-[400px] bg-white rounded-2xl shadow-xl h-full max-h-[420px] overflow-auto mb-[40px] border-red-600 z-[1000] fixed bottom-10 right-4")}>
                        <div className="header bg-blue-600 rounded-s-2xl p-6 text-3xl text-white flex gap-2 items-center"> <LiaRobotSolid size={30} /> Tư vấn hỗ trợ</div>
                        <div id="box" className="content min-h-[260px] p-4 shadow-2xl rounded-xl mt-16">
                            <div className="flex gap-4 bg-slate-500 p-4 rounded-2xl items-center text-white text-2xl ">
                                <PiHandsClapping size={26} />
                                Chào mừng đến với ChatBox Trung Tâm Anh Ngữ Tre Xanh
                            </div>
                            <div className="mt-[100px] flex justify-center items-center  ">
                                <button onClick={handleClickChat} className="max-w-80 p-6 rounded-2xl bg-slate-200">Bắt đầu trò chuyện</button>
                            </div>
                        </div>
                        <div id="content" className="hidden content w-full min-w-[400px] min-h-[280px]">

                        </div>
                        <div id="text" className="m-4 hidden border-gray-400 border-[1px] rounded-2xl relative items-center">
                            <input placeholder="Nhập câu hỏi của bạn" className="p-5  rounded-2xl w-full outline-none  flex items-center"  value={text} onChange={(e) => {setText(e.target.value)}} type="text" />
                            <Send className="absolute top-4 right-4" size={26}/>
                        </div>
                    </div>
                ) :
                (
                    <div></div>
                )} */}
            </div>

        </>
    );
}

export default Admin;