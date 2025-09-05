import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h2 className="hero-title">Nâng tầm vẻ đẹp với công nghệ hiện đại</h2>
          <p className="hero-description">
            Trung tâm thẩm mỹ uy tín với đội ngũ bác sĩ chuyên nghiệp, 
            công nghệ tiên tiến và dịch vụ chăm sóc tận tình.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Ca phẫu thuật thành công</span>
            </div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Năm kinh nghiệm</span>
            </div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Khách hàng hài lòng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;