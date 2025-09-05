import React, { useState, useEffect } from 'react';
import './ScenarioDescription.css';

const ScenarioDescription = ({ data, onDataUpdate }) => {
  const [formData, setFormData] = useState({
    description: data.description || '',
    targetAudience: data.targetAudience || '',
    additionalNotes: data.additionalNotes || ''
  });

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const targetAudiences = [
    { value: 'women-20-35', label: 'Phụ nữ 20-35 tuổi', icon: '👩' },
    { value: 'women-35-50', label: 'Phụ nữ 35-50 tuổi', icon: '👩‍💼' },
    { value: 'men-25-40', label: 'Nam giới 25-40 tuổi', icon: '👨' },
    { value: 'lgbtq', label: 'Cộng đồng LGBTQ+', icon: '🏳️‍⚧️' },
    { value: 'general', label: 'Khách hàng tổng quát', icon: '👥' }
  ];

  return (
    <div className="scenario-description">
      <div className="form-section">
        <h3 className="form-section-title">
          <span className="section-icon">📝</span>
          Mô tả kịch bản chính
        </h3>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Nội dung kịch bản *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mô tả chi tiết kịch bản quảng cáo của bạn. Ví dụ: Một người phụ nữ trung niên cảm thấy tự ti về vẻ ngoại hình, sau khi đến ICSAI Studio, cô ấy đã lấy lại tự tin và xinh đẹp hơn..."
            className="form-textarea large"
            rows="6"
            required
          />
          <div className="char-count">
            {formData.description.length}/1000 ký tự
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">
          <span className="section-icon">🎯</span>
          Đối tượng mục tiêu
        </h3>
        
        <div className="target-audience-grid">
          {targetAudiences.map(audience => (
            <div
              key={audience.value}
              className={`audience-card ${formData.targetAudience === audience.value ? 'selected' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, targetAudience: audience.value }))}
            >
              <div className="audience-icon">{audience.icon}</div>
              <div className="audience-label">{audience.label}</div>
              {formData.targetAudience === audience.value && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">
          <span className="section-icon">💡</span>
          Ghi chú thêm
        </h3>
        
        <div className="form-group">
          <label htmlFor="additionalNotes" className="form-label">
            Yêu cầu đặc biệt
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Các yêu cầu đặc biệt về bối cảnh, diễn viên, phong cách quay, hiệu ứng đặc biệt..."
            className="form-textarea"
            rows="3"
          />
        </div>
      </div>

      <div className="tips-section">
        <h4 className="tips-title">💡 Gợi ý viết kịch bản hiệu quả:</h4>
        <ul className="tips-list">
          <li>Tạo tình huống có thể đồng cảm với khách hàng mục tiêu</li>
          <li>Nhấn mạnh vào lợi ích và kết quả sau khi sử dụng dịch vụ</li>
          <li>Sử dụng ngôn ngữ cảm xúc để tạo kết nối</li>
          <li>Bao gồm call-to-action rõ ràng ở cuối</li>
        </ul>
      </div>
    </div>
  );
};

export default ScenarioDescription;