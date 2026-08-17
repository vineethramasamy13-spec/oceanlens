import { useState, useEffect } from 'react';

// Global reactive language state
let currentLang = localStorage.getItem('oceanlens_lang') || 'en';
const listeners = new Set();

export function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('oceanlens_lang', lang);
  listeners.forEach(l => l(lang));
}

export function getLanguage() {
  return currentLang;
}

export function useTranslation() {
  const [lang, setLangState] = useState(currentLang);

  useEffect(() => {
    const listener = (newLang) => setLangState(newLang);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const t = (key) => {
    return translations[key]?.[lang] || translations[key]?.['en'] || key;
  };

  return { t, lang, setLanguage };
}

export const translations = {
  // Navigation / Tabs
  'nav_explorer': { en: 'AI Explorer', hi: 'एआई एक्सप्लोरर' },
  'nav_chatbot': { en: 'AI Chatbot', hi: 'एआई चैटबॉट' },
  'nav_map': { en: 'Ocean Map', hi: 'समुद्र मानचित्र' },
  'nav_data': { en: 'Data Explorer', hi: 'डेटा एक्सप्लोरर' },
  'nav_reports': { en: 'Ocean Reports', hi: 'समुद्र रिपोर्ट' },
  'nav_about': { en: 'About ARGO', hi: 'आरगो के बारे में' },
  'nav_quick_report': { en: 'Quick Report', hi: 'त्वरित रिपोर्ट' },

  // Visualizer Tabs
  'tab_physical': { en: '📈 Physical Profile', hi: '📈 भौतिक प्रोफाइल' },
  'tab_biology': { en: '🐠 Marine Biology', hi: '🐠 समुद्री जीव विज्ञान' },
  'tab_acoustics': { en: '🔊 Sonar Sounding', hi: '🔊 सोनार साउंडिंग' },

  // Physical Indicators
  'mld': { en: 'Mixed Layer Depth (MLD)', hi: 'मिश्रित परत की गहराई (MLD)' },
  'thermocline': { en: 'Thermocline Core Depth', hi: 'थर्मोक्लाइन कोर गहराई' },
  'barrier_layer': { en: 'Barrier Layer Thickness', hi: 'बैरियर परत की मोटाई' },
  'surface_val': { en: 'Surface (0-10m)', hi: 'सतह (0-10 मीटर)' },
  'abyssal_val': { en: 'Abyssal (2000m)', hi: 'अगाध गहराई (2000 मीटर)' },
  'data_source': { en: 'Data Source', hi: 'डेटा स्रोत' },
  'observations': { en: 'Observations', hi: 'अवलोकन' },
  'quality_status': { en: 'Quality Status', hi: 'गुणवत्ता स्थिति' },
  'ai_confidence': { en: 'AI Confidence', hi: 'एआई विश्वसनीयता' },

  // Anomaly Alerts
  'anomaly_alerts': { en: 'AI Anomaly & Hazard Alerts', hi: 'एआई विसंगति और खतरा अलर्ट' },
  'no_anomalies': { en: 'No Active Anomalies Detected', hi: 'कोई सक्रिय विसंगति नहीं मिली' },
  'anomaly_heatwave': { en: 'Marine Heatwave Detected', hi: 'समुद्री हीटवेव पाई गई' },
  'anomaly_freshening': { en: 'Sudden Freshening (Salinity Drop)', hi: 'अचानक लवणता में गिरावट' },
  'anomaly_hypoxia': { en: 'Shallow Hypoxic Zone Warning', hi: 'उथले हाइपोक्सिक क्षेत्र की चेतावनी' },

  // Fisheries advisories
  'fisheries_advisory': { en: 'Fisheries & Coastal Advisory', hi: 'मत्स्य पालन एवं तटीय परामर्श' },
  'tuna_suitability': { en: 'Pelagic Species (Tuna)', hi: 'सतही प्रजातियां (टूना)' },
  'demersal_suitability': { en: 'Demersal Species (Crab/Shrimp)', hi: 'गहरी प्रजातियां (केकड़ा/झींगा)' },

  // Badges & Labels
  'live_feed': { en: 'Live Feed', hi: 'लाइव फीड' },
  'estimated_data': { en: 'Estimated Data', hi: 'अनुमानित डेटा' },
  'estimated_profile': { en: 'Estimated Profile', hi: 'अनुमानित प्रोफाइल' },
  'active': { en: 'Active', hi: 'सक्रिय' },
  'verified': { en: 'Verified', hi: 'सत्यापित' },
  'high': { en: 'High', hi: 'उच्च' },
  'medium': { en: 'Medium', hi: 'मध्यम' },
  'low': { en: 'Low', hi: 'निम्न' },

  // Interactive buttons
  'btn_analyze': { en: 'Analyze', hi: 'विश्लेषण करें' },
  'btn_print': { en: 'Print / Save PDF', hi: 'प्रिंट / पीडीएफ सेव करें' },
  'btn_download': { en: 'Download Markdown', hi: 'मार्कडाउन डाउनलोड' },
  'btn_clear': { en: 'Clear Chat', hi: 'चैट साफ़ करें' },
  'btn_send': { en: 'Send', hi: 'भेजें' },

  // Search input placeholders
  'search_placeholder': { en: 'Search coordinates, float IDs, or ask ocean questions...', hi: 'निर्देशांक, फ्लोट आईडी खोजें, या महासागर के प्रश्न पूछें...' },
  'chat_placeholder': { en: 'Ask me anything about oceanography...', hi: 'महासागर विज्ञान के बारे में कुछ भी पूछें...' },

  // SIH Alignment
  'sih_title': { en: 'Smart India Hackathon (SIH) 2026 Core Alignment', hi: 'स्मार्ट इंडिया हैकाथॉन (SIH) 2026 कोर संरेखण' },
  'system_overview': { en: 'System Pipeline Overview', hi: 'सिस्टम पाइपलाइन अवलोकन' },
  'data_provenance': { en: 'Data Provenance Statement', hi: 'डेटा स्रोत सत्यापन विवरण' },
};
