/**
 * API Service for MetaMusk Multi-Agent Backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Health check
 */
export async function getHealth() {
  return fetchAPI('/health');
}

/**
 * Get API info
 */
export async function getApiInfo() {
  return fetchAPI('/');
}

/**
 * Enhance a prompt for video generation
 * @param {Object} params
 * @param {string} params.prompt - User's original prompt
 * @param {string[]} [params.providers] - List of providers to try
 * @param {number} [params.maxRetries] - Maximum retries per provider
 * @param {number} [params.temperature] - LLM temperature (0-1)
 */
export async function enhancePrompt({ prompt, providers, maxRetries = 3, temperature = 0 }) {
  return fetchAPI('/prompt/enhance', {
    method: 'POST',
    body: JSON.stringify({
      prompt,
      providers: providers || ['gemini', 'groq', 'anthropic'],
      max_retries: maxRetries,
      temperature,
    }),
  });
}

/**
 * Generate educational video using multi-agent system
 * @param {Object} params
 * @param {string} params.concept - Educational concept to explain
 * @param {string} [params.userId] - User identifier
 * @param {Object} [params.options] - Additional options
 */
export async function generateVideo({ concept, userId = 'default', options = {} }) {
  return fetchAPI('/agents/generate-video', {
    method: 'POST',
    body: JSON.stringify({
      concept,
      user_id: userId,
      options,
    }),
  });
}

/**
 * Get multi-agent system health
 */
export async function getAgentsHealth() {
  return fetchAPI('/agents/health');
}

/**
 * Get multi-agent system stats
 */
export async function getAgentsStats() {
  return fetchAPI('/agents/stats');
}

/**
 * Get prompt enhancement service health
 */
export async function getPromptHealth() {
  return fetchAPI('/prompt/health');
}

export default {
  getHealth,
  getApiInfo,
  enhancePrompt,
  generateVideo,
  getAgentsHealth,
  getAgentsStats,
  getPromptHealth,
};
