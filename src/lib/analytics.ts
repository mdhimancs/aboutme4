// Google Analytics 4 (GA4) Telemetry & Security Tracking Utility
export const GA_MEASUREMENT_ID = 'G-7FM99M7G3F';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Generic event tracker with safety fallback
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Security Telemetry: Track password vault attempts (success & failure)
 */
export const trackVaultAttempt = (section: string, success: boolean) => {
  trackEvent(success ? 'security_vault_unlock_success' : 'security_vault_unlock_failed', {
    event_category: 'Security Vault',
    section_name: section,
    result: success ? 'granted' : 'denied'
  });
};

/**
 * Asset Telemetry: Track when executive case studies, blueprints, or playbooks are viewed
 */
export const trackAssetInteraction = (assetId: string, assetTitle: string, assetType: string) => {
  trackEvent('view_executive_asset', {
    event_category: 'Asset Engagement',
    asset_id: assetId,
    asset_title: assetTitle,
    asset_type: assetType
  });
};

/**
 * Lead Telemetry: Track when the contact modal form is submitted
 */
export const trackContactSubmission = (subject: string) => {
  trackEvent('contact_inquiry_sent', {
    event_category: 'Contact',
    inquiry_type: subject
  });
};
