import { useState, useEffect, useRef } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';
import { IoReloadSharp } from 'react-icons/io5';
import debounce from 'lodash.debounce';
import { FaFacebookMessenger } from 'react-icons/fa6';
import axios from 'axios';
import styles from './StudentChatBot.module.scss';
function StudentChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleStartChat = () => {
        setIsStarted(true);
        setMessages([
            {
                id: Date.now(),
                text: 'Xin chào! Tôi là trợ lý ảo của Trung Tâm Anh Ngữ Tre Xanh. Tôi có thể giúp gì cho bạn?',
                sender: 'bot',
                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            },
        ]);
    };

    const callChatAPI = async (message) => {
        try {
            const response = await axios.post('https://localhost:7069/api/Chat/ask', {
                userMessage: message,
            });
            return response.data.answer || 'Xin lỗi, tôi không thể trả lời lúc này.';
        } catch (error) {
            console.error(error);
            return 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.';
        }
    };

    const handleSendMessage = async () => {
        if (inputText.trim() === '' || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMessage]);
        const currentInput = inputText;
        setInputText('');
        setIsLoading(true);

        const typingMessage = {
            id: Date.now() + 1,
            text: 'Đang gõ...',
            sender: 'bot',
            isTyping: true,
        };
        setMessages((prev) => [...prev, typingMessage]);

        const botResponse = await callChatAPI(currentInput);

        setMessages((prev) => {
            const filtered = prev.filter((msg) => !msg.isTyping);
            return [
                ...filtered,
                {
                    id: Date.now() + 2,
                    text: botResponse,
                    sender: 'bot',
                    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                },
            ];
        });

        setIsLoading(false);
    };

    const debouncedSend = useRef(debounce(() => handleSendMessage(), 2000)).current;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) handleSendMessage();
    };

    const handleReset = () => {
        setIsStarted(false);
        setMessages([]);
        setInputText('');
        setIsLoading(false);
    };

    return (
        <div className={styles.StudentChatBot}>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`${styles.StudentChatBot__openButton} bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110`}
                >
                    <FaFacebookMessenger size={32} />
                </button>
            )}

            {isOpen && (
                <div
                    className={`${styles.StudentChatBot__chatbox} w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
                    style={{ height: '500px' }}
                >
                    <div
                        className={`${styles.StudentChatBot__headerChat} bg-green-600 p-4 flex justify-between items-center text-white`}
                    >
                        <div className={`${styles.StudentChatBot__headerContainer} flex items-center gap-2`}>
                            <div
                                className={`${styles.StudentChatBot__headerAvatar} w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-xl`}
                            >
                                <BiSupport />
                            </div>
                            <div className={`${styles.StudentChatBot__headerInfo} flex flex-col`}>
                                <h3 className={`${styles.StudentChatBot__headerTitle} font-semibold text-2xl`}>
                                    Tư vấn hỗ trợ
                                </h3>
                                <p className={`${styles.StudentChatBot__headerSubtitle} text-lg text-green-100`}>
                                    1 trực tuyến
                                </p>
                            </div>
                        </div>
                        <div className={`${styles.StudentChatBot__headerActions} flex gap-2`}>
                            <button
                                onClick={handleReset}
                                className={`${styles.StudentChatBot__headerActionButton} ${styles.StudentChatBot__resetButton} hover:bg-green-700 p-2 rounded-lg transition`}
                            >
                                <IoReloadSharp size={20} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={`${styles.StudentChatBot__headerActionButton} ${styles.StudentChatBot__closeButton} hover:bg-green-700 p-2 rounded-lg transition`}
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                    </div>

                    <div className={`${styles.StudentChatBot__content} flex-1 overflow-y-auto bg-gray-50 p-4`}>
                        {!isStarted ? (
                            <div
                                className={`${styles.StudentChatBot__welcomeMessage} h-full flex flex-col justify-between`}
                            >
                                <div
                                    className={`${styles.StudentChatBot__welcomeText} bg-green-100 p-4 rounded-xl text-gray-700 text-lg`}
                                >
                                    👋 Chào mừng đến với ChatBox Trung Tâm Anh Ngữ Tre Xanh. Chúng tôi sẵn sàng hỗ trợ
                                    bạn!
                                </div>
                                <button
                                    onClick={handleStartChat}
                                    className={`${styles.StudentChatBot__startButton} bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition shadow-md`}
                                >
                                    Bắt đầu trò chuyện
                                </button>
                            </div>
                        ) : (
                            <div className={styles.StudentChatBot__messages}>
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`${styles.StudentChatBot__messageWrapper} ${
                                            message.sender === 'user'
                                                ? styles['StudentChatBot__messageWrapper--user']
                                                : styles['StudentChatBot__messageWrapper--bot']
                                        }`}
                                        style={{
                                            display: 'flex',
                                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                        }}
                                    >
                                        <div
                                            className={`${styles.StudentChatBot__message} ${
                                                message.sender === 'user'
                                                    ? styles['StudentChatBot__message--user']
                                                    : message.isTyping
                                                    ? styles['StudentChatBot__message--typing']
                                                    : styles['StudentChatBot__message--bot']
                                            }`}
                                            style={{
                                                maxWidth: '75%',
                                                padding: '0.75rem',
                                                borderRadius: '1rem',
                                                backgroundColor:
                                                    message.sender === 'user'
                                                        ? '#16a34a'
                                                        : message.isTyping
                                                        ? '#e5e7eb'
                                                        : '#ffffff',
                                                color: message.sender === 'user' ? '#ffffff' : '#111827',
                                                boxShadow:
                                                    message.sender === 'user' ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                                                position: 'relative',
                                            }}
                                        >
                                            {message.isTyping ? (
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
                                                </div>
                                            ) : (
                                                <p className="whitespace-pre-wrap">{message.text}</p>
                                            )}
                                            {!message.isTyping && (
                                                <span
                                                    className="absolute text-xs text-gray-500"
                                                    style={{
                                                        left: '0',
                                                        bottom: '-32px',
                                                    }}
                                                >
                                                    {message.time}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>
                    {isStarted && (
                        <div
                            className={`${styles.StudentChatBot__input} p-3 bg-white border-t border-gray-200 flex gap-2`}
                        >
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Nhập câu hỏi..."
                                className="flex-1 p-2 border border-gray-300 rounded-xl outline-none focus:border-green-500"
                            />
                            <button
                                onClick={debouncedSend}
                                disabled={isLoading || inputText.trim() === ''}
                                className={`${styles.StudentChatBot__sendButton} bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition`}
                            >
                                <FiSend size={20} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default StudentChatBot;
