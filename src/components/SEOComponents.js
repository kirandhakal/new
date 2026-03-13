import React from 'react';
import { Helmet } from 'react-helmet';

export const StructuredData = ({ data }) => {
  if (!data) return null;
  
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};


export const PageMeta = ({ 
  title, 
  description, 
  keywords, 
  ogImage,
  url,
  type = "website"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={description} />
      <meta name="og:type" property="og:type" content={type} />
      {ogImage && <meta name="og:image" property="og:image" content={ogImage} />}
      {url && <meta name="og:url" property="og:url" content={url} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
};


export const useSEO = () => {
  const setPageMeta = (metaData) => {
    document.title = metaData.title;
    
    const updateMetaTag = (name, content, property = false) => {
      let element = document.querySelector(
        property 
          ? `meta[property="${name}"]`
          : `meta[name="${name}"]`
      );
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    updateMetaTag('description', metaData.description);
    if (metaData.keywords) updateMetaTag('keywords', metaData.keywords);
    updateMetaTag('og:title', metaData.title, true);
    updateMetaTag('og:description', metaData.description, true);
    if (metaData.ogImage) {
      updateMetaTag('og:image', metaData.ogImage, true);
    }
  };

  const addStructuredData = (data) => {
    // Remove existing script tag if present
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  return { setPageMeta, addStructuredData };
};

export default StructuredData;
