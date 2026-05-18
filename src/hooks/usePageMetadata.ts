import { useEffect } from "react";

interface PageMetadataOptions {
  title: string;
  description: string;
  robots?: string;
  image?: string;
  type?: string;
}

const ensureMetaTag = (selector: string, create: () => HTMLMetaElement) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (existing) {
    return existing;
  }

  const tag = create();
  document.head.appendChild(tag);

  return tag;
};

const ensureCanonicalLink = () => {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (existing) {
    return existing;
  }

  const link = document.createElement("link");
  link.setAttribute("rel", "canonical");
  document.head.appendChild(link);

  return link;
};

export const usePageMetadata = ({
  title,
  description,
  robots = "index, follow",
  image = "/assets/img/image1.webp",
  type = "website",
}: PageMetadataOptions) => {
  useEffect(() => {
    const previousTitle = document.title;

    const metaDescription = ensureMetaTag('meta[name="description"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      return tag;
    });

    const metaRobots = ensureMetaTag('meta[name="robots"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      return tag;
    });

    const ogTitle = ensureMetaTag('meta[property="og:title"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:title");
      return tag;
    });

    const ogDescription = ensureMetaTag('meta[property="og:description"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:description");
      return tag;
    });

    const ogUrl = ensureMetaTag('meta[property="og:url"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:url");
      return tag;
    });

    const ogImage = ensureMetaTag('meta[property="og:image"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:image");
      return tag;
    });

    const ogType = ensureMetaTag('meta[property="og:type"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:type");
      return tag;
    });

    const ogLocale = ensureMetaTag('meta[property="og:locale"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:locale");
      return tag;
    });

    const twitterTitle = ensureMetaTag('meta[property="twitter:title"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "twitter:title");
      return tag;
    });

    const twitterDescription = ensureMetaTag('meta[property="twitter:description"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "twitter:description");
      return tag;
    });

    const twitterImage = ensureMetaTag('meta[property="twitter:image"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "twitter:image");
      return tag;
    });

    const canonicalLink = ensureCanonicalLink();
    const canonicalHref = window.location.href;
    const imageUrl = image.startsWith("http") ? image : `${window.location.origin}${image}`;

    const previousValues = {
      description: metaDescription.getAttribute("content"),
      robots: metaRobots.getAttribute("content"),
      ogTitle: ogTitle.getAttribute("content"),
      ogDescription: ogDescription.getAttribute("content"),
      ogUrl: ogUrl.getAttribute("content"),
      ogImage: ogImage.getAttribute("content"),
      ogType: ogType.getAttribute("content"),
      ogLocale: ogLocale.getAttribute("content"),
      twitterTitle: twitterTitle.getAttribute("content"),
      twitterDescription: twitterDescription.getAttribute("content"),
      twitterImage: twitterImage.getAttribute("content"),
      canonical: canonicalLink.getAttribute("href"),
    };

    document.title = title;
    metaDescription.setAttribute("content", description);
    metaRobots.setAttribute("content", robots);
    ogTitle.setAttribute("content", title);
    ogDescription.setAttribute("content", description);
    ogUrl.setAttribute("content", canonicalHref);
    ogImage.setAttribute("content", imageUrl);
    ogType.setAttribute("content", type);
    ogLocale.setAttribute("content", "es_CO");
    twitterTitle.setAttribute("content", title);
    twitterDescription.setAttribute("content", description);
    twitterImage.setAttribute("content", imageUrl);
    canonicalLink.setAttribute("href", canonicalHref);

    return () => {
      document.title = previousTitle;

      const restore = (element: HTMLMetaElement | HTMLLinkElement, value: string | null) => {
        if (value === null) {
          element.removeAttribute("content");

          if (element instanceof HTMLLinkElement) {
            element.removeAttribute("href");
          }

          return;
        }

        if (element instanceof HTMLLinkElement) {
          element.setAttribute("href", value);
          return;
        }

        element.setAttribute("content", value);
      };

      restore(metaDescription, previousValues.description);
      restore(metaRobots, previousValues.robots);
      restore(ogTitle, previousValues.ogTitle);
      restore(ogDescription, previousValues.ogDescription);
      restore(ogUrl, previousValues.ogUrl);
      restore(ogImage, previousValues.ogImage);
      restore(ogType, previousValues.ogType);
      restore(ogLocale, previousValues.ogLocale);
      restore(twitterTitle, previousValues.twitterTitle);
      restore(twitterDescription, previousValues.twitterDescription);
      restore(twitterImage, previousValues.twitterImage);
      restore(canonicalLink, previousValues.canonical);
    };
  }, [description, image, robots, title, type]);
};
