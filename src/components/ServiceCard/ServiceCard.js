import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="service-card-overlay" onClick={onClose}>
      <div className="service-card-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        
        <div className="service-card-header">
          <div className="service-card-icon">{service.icon}</div>
          <div className="service-card-title-group">
            <h2 className="service-card-title">{service.name}</h2>
            <span className="service-card-category">{service.category}</span>
          </div>
        </div>

        <div className="service-card-content">
          <div className="service-card-description">
            <h3>Mô tả chi tiết</h3>
            <p>{service.fullDesc}</p>
          </div>

          <div className="service-card-info">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <span className="info-icon">💰</span>
                  Giá dịch vụ
                </div>
                <div className="info-value">{service.price}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <span className="info-icon">⏱️</span>
                  Thời gian thực hiện
                </div>
                <div className="info-value">{service.duration}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <span className="info-icon">🔄</span>
                  Thời gian hồi phục
                </div>
                <div className="info-value">{service.recovery}</div>
              </div>

              <div className="info-item full-width">
                <div className="info-label">
                  <span className="info-icon">📋</span>
                  Loại dịch vụ
                </div>
                <div className="info-value category-badge">{service.category}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="service-card-actions">
          <button className="consultation-btn">
            <span className="btn-icon">💬</span>
            Tư vấn miễn phí
          </button>
          <button className="booking-btn">
            <span className="btn-icon">📅</span>
            Đặt lịch hẹn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;