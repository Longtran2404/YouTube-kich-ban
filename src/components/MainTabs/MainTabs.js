import React, { useState } from 'react';
import { services } from '../../data/services';
import { sendToN8N, formatScenarioForN8N } from '../../utils/n8nWebhook';
import ServiceCard from '../ServiceCard/ServiceCard';
import ScenarioDescription from '../ScenarioDescription/ScenarioDescription';
// import ServiceSelection from '../ServiceSelection/ServiceSelection';
import TimeAndTone from '../TimeAndTone/TimeAndTone';
import './MainTabs.css';

const MainTabs = () => {
  const [activeMainTab, setActiveMainTab] = useState('services');
  const [activeServiceTab, setActiveServiceTab] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitting: false,
    isWaitingWorkflow: false,
    message: '',
    googleSheetsUrl: ''
  });
  
  // Scenario data
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

  const mainTabs = [
    {
      id: 'services',
      name: 'Dịch vụ & Chọn dịch vụ',
      icon: '🏥',
      desc: 'Xem chi tiết và chọn dịch vụ'
    },
    {
      id: 'scenario-description',
      name: 'Mô tả kịch bản',
      icon: '📝',
      desc: 'Viết nội dung kịch bản'
    },
    {
      id: 'time-tone',
      name: 'Thời gian & Tone',
      icon: '⏰',
      desc: 'Cài đặt thời lượng và phong cách'
    }
  ];

  const serviceCategories = [
    { id: 'all', name: 'Tất cả dịch vụ', icon: '🏥' },
    { id: 'Nâng ngực', name: 'Nâng ngực', icon: '💎' },
    { id: 'Tạo hình cơ thể', name: 'Tạo hình cơ thể', icon: '💪' },
    { id: 'Thẩm mỹ mặt', name: 'Thẩm mỹ mặt', icon: '✨' },
    { id: 'Thẩm mỹ mắt', name: 'Thẩm mỹ mắt', icon: '👁️' },
    { id: 'Chống lão hóa', name: 'Chống lão hóa', icon: '⏰' },
    { id: 'Chuyển giới', name: 'Chuyển giới', icon: '🏳️‍⚧️' },
    { id: 'Combo', name: 'Combo', icon: '💯' }
  ];

  const filteredServices = activeServiceTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeServiceTab);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeServiceDetail = () => {
    setSelectedService(null);
  };

  const handleScenarioDataUpdate = (data) => {
    setScenarioData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleSubmitScenario = async () => {
    // Ngăn nhiều lần submission
    if (submissionStatus.isSubmitting || submissionStatus.isWaitingWorkflow) {
      console.log('Submission already in progress, ignoring...');
      return;
    }

    console.log('=== STARTING SUBMISSION PROCESS ===');
    try {
      // Bắt đầu quá trình gửi
      console.log('Setting submission status to submitting...');
      setSubmissionStatus({
        isSubmitting: true,
        isWaitingWorkflow: false,
        message: 'Đang gửi kịch bản đến N8N...',
        googleSheetsUrl: ''
      });

      const selectedServiceDetails = services.filter(service => 
        scenarioData.selectedServices.includes(service.id)
      );
      
      const formattedData = formatScenarioForN8N(scenarioData, selectedServiceDetails);
      const result = await sendToN8N(formattedData);
      
      if (result.success) {
        // Đã gửi thành công, chờ workflow xử lý
        setSubmissionStatus({
          isSubmitting: false,
          isWaitingWorkflow: true,
          message: 'Kịch bản đã được gửi thành công! Đang xử lý workflow...',
          googleSheetsUrl: ''
        });

        // Giả lập thời gian xử lý workflow (trong thực tế sẽ nhận từ webhook response)
        setTimeout(() => {
          setSubmissionStatus({
            isSubmitting: false,
            isWaitingWorkflow: false,
            message: 'Hoàn thành! Kết quả đã được tạo thành công.',
            googleSheetsUrl: result.googleSheetsUrl
          });

          // Tự động mở Google Sheets sau 2 giây
          setTimeout(() => {
            if (result.googleSheetsUrl) {
              window.open(result.googleSheetsUrl, '_blank');
            }
          }, 2000);
        }, 5000); // Giả lập 5 giây xử lý

        // Reset form sau khi hoàn thành
        setTimeout(() => {
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
          setSubmissionStatus({
            isSubmitting: false,
            isWaitingWorkflow: false,
            message: '',
            googleSheetsUrl: ''
          });
          setActiveMainTab('services');
          console.log('=== SUBMISSION PROCESS COMPLETED AND RESET ===');
        }, 8000); // Reset sau 8 giây
        
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting scenario:', error);
      setSubmissionStatus({
        isSubmitting: false,
        isWaitingWorkflow: false,
        message: 'Có lỗi xảy ra khi gửi kịch bản. Vui lòng thử lại!',
        googleSheetsUrl: ''
      });
      
      // Reset error sau 3 giây
      setTimeout(() => {
        setSubmissionStatus({
          isSubmitting: false,
          isWaitingWorkflow: false,
          message: '',
          googleSheetsUrl: ''
        });
      }, 3000);
    }
  };

  const isFormComplete = scenarioData.description && scenarioData.selectedServices.length > 0 && scenarioData.duration && scenarioData.tone;

  const renderContent = () => {
    switch (activeMainTab) {
      case 'services':
        return (
          <div className="services-content">
            <div className="service-tabs">
              {serviceCategories.map(category => (
                <button
                  key={category.id}
                  className={`service-tab-button ${activeServiceTab === category.id ? 'active' : ''}`}
                  onClick={() => setActiveServiceTab(category.id)}
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
                  className={`service-item ${scenarioData.selectedServices.includes(service.id) ? 'selected' : ''}`}
                  onClick={() => {
                    const newSelected = scenarioData.selectedServices.includes(service.id)
                      ? scenarioData.selectedServices.filter(id => id !== service.id)
                      : [...scenarioData.selectedServices, service.id];
                    handleScenarioDataUpdate({ selectedServices: newSelected });
                  }}
                >
                  <div className="service-checkbox">
                    {scenarioData.selectedServices.includes(service.id) && <span>✓</span>}
                  </div>
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-short-desc">{service.shortDesc}</p>
                  <div className="service-meta">
                    <span className="service-duration">⏱️ {service.duration}</span>
                    <span className="service-recovery">🔄 {service.recovery}</span>
                  </div>
                  <button 
                    className="service-detail-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                  >
                    Xem chi tiết →
                  </button>
                </div>
              ))}
            </div>

            {scenarioData.selectedServices.length > 0 && (
              <div className="selected-services-summary">
                <h4 className="summary-title">
                  Dịch vụ đã chọn ({scenarioData.selectedServices.length})
                </h4>
                <div className="selected-services-list">
                  {services.filter(service => 
                    scenarioData.selectedServices.includes(service.id)
                  ).map(service => (
                    <div key={service.id} className="selected-service-item">
                      <span className="service-icon">{service.icon}</span>
                      <span className="service-name">{service.name}</span>
                      <button
                        className="remove-service-btn"
                        onClick={() => {
                          const newSelected = scenarioData.selectedServices.filter(id => id !== service.id);
                          handleScenarioDataUpdate({ selectedServices: newSelected });
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'scenario-description':
        return (
          <ScenarioDescription 
            data={scenarioData}
            onDataUpdate={handleScenarioDataUpdate}
          />
        );

      case 'time-tone':
        return (
          <TimeAndTone 
            data={scenarioData}
            onDataUpdate={handleScenarioDataUpdate}
          />
        );

      default:
        return null;
    }
  };

  return (
    <section className="main-tabs-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Dịch vụ & Tạo kịch bản</h2>
          <p className="section-subtitle">
            Khám phá dịch vụ và tạo kịch bản quảng cáo chuyên nghiệp
          </p>
        </div>

        <div className="main-tabs-container">
          <div className="main-tab-navigation">
            {mainTabs.map(tab => (
              <button
                key={tab.id}
                className={`main-tab-button ${activeMainTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveMainTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <div className="tab-info">
                  <span className="tab-name">{tab.name}</span>
                  <span className="tab-desc">{tab.desc}</span>
                </div>
                {activeMainTab === tab.id && <div className="tab-indicator"></div>}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {renderContent()}
          </div>

          {(activeMainTab === 'scenario-description' || activeMainTab === 'time-tone' || (activeMainTab === 'services' && scenarioData.selectedServices.length > 0)) && (
            <div className="scenario-actions">
              <div className="progress-info">
                <span className="progress-text">
                  Hoàn thành: {Object.values(scenarioData).filter(val => 
                    Array.isArray(val) ? val.length > 0 : val !== ''
                  ).length}/7 bước
                </span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(Object.values(scenarioData).filter(val => 
                      Array.isArray(val) ? val.length > 0 : val !== ''
                    ).length / 7) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Status notification */}
              {console.log('SUBMISSION STATUS:', submissionStatus)}
              {(submissionStatus.isSubmitting || submissionStatus.isWaitingWorkflow || submissionStatus.message) && (
                <div className={`submission-status ${submissionStatus.isSubmitting || submissionStatus.isWaitingWorkflow ? 'processing' : submissionStatus.googleSheetsUrl ? 'success' : 'error'}`}>
                  <div className="status-content">
                    {submissionStatus.isSubmitting && (
                      <div className="status-loading">
                        <div className="loading-spinner"></div>
                        <span>Đang gửi...</span>
                      </div>
                    )}
                    {submissionStatus.isWaitingWorkflow && (
                      <div className="status-loading">
                        <div className="loading-dots">
                          <span></span><span></span><span></span>
                        </div>
                        <span>Đang xử lý workflow...</span>
                      </div>
                    )}
                    <p className="status-message">{submissionStatus.message}</p>
                    {submissionStatus.googleSheetsUrl && (
                      <div className="status-success">
                        <span className="success-icon">✅</span>
                        <a href={submissionStatus.googleSheetsUrl} target="_blank" rel="noopener noreferrer" className="sheets-link">
                          📊 Mở Google Sheets
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="action-buttons">
                <button 
                  className="preview-btn"
                  disabled={!isFormComplete || submissionStatus.isSubmitting || submissionStatus.isWaitingWorkflow}
                  onClick={() => console.log('Preview:', scenarioData)}
                >
                  <span className="btn-icon">👁️</span>
                  Xem trước
                </button>
                <button 
                  className="submit-btn"
                  disabled={!isFormComplete || submissionStatus.isSubmitting || submissionStatus.isWaitingWorkflow}
                  onClick={() => {
                    console.log('SUBMIT BUTTON CLICKED!');
                    console.log('Form complete:', isFormComplete);
                    console.log('Current submission status:', submissionStatus);
                    handleSubmitScenario();
                  }}
                >
                  <span className="btn-icon">
                    {submissionStatus.isSubmitting ? '⏳' : submissionStatus.isWaitingWorkflow ? '🔄' : '🚀'}
                  </span>
                  {submissionStatus.isSubmitting ? 'Đang gửi...' : 
                   submissionStatus.isWaitingWorkflow ? 'Đang xử lý...' : 'Tạo kịch bản'}
                </button>
              </div>
            </div>
          )}
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

export default MainTabs;