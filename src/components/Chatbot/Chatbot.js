import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý tư vấn thẩm mỹ của ICSAI Studio. Tôi có thể giúp bạn tìm hiểu về các dịch vụ nào?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Tư vấn nâng ngực",
    "Giá dịch vụ",
    "Đặt lịch hẹn",
    "Thời gian hồi phục",
    "Bảo hành dịch vụ"
  ];

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('nâng ngực')) {
      return "Chúng tôi có 3 loại dịch vụ nâng ngực:\n• Nano chip ergonomix - Túi gel linh hoạt cao cấp\n• Mentor VIP Extra - Full gel, kháng khuẩn tốt\n• Nâng ngực + Treo ngực - Dành cho ngực sa trễ\n\nBạn muốn tìm hiểu loại nào?";
    } else if (message.includes('giá') || message.includes('chi phí')) {
      return "Giá dịch vụ sẽ tùy thuộc vào từng loại và tình trạng cá nhân. Để có báo giá chính xác nhất, bạn có thể:\n• Đặt lịch tư vấn miễn phí\n• Gọi hotline: 1900-xxxx\n• Nhắn tin để được tư vấn chi tiết";
    } else if (message.includes('đặt lịch') || message.includes('hẹn')) {
      return "Để đặt lịch hẹn, bạn có thể:\n• Click vào dịch vụ quan tâm và chọn 'Đặt lịch hẹn'\n• Gọi hotline: 1900-xxxx\n• Để lại thông tin liên hệ, tôi sẽ có nhân viên gọi lại\n\nBạn muốn đặt lịch cho dịch vụ nào?";
    } else if (message.includes('hồi phục') || message.includes('lành')) {
      return "Thời gian hồi phục phụ thuộc vào từng dịch vụ:\n• Nâng mũi: 1-3 tuần\n• Nâng ngực: 2-4 tuần\n• Hút mỡ: 2-4 tuần\n• Cắt mí: 1-2 tuần\n\nChúng tôi sẽ hướng dẫn chăm sóc sau phẫu thuật để tối ưu quá trình hồi phục.";
    } else if (message.includes('bảo hành')) {
      return "Chính sách bảo hành của chúng tôi:\n• Túi nâng ngực Mentor: Bảo hành 10 năm\n• Túi Motiva: Bảo hành trọn đời\n• Các dịch vụ khác: Bảo hành 1-2 năm\n\nChúng tôi cam kết chịu trách nhiệm về kết quả và an toàn khách hàng.";
    } else if (message.includes('xin chào') || message.includes('hello')) {
      return "Xin chào! Rất vui được hỗ trợ bạn. Bạn quan tâm đến dịch vụ thẩm mỹ nào của chúng tôi?";
    } else {
      return "Cảm ơn bạn đã quan tâm! Để được tư vấn chi tiết nhất, bạn có thể:\n• Gọi hotline: 1900-xxxx\n• Đặt lịch tư vấn trực tiếp\n• Hoặc hỏi tôi về các dịch vụ cụ thể như nâng ngực, nâng mũi, hút mỡ...";
    }
  };

  const sendToN8NChatbot = async (messageData) => {
    try {
      const response = await fetch('https://n8n-cosari.tino.page/webhook/icsai-studio-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: messageData.text,
          timestamp: messageData.timestamp.toISOString(),
          sessionId: Date.now(),
          source: 'ICSAI Studio Chatbot'
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Message sent to N8N chatbot webhook successfully');
        return {
          success: true,
          response: result.response || result.message || result.reply
        };
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending to N8N chatbot webhook:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  const handleSendMessage = async (messageText = inputText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Đợi response từ N8N trước
      const n8nResult = await sendToN8NChatbot(userMessage);
      
      let botResponseText;
      if (n8nResult.success && n8nResult.response) {
        // Sử dụng response từ N8N
        botResponseText = n8nResult.response;
      } else {
        // N8N lỗi, sử dụng tin nhắn mẫu local
        console.log('N8N failed, using local response');
        botResponseText = getBotResponse(messageText);
      }

      // Delay để tạo hiệu ứng typing tự nhiên
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: botResponseText,
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 500 + Math.random() * 1000);

    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      // Fallback to local response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getBotResponse(messageText),
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className={`chatbot-widget ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
          <div className="chatbot-avatar">🤖</div>
          <div className="chatbot-info">
            <span className="chatbot-name">Trợ lý tư vấn</span>
            <span className="chatbot-status">● Đang hoạt động</span>
          </div>
          <button className="chatbot-toggle">
            {isOpen ? '−' : '+'}
          </button>
        </div>

        {isOpen && (
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.isBot ? 'bot' : 'user'}`}
                >
                  {message.isBot && (
                    <div className="message-avatar">🤖</div>
                  )}
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>

            <div className="chatbot-input">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                rows="1"
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="send-btn"
              >
                📤
              </button>
            </div>
          </div>
        )}
      </div>

      <div 
        className={`chatbot-fab ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <span className="fab-icon">💬</span>
        <div className="fab-notification">1</div>
      </div>
    </>
  );
};

export default Chatbot;