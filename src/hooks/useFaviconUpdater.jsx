import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useFaviconUpdater = () => {
  const companyInfo = useSelector((state) => state.company.companyInfo);
  const favicon = companyInfo?.favicon;

  useEffect(() => {
    const defaultFavicon = '/favicon.ico';

    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach((link) => link.remove());

    // Determine favicon URL
    const faviconUrl = favicon
      ? favicon.startsWith('http') ? favicon : `${BASE_URL}${favicon.startsWith('/') ? '' : '/'}${favicon}`
      : defaultFavicon;

    // Add new favicon with sizes (richer support)
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = `${faviconUrl}?v=${new Date().getTime()}`;
    link.sizes = '16x16'; // Add more if you have variants
    document.head.appendChild(link);

    // Optional: Apple touch icon for iOS
    if (favicon) {
      const appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      appleLink.href = faviconUrl;
      document.head.appendChild(appleLink);
    }

    // Error handling (fallback on load error)
    link.onerror = () => {
      link.href = defaultFavicon;
      console.warn('Dynamic favicon failed – using default');
    };

    // Cleanup
    return () => {
      link.remove();
      const appleLink = document.querySelector('link[rel="apple-touch-icon"]');
      if (appleLink) appleLink.remove();
    };
  }, [favicon]); // Re-runs on favicon change
};