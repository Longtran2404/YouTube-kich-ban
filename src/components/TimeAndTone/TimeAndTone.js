import React, { useState, useEffect } from 'react';
import './TimeAndTone.css';

const TimeAndTone = ({ data, onDataUpdate }) => {
  const [formData, setFormData] = useState({
    duration: data.duration || '',
    tone: data.tone || '',
    style: data.style || '',
    callToAction: data.callToAction || ''
  });

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const durations = [
    { value: '30s', label: '30 giây', desc: 'Ngắn gọn, súc tích', icon: '⚡' },
    { value: '1min', label: '1 phút', desc: 'Phù hợp mạng xã hội', icon: '📱' },
    { value: '2min', label: '2 phút', desc: 'Đầy đủ thông tin', icon: '📺' },
    { value: '3min', label: '3 phút', desc: 'Chi tiết, thuyết phục', icon: '🎬' },
    { value: '5min', label: '5 phút', desc: 'Trình bày chi tiết', icon: '📹' },
    { value: '10min', label: '10 phút', desc: 'Trình bày toàn diện', icon: '🎥' },
    { value: '15min', label: '15 phút', desc: 'Seminar ngắn', icon: '🎪' },
    { value: '30min', label: '30 phút', desc: 'Webinar', icon: '📡' },
    { value: '1h', label: '1 giờ', desc: 'Workshop đầy đủ', icon: '🎯' }
  ];

  const tones = [
    { 
      value: 'professional', 
      label: 'Chuyên nghiệp', 
      desc: 'Trang trọng, uy tín', 
      icon: '👔',
      color: '#60a5fa'
    },
    { 
      value: 'friendly', 
      label: 'Thân thiện', 
      desc: 'Gần gũi, ấm áp', 
      icon: '😊',
      color: '#34d399'
    },
    { 
      value: 'luxury', 
      label: 'Sang trọng', 
      desc: 'Đẳng cấp, cao cấp', 
      icon: '💎',
      color: '#a78bfa'
    },
    { 
      value: 'emotional', 
      label: 'Cảm xúc', 
      desc: 'Chạm đến trái tim', 
      icon: '❤️',
      color: '#f472b6'
    },
    { 
      value: 'energetic', 
      label: 'Năng động', 
      desc: 'Tươi trẻ, sôi động', 
      icon: '🔥',
      color: '#fb923c'
    }
  ];

  const styles = [
    { value: 'testimonial', label: 'Khách hàng chia sẻ', icon: '💬' },
    { value: 'before-after', label: 'Trước - Sau', icon: '↔️' },
    { value: 'process', label: 'Quy trình thực hiện', icon: '📋' },
    { value: 'doctor-intro', label: 'Bác sĩ giới thiệu', icon: '👨‍⚕️' },
    { value: 'lifestyle', label: 'Phong cách sống', icon: '✨' },
    { value: 'education', label: 'Giáo dục - Thông tin', icon: '🎓' }
  ];


  const callToActions = [
    'Đặt lịch tư vấn miễn phí ngay',
    'Gọi hotline: 1900-xxxx',
    'Truy cập website để biết thêm',
    'Nhắn tin để nhận ưu đãi',
    'Đăng ký nhận tư vấn 24/7',
    'Book lịch online nhanh chóng'
  ];

  return (
    <div className="time-and-tone">
      <div className="form-section">
        <h3 className="form-section-title">
          <span className="section-icon">⏰</span>
          Thời lượng video
        </h3>
        
        <div className="duration-grid">
          {durations.map(duration => (
            <div
              key={duration.value}
              className={`duration-card ${formData.duration === duration.value ? 'selected' : ''}`}
              onClick={() => handleChange('duration', duration.value)}
            >
              <div className="duration-icon">{duration.icon}</div>
              <div className="duration-info">
                <h4 className="duration-label">{duration.label}</h4>
                <p className="duration-desc">{duration.desc}</p>
              </div>
              {formData.duration === duration.value && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">
          <span className="section-icon">🎭</span>
          Tone & phong cách
        </h3>
        
        <div className="tone-grid">
          {tones.map(tone => (
            <div
              key={tone.value}
              className={`tone-card ${formData.tone === tone.value ? 'selected' : ''}`}
              onClick={() => handleChange('tone', tone.value)}
              style={{ '--accent-color': tone.color }}
            >
              <div className="tone-icon">{tone.icon}</div>
              <div className="tone-info">
                <h4 className="tone-label">{tone.label}</h4>
                <p className="tone-desc">{tone.desc}</p>
              </div>
              {formData.tone === tone.value && (
                <div className="selected-indicator" style={{ background: tone.color }}>✓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">
          <span className="section-icon">🎬</span>
          Phong cách trình bày
        </h3>
        
        <div className="style-grid">
          {styles.map(style => (
            <div
              key={style.value}
              className={`style-card ${formData.style === style.value ? 'selected' : ''}`}
              onClick={() => handleChange('style', style.value)}
            >
              <span className="style-icon">{style.icon}</span>
              <span className="style-label">{style.label}</span>
              {formData.style === style.value && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>


      <div className="form-section">
        <h3 className="form-section-title">
          <span className="section-icon">📢</span>
          Call to Action
        </h3>
        
        <div className="cta-selection">
          <div className="cta-options">
            {callToActions.map((cta, index) => (
              <button
                key={index}
                className={`cta-option ${formData.callToAction === cta ? 'selected' : ''}`}
                onClick={() => handleChange('callToAction', cta)}
              >
                {cta}
              </button>
            ))}
          </div>
          
          <div className="custom-cta">
            <label className="form-label">Hoặc tự tạo CTA:</label>
            <input
              type="text"
              value={!callToActions.includes(formData.callToAction) ? formData.callToAction : ''}
              onChange={(e) => handleChange('callToAction', e.target.value)}
              placeholder="Nhập call to action tùy chỉnh..."
              className="cta-input"
            />
          </div>
        </div>
      </div>

      <div className="preview-section">
        <h3 className="form-section-title">
          <span className="section-icon">👁️</span>
          Tóm tắt lựa chọn
        </h3>
        
        <div className="preview-content">
          <div className="preview-item">
            <strong>Thời lượng:</strong> {durations.find(d => d.value === formData.duration)?.label || 'Chưa chọn'}
          </div>
          <div className="preview-item">
            <strong>Tone:</strong> {tones.find(t => t.value === formData.tone)?.label || 'Chưa chọn'}
          </div>
          <div className="preview-item">
            <strong>Phong cách:</strong> {styles.find(s => s.value === formData.style)?.label || 'Chưa chọn'}
          </div>
          <div className="preview-item">
            <strong>CTA:</strong> {formData.callToAction || 'Chưa chọn'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAndTone;