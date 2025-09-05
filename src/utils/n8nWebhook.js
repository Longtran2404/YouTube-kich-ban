// N8N Webhook utility for sending scenario data
export const sendToN8N = async (scenarioData) => {
  const webhookUrl = 'https://n8n-cosari.tino.page/webhook/kimthi-storyboard';
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...scenarioData,
        timestamp: new Date().toISOString(),
        source: 'ICSAI Studio Website'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
      message: 'Kịch bản đã được gửi thành công!',
      googleSheetsUrl: 'https://docs.google.com/spreadsheets/d/1QQM9vEnkX7rrc7wlMHjJlyJePk8TjAQW3tGNzodOlIw/edit?usp=sharing'
    };
  } catch (error) {
    console.error('Error sending to N8N:', error);
    return {
      success: false,
      error: error.message,
      message: 'Có lỗi xảy ra khi gửi kịch bản. Vui lòng thử lại!'
    };
  }
};

// Format scenario data for N8N
export const formatScenarioForN8N = (scenarioData, selectedServiceDetails) => {
  // Chuyển duration từ string sang giây
  const convertDurationToSeconds = (duration) => {
    if (!duration) return null;
    
    const durationMap = {
      '30s': 30,
      '1min': 60,
      '2min': 120,
      '3min': 180,
      '5min': 300,
      '10min': 600,
      '15min': 900,
      '30min': 1800,
      '1h': 3600
    };
    
    return durationMap[duration] || null;
  };

  return {
    // Cấu trúc theo yêu cầu N8N
    kich_ban: scenarioData.description || "",
    mo_ta: scenarioData.additionalNotes || "",
    nganh_nghe: "Thẩm mỹ", // Mặc định là thẩm mỹ
    dich_vu: selectedServiceDetails.map(service => service.name),
    session_id: `web_${Date.now()}`,
    tone: scenarioData.tone || "",
    duration_sec: convertDurationToSeconds(scenarioData.duration),
    
    // Thêm metadata bổ sung
    _metadata: {
      target_audience: scenarioData.targetAudience,
      style: scenarioData.style,
      call_to_action: scenarioData.callToAction,
      selected_services_details: selectedServiceDetails.map(service => ({
        id: service.id,
        name: service.name,
        category: service.category,
        shortDesc: service.shortDesc,
        duration: service.duration,
        recovery: service.recovery
      })),
      created_at: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct'
    }
  };
};