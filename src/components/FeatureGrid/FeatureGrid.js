import React from 'react';
import './FeatureGrid.css';

const FeatureGrid = () => {
  const features = [
    {
      id: 1,
      title: "Công nghệ AI",
      description: "Sử dụng AI tiên tiến để tự động tạo storyboard từ ý tưởng của bạn",
      icon: "🤖",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Chuẩn chuyên nghiệp",
      description: "Tuân thủ các tiêu chuẩn ngành và quy trình sản xuất chuyên nghiệp",
      icon: "⭐",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "Chiến lược nội dung",
      description: "Phân tích và tối ưu hóa nội dung cho từng đối tượng mục tiêu",
      icon: "📊",
      color: "from-green-500 to-blue-600"
    },
    {
      id: 4,
      title: "Câu chuyện & Ý tưởng",
      description: "Biến ý tưởng thành câu chuyện hấp dẫn với cấu trúc rõ ràng",
      icon: "💡",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="feature-grid-section">
      <div className="container">
        <h2 className="section-title">Tính năng nổi bật</h2>
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">
                <span className="icon">{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;