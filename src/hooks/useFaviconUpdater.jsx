import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Fallback for BASE_URL

export const useFaviconUpdater = () => {
  const companyInfo = useSelector((state) => state.company.companyInfo); // Access companyInfo
  const favicon = companyInfo?.favicon; // Extract favicon URL from companyInfo

  useEffect(() => {
    // Fallback favicon if none is provided
    const defaultFavicon = '/favicon.ico'; // Adjust to your default favicon path

    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
    existingLinks.forEach((link) => link.remove());

    // Determine favicon URL
    const faviconUrl = favicon
      ? favicon.startsWith('http')
        ? favicon // Full URL
        : `${BASE_URL}${favicon.startsWith('/') ? '' : '/'}${favicon}` // Relative URL
      : defaultFavicon; // Fallback

    // Add new favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = `${faviconUrl}?v=${new Date().getTime()}`; // Cache busting
    document.head.appendChild(link);

    // Cleanup on unmount
    return () => {
      link.remove();
    };
  }, [favicon]); // Depend on favicon, not companyInfo
};