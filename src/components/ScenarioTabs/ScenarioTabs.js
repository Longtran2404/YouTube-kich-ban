import React, { useState } from 'react';
import ScenarioDescription from '../ScenarioDescription/ScenarioDescription';
import ServiceSelection from '../ServiceSelection/ServiceSelection';
import TimeAndTone from '../TimeAndTone/TimeAndTone';
import { services } from '../../data/services';
import { sendToN8N, formatScenarioForN8N } from '../../utils/n8nWebhook';
import './ScenarioTabs.css';

const ScenarioTabs = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [scenarioData, setScenarioData] = useState({
    description: '',
    selectedServices: [],
    duration: '',
    tone: '',
    targetAudience: '',
    additionalNotes: '',
    style: '',
    callToAction: ''
  });

  const tabs = [
    {
      id: 'description',
      name: 'Mô tả kịch bản',
      icon: '📝',
      component: ScenarioDescription
    },
    {
      id: 'services',
      name: 'Thẻ dịch vụ',
      icon: '🏥',
      component: ServiceSelection
    },
    {
      id: 'time-tone',
      name: 'Thời gian & Tone',
      icon: '⏰',
      component: TimeAndTone
    }
  ];

  const handleDataUpdate = (tabId, data) => {
    setScenarioData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleSubmitScenario = async () => {
    try {
      // Get selected service details
      const selectedServiceDetails = services.filter(service => 
        scenarioData.selectedServices.includes(service.id)
      );
      
      // Format data for N8N
      const formattedData = formatScenarioForN8N(scenarioData, selectedServiceDetails);
      
      // Send to N8N
      const result = await sendToN8N(formattedData);
      
      if (result.success) {
        alert(result.message);
        // Reset form
        setScenarioData({
          description: '',
          selectedServices: [],
          duration: '',
          tone: '',
          targetAudience: '',
          additionalNotes: '',
          style: '',
          callToAction: ''
        });
        setActiveTab('description');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting scenario:', error);
      alert('Có lỗi xảy ra khi gửi kịch bản. Vui lòng thử lại!');
    }
  };

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  const isFormComplete = scenarioData.description && scenarioData.selectedServices.length > 0 && scenarioData.duration && scenarioData.tone;

  return (
    <section className="scenario-tabs-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Tạo kịch bản thẩm mỹ</h2>
          <p className="section-subtitle">
            Tạo kịch bản quảng cáo chuyên nghiệp cho dịch vụ thẩm mỹ của bạn
          </p>
        </div>

        <div className="scenario-tabs-container">
          <div className="tab-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-text">{tab.name}</span>
                {activeTab === tab.id && <div className="tab-indicator"></div>}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {ActiveComponent && (
              <ActiveComponent
                data={scenarioData}
                onDataUpdate={(data) => handleDataUpdate(activeTab, data)}
              />
            )}
          </div>

          <div className="scenario-actions">
            <div className="progress-info">
              <span className="progress-text">
                Hoàn thành: {Object.values(scenarioData).filter(val => 
                  Array.isArray(val) ? val.length > 0 : val !== ''
                ).length}/6 bước
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(Object.values(scenarioData).filter(val => 
                    Array.isArray(val) ? val.length > 0 : val !== ''
                  ).length / 6) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className="preview-btn"
                disabled={!isFormComplete}
                onClick={() => console.log('Preview:', scenarioData)}
              >
                <span className="btn-icon">👁️</span>
                Xem trước
              </button>
              <button 
                className="submit-btn"
                disabled={!isFormComplete}
                onClick={handleSubmitScenario}
              >
                <span className="btn-icon">🚀</span>
                Tạo kịch bản
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScenarioTabs;