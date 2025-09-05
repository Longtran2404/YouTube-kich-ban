import React, { useState, useEffect } from 'react';
import { services } from '../../data/services';
import './ServiceSelection.css';

const ServiceSelection = ({ data, onDataUpdate }) => {
  const [selectedServices, setSelectedServices] = useState(data.selectedServices || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    onDataUpdate({ selectedServices });
  }, [selectedServices, onDataUpdate]);

  const categories = [
    { id: 'all', name: 'Tất cả', icon: '🏥' },
    { id: 'Nâng ngực', name: 'Nâng ngực', icon: '💎' },
    { id: 'Tạo hình cơ thể', name: 'Tạo hình cơ thể', icon: '💪' },
    { id: 'Thẩm mỹ mặt', name: 'Thẩm mỹ mặt', icon: '✨' },
    { id: 'Thẩm mỹ mắt', name: 'Thẩm mỹ mắt', icon: '👁️' },
    { id: 'Chống lão hóa', name: 'Chống lão hóa', icon: '⏰' },
    { id: 'Chuyển giới', name: 'Chuyển giới', icon: '🏳️‍⚧️' },
    { id: 'Combo', name: 'Combo', icon: '💯' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const handleSelectAll = () => {
    const allFilteredIds = filteredServices.map(service => service.id);
    setSelectedServices(prev => {
      const hasAllFiltered = allFilteredIds.every(id => prev.includes(id));
      if (hasAllFiltered) {
        return prev.filter(id => !allFilteredIds.includes(id));
      } else {
        const newIds = allFilteredIds.filter(id => !prev.includes(id));
        return [...prev, ...newIds];
      }
    });
  };

  const selectedServiceDetails = services.filter(service => 
    selectedServices.includes(service.id)
  );

  return (
    <div className="service-selection">
      <div className="selection-header">
        <h3 className="selection-title">
          <span className="section-icon">🏥</span>
          Chọn dịch vụ cho kịch bản
        </h3>
        <p className="selection-subtitle">
          Chọn một hoặc nhiều dịch vụ để đưa vào kịch bản quảng cáo
        </p>
      </div>

      <div className="selection-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-tab ${filterCategory === category.id ? 'active' : ''}`}
              onClick={() => setFilterCategory(category.id)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="selection-actions">
          <button
            className="select-all-btn"
            onClick={handleSelectAll}
          >
            {filteredServices.every(service => selectedServices.includes(service.id))
              ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
          <span className="selected-count">
            Đã chọn: {selectedServices.length} dịch vụ
          </span>
        </div>
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className={`service-selection-card ${selectedServices.includes(service.id) ? 'selected' : ''}`}
            onClick={() => handleServiceToggle(service.id)}
          >
            <div className="service-checkbox">
              {selectedServices.includes(service.id) && <span>✓</span>}
            </div>
            
            <div className="service-content">
              <div className="service-icon">{service.icon}</div>
              <h4 className="service-name">{service.name}</h4>
              <p className="service-desc">{service.shortDesc}</p>
              
              <div className="service-meta">
                <span className="service-category">{service.category}</span>
                <span className="service-duration">{service.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="selected-services-summary">
          <h4 className="summary-title">Dịch vụ đã chọn ({selectedServices.length})</h4>
          <div className="selected-services-list">
            {selectedServiceDetails.map(service => (
              <div key={service.id} className="selected-service-item">
                <span className="service-icon">{service.icon}</span>
                <span className="service-name">{service.name}</span>
                <button
                  className="remove-service-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceToggle(service.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredServices.length === 0 && (
        <div className="no-services">
          <div className="no-services-icon">🔍</div>
          <h4>Không tìm thấy dịch vụ</h4>
          <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        </div>
      )}
    </div>
  );
};

export default ServiceSelection;