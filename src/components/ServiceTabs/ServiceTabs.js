import React, { useState } from 'react';
import { services } from '../../data/services';
import ServiceCard from '../ServiceCard/ServiceCard';
import './ServiceTabs.css';

const ServiceTabs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const categories = [
    { id: 'all', name: 'Tất cả dịch vụ', icon: '🏥' },
    { id: 'Nâng ngực', name: 'Nâng ngực', icon: '💎' },
    { id: 'Tạo hình cơ thể', name: 'Tạo hình cơ thể', icon: '💪' },
    { id: 'Thẩm mỹ mặt', name: 'Thẩm mỹ mặt', icon: '✨' },
    { id: 'Thẩm mỹ mắt', name: 'Thẩm mỹ mắt', icon: '👁️' },
    { id: 'Chống lão hóa', name: 'Chống lão hóa', icon: '⏰' },
    { id: 'Chuyển giới', name: 'Chuyển giới', icon: '🏳️‍⚧️' },
    { id: 'Combo', name: 'Combo', icon: '💯' }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeTab);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeServiceDetail = () => {
    setSelectedService(null);
  };

  return (
    <section className="service-tabs-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Danh sách dịch vụ</h2>
          <p className="section-subtitle">
            Tìm hiểu chi tiết các dịch vụ thẩm mỹ của chúng tôi
          </p>
        </div>

        <div className="tabs-container">
          <div className="tab-navigation">
            {categories.map(category => (
              <button
                key={category.id}
                className={`tab-button ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-text">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="services-grid">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className="service-item"
                onClick={() => handleServiceClick(service)}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-short-desc">{service.shortDesc}</p>
                <div className="service-meta">
                  <span className="service-duration">⏱️ {service.duration}</span>
                  <span className="service-recovery">🔄 {service.recovery}</span>
                </div>
                <button className="service-detail-btn">Xem chi tiết →</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedService && (
        <ServiceCard 
          service={selectedService} 
          onClose={closeServiceDetail}
        />
      )}
    </section>
  );
};

export default ServiceTabs;