import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Minimize2 } from 'lucide-react';
import chatBox from '~/api/ChatBoxService'; // Import service API của bạn
import { IoReloadSharp } from "react-icons/io5";
import debounce from "lodash.debounce";

function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleStartChat = () => {
        setIsStarted(true);
        setMessages([
            {
                id: Date.now(),
                text: "Xin chào! Tôi là trợ lý ảo của Trung Tâm Anh Ngữ Tre Xanh. Tôi có thể giúp gì cho bạn?",
                sender: "bot",
                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
            }
        ]);
    };

    const callChatAPI = async (message, retryCount = 0) => {
        const MAX_RETRIES = 2;
        const RETRY_DELAY = 3000; // 3 giây

        try {
            const response = await chatBox.callApi(message);
            
            if (response.success) {
                return response.answer || 'Xin lỗi, tôi không thể trả lời lúc này.';
            } else {
                throw new Error(response.error || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Error calling chat API:', error);
            
            // Kiểm tra lỗi từ server
            if (error.response) {
                const status = error.response.status;
                
                // Xử lý lỗi 429 - Too Many Requests
                if (status === 429) {
                    if (retryCount < MAX_RETRIES) {
                        // Thử lại sau một khoảng thời gian
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
                        return callChatAPI(message, retryCount + 1);
                    } else {
                        return 'Hệ thống đang quá tải. Vui lòng đợi vài giây và thử lại. 😊';
                    }
                } else if (status === 400) {
                    return 'Tin nhắn không hợp lệ. Vui lòng thử lại.';
                } else if (status === 500) {
                    return 'Xin lỗi, server đang gặp sự cố. Vui lòng thử lại sau.';
                } else if (status === 503) {
                    return 'Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.';
                }
            } else if (error.request) {
                // Request được gửi nhưng không nhận được response
                return 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet.';
            }
            
            return 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.';
        }
    };

    const handleSendMessage = async () => {
        if (inputText.trim() === "" || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: "user",
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputText;
        setInputText("");
        setIsLoading(true);

        // Thêm tin nhắn "đang gõ..."
        const typingMessage = {
            id: Date.now() + 1,
            text: "Đang gõ...",
            sender: "bot",
            time: "",
            isTyping: true
        };
        setMessages(prev => [...prev, typingMessage]);

        try {
            // Call API để lấy response từ server
            const botResponse = await callChatAPI(currentInput);

            // Xóa tin nhắn "đang gõ..." và thêm response thật
            setMessages(prev => {
                const filtered = prev.filter(msg => !msg.isTyping);
                return [
                    ...filtered,
                    {
                        id: Date.now() + 2,
                        text: botResponse,
                        sender: "bot",
                        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                    }
                ];
            });
        } catch (error) {
            // Xử lý lỗi
            setMessages(prev => {
                const filtered = prev.filter(msg => !msg.isTyping);
                return [
                    ...filtered,
                    {
                        id: Date.now() + 2,
                        text: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.",
                        sender: "bot",
                        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                    }
                ];
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSendMessage();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleReset = () => {
        setIsStarted(false);
        setMessages([]);
        setInputText("");
        setIsLoading(false);
    };

    const debouncedSend = useRef(debounce(() => handleSendMessage(), 2000)).current;


    return (
        <div className="fixed right-8 bottom-16 z-[999]">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
                >
                    <MessageCircle size={32} />
                </button>
            )}

            {isOpen && (
                <div className="w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '500px' }}>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                                🤖
                            </div>
                            <div>
                                <h3 className="font-semibold text-3xl">Tư vấn hỗ trợ</h3>
                                <p className="text-2xl text-blue-100"> Trực tuyến</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={handleReset}
                                className="hover:bg-blue-700 p-2 rounded-lg transition"
                                title="Làm mới cuộc trò chuyện"
                            >
                                <IoReloadSharp size={20} />
                            </button>
                            <button 
                                onClick={handleClose}
                                className="hover:bg-blue-700 p-2 rounded-lg transition"
                                title="Đóng"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                        {!isStarted ? (
                            <div className="h-full flex flex-col justify-between">
                                <div className="bg-blue-100 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
                                        <span className="text-2xl">👋</span>
                                        <span>Chào mừng bạn!</span>
                                    </div>
                                    <p className="text-gray-700 text-2xl">
                                        Chào mừng đến với ChatBox Trung Tâm Anh Ngữ Tre Xanh. 
                                        Chúng tôi sẵn sàng hỗ trợ bạn!
                                    </p>
                                </div>
                                <button 
                                    onClick={handleStartChat}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition shadow-md"
                                >
                                    Bắt đầu trò chuyện
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div 
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                            <div 
                                                className={`p-3 rounded-2xl ${
                                                    message.sender === 'user' 
                                                        ? 'bg-blue-600 text-white rounded-br-sm' 
                                                        : message.isTyping
                                                        ? 'bg-gray-200 text-gray-600 rounded-bl-sm shadow-sm'
                                                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                                                }`}
                                            >
                                                {message.isTyping ? (
                                                    <div className="flex gap-1 items-center">
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                    </div>
                                                ) : (
                                                    <p className="text-2xl whitespace-pre-wrap">{message.text}</p>
                                                )}
                                            </div>
                                            {!message.isTyping && (
                                                <p className={`text-xl text-gray-500 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                                    {message.time}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {isStarted && (
                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex gap-2 items-center">
                                <input 
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập câu hỏi của bạn..."
                                    disabled={isLoading}
                                    className="flex-1 p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 transition disabled:bg-gray-100"
                                />
                                <button 
                                    onClick={debouncedSend}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={inputText.trim() === "" || isLoading}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChatBox;