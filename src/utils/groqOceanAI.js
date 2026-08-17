/**
 * Groq LLaMA-3 70B Ocean Intelligence Engine
 * Real-time grounded ocean AI using actual CTD data + live satellite streams
 * API: api.groq.com | Model: llama3-70b-8192
 */

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const OCEAN_SCIENTIST_SYSTEM_PROMPT = `You are OceanLens AI — a world-class physical oceanographer and marine scientist. 
You analyze REAL observational data from ARGO robotic floats and satellite telemetry to answer questions about Earth's oceans.

CRITICAL RULES:
1. ONLY base your explanations on the REAL data provided in the user message. Never invent measurements.
2. Always cite the specific float WMO numbers, depths, and real values from the data.
3. Use precise physical oceanography terminology: MLD, thermocline, halocline, pycnocline, ASHSW, BBLSW, AAIW, OMZ, etc.
4. Explain the underlying physical mechanisms (monsoon forcing, river discharge, evaporation, upwelling).
5. Keep responses scientifically accurate, evidence-driven, and 2-4 paragraphs.
6. Format key findings as clear bullet points starting with ●.
7. End with a "Physical Mechanism:" line explaining WHY the pattern exists.
8. Never say "I don't have access to" — you DO have the real data in the message.`;

/**
 * Calls Groq LLaMA-3 70B with real ocean data and returns grounded AI analysis.
 */
export async function generateGroqOceanAnalysis({
  userQuery,
  regionName,
  compareRegionName,
  isComparison,
  selectedFloat,
  compareFloat,
  liveEarthData,
  mld,
  thermocline,
  barrierLayer,
  variable,
  unit
}) {
  if (!GROQ_API_KEY) {
    return { success: false, explanation: null, highlights: [] };
  }

  // Build the rich data context to send to Groq
  const primaryProfile = selectedFloat?.profile?.slice(0, 8) || [];
  const compareProfile = compareFloat?.profile?.slice(0, 8) || [];

  const dataContext = `
=== REAL ARGO FLOAT DATA (WMO #${selectedFloat?.wmo}) ===
Float: ${selectedFloat?.name}
Institution: ${selectedFloat?.institution}
Sensors: ${selectedFloat?.sensors?.join(', ')}
Location: ${selectedFloat?.lat?.toFixed(2)}°N, ${selectedFloat?.lon?.toFixed(2)}°E
Region: ${regionName}
Last Cycle: ${selectedFloat?.cycle} | ${selectedFloat?.lastUpdate}

REAL CTD Vertical Profile (${selectedFloat?.wmo}):
${primaryProfile.map(p => `  ${p.depth}m: Temp=${p.temp}°C  Sal=${p.salinity}PSU  O2=${p.oxygen}μmol/kg  Density=${p.density}kg/m³`).join('\n')}

Calculated Oceanographic Indicators:
  - Mixed Layer Depth (MLD, ΔT=0.2°C): ${mld}m
  - Thermocline Core Depth: ${thermocline?.thermoclineDepth}m (max gradient: ${thermocline?.maxGradient}°C/m)
  - Barrier Layer Thickness: ${barrierLayer?.barrierLayerThickness}m

${liveEarthData ? `=== LIVE SATELLITE DATA (Copernicus Marine / NOAA, ${liveEarthData.timestamp}) ===
  Live SST: ${liveEarthData.sst}°C
  Wave Height: ${liveEarthData.waveHeight}m
  Ocean Current: ${liveEarthData.currentVelocity} km/h @ ${liveEarthData.currentDirection}°
  Source: ${liveEarthData.source}` : ''}

${isComparison && compareFloat ? `=== COMPARISON FLOAT DATA (WMO #${compareFloat.wmo}) ===
Float: ${compareFloat.name}
Region: ${compareRegionName}
Location: ${compareFloat.lat?.toFixed(2)}°N, ${compareFloat.lon?.toFixed(2)}°E

REAL CTD Vertical Profile (${compareFloat.wmo}):
${compareProfile.map(p => `  ${p.depth}m: Temp=${p.temp}°C  Sal=${p.salinity}PSU  O2=${p.oxygen}μmol/kg`).join('\n')}` : ''}
`;

  const userMessage = `User Question: "${userQuery}"

${dataContext}

Based ONLY on this real observational data above, provide a scientific oceanographic analysis of the ${variable} distribution in the ${regionName}${isComparison ? ` compared with ${compareRegionName}` : ''}.

Structure your response as:
1. A 2-3 paragraph scientific explanation grounded in the actual measurements.
2. Key findings as bullet points (each starting with ●).
3. "Physical Mechanism:" section explaining the driving forces.`;

  try {
    const response = await fetch(GROQ_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: OCEAN_SCIENTIST_SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.3,
        max_tokens: 800,
        stream: false
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.warn('Groq API error:', err);
      return { success: false, explanation: null, highlights: [] };
    }

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content || '';

    // Parse bullet points as highlights
    const highlights = rawText
      .split('\n')
      .filter(line => line.trim().startsWith('●') || line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[●\-•]\s*/, '').trim())
      .filter(Boolean)
      .slice(0, 6);

    // Extract mechanism line
    const mechanismMatch = rawText.match(/Physical Mechanism:(.+?)(?:\n\n|$)/s);
    const mechanism = mechanismMatch ? mechanismMatch[1].trim() : null;

    // Clean explanation (remove bullet section and mechanism)
    const cleanExplanation = rawText
      .replace(/Physical Mechanism:.*$/s, '')
      .split('\n')
      .filter(line => !line.trim().startsWith('●') && !line.trim().startsWith('•'))
      .join('\n')
      .trim();

    return {
      success: true,
      explanation: cleanExplanation || rawText,
      highlights,
      mechanism,
      rawText,
      model: data.model,
      tokensUsed: data.usage?.total_tokens
    };

  } catch (error) {
    console.warn('Groq fetch error:', error.message);
    return { success: false, explanation: null, highlights: [] };
  }
}

/**
 * Calls Groq LLaMA-3 70B for a conversational chat interaction.
 */
export async function generateGeneralChatResponse(messages) {
  if (!GROQ_API_KEY) {
    return { 
      success: false, 
      content: "The Groq API key is missing. Please set VITE_GROQ_API_KEY in your .env.local file to use the live AI chatbot." 
    };
  }

  try {
    const response = await fetch(GROQ_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { 
            role: 'system', 
            content: `You are OceanLens AI — a world-class oceanography expert and interactive AI assistant. 
You are friendly, helpful, and mathematically and scientifically rigorous. 
While your primary specialty is Earth's physical oceanography, marine biology, atmospheric dynamics, and the ARGO Float global network, you are fully capable of answering ANY and ALL questions on any topic (including general programming, math, science, history, etc.) with style, clarity, and precision.
Format your responses using clean markdown (bold, italic, lists, code blocks, or inline LaTeX if helpful).`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.warn('Groq API error:', err);
      return { 
        success: false, 
        content: `Error from Groq API: ${err.error?.message || response.statusText}` 
      };
    }

    const data = await response.json();
    return {
      success: true,
      content: data.choices?.[0]?.message?.content || '',
      model: data.model,
      tokensUsed: data.usage?.total_tokens
    };
  } catch (error) {
    console.warn('Groq chat fetch error:', error);
    return { 
      success: false, 
      content: `Failed to connect to AI server: ${error.message}` 
    };
  }
}

