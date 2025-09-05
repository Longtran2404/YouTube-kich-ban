import React, { useState } from 'react';
import './ContentStrategyForm.css';

const ContentStrategyForm = () => {
  const [formData, setFormData] = useState({
    mainIdea: '',
    detailedDescription: '',
    specialRequirements: '',
    targetAudience: '',
    duration: '30-60s'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      alert('Storyboard đang được tạo! Vui lòng đợi...');
    }, 2000);
  };

  return (
    <section className="form-section">
      <div className="container">
        <div className="form-header">
          <h2 className="form-title">Tạo Storyboard AI</h2>
          <p className="form-subtitle">Điền thông tin để AI tạo storyboard chuyên nghiệp cho bạn</p>
        </div>
        
        <form onSubmit={handleSubmit} className="strategy-form">
          <div className="form-group">
            <label htmlFor="mainIdea" className="form-label">
              Ý tưởng chính & Thông điệp cốt lõi *
            </label>
            <textarea
              id="mainIdea"
              name="mainIdea"
              value={formData.mainIdea}
              onChange={handleChange}
              placeholder="Mô tả ý tưởng chính và thông điệp bạn muốn truyền đạt..."
              className="form-textarea"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="detailedDescription" className="form-label">
              Mô tả chi tiết
            </label>
            <textarea
              id="detailedDescription"
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              placeholder="Cung cấp thêm chi tiết về nội dung, bối cảnh, nhân vật..."
              className="form-textarea"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="targetAudience" className="form-label">
                Đối tượng mục tiêu
              </label>
              <select
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Chọn đối tượng mục tiêu</option>
                <option value="children">Trẻ em (6-12 tuổi)</option>
                <option value="teens">Thanh thiếu niên (13-18 tuổi)</option>
                <option value="adults">Người trưởng thành (19-35 tuổi)</option>
                <option value="middle-age">Trung niên (35-55 tuổi)</option>
                <option value="seniors">Người cao tuổi (55+ tuổi)</option>
                <option value="all">Tất cả độ tuổi</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration" className="form-label">
                Thời lượng dự kiến
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-select"
              >
                <option value="15-30s">15-30 giây</option>
                <option value="30-60s">30-60 giây</option>
                <option value="1-2min">1-2 phút</option>
                <option value="2-5min">2-5 phút</option>
                <option value="5min+">Trên 5 phút</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="specialRequirements" className="form-label">
              Yêu cầu đặc biệt
            </label>
            <textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              placeholder="Các yêu cầu đặc biệt về phong cách, tone, màu sắc, hiệu ứng..."
              className="form-textarea"
              rows="2"
            />
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting || !formData.mainIdea.trim()}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Đang tạo storyboard...
              </>
            ) : (
              <>
                <span className="button-icon">🚀</span>
                Tạo Storyboard AI
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContentStrategyForm;