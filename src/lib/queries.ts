// All GROQ queries for Sanity CMS

// ── Shared image projection ──────────────────────────────────────────────────
const imageProjection = `{
  "id": asset->_id,
  "fileUrl": asset->url,
  "altText": coalesce(altText, alt),
  "caption": caption
}`;

// ── Section data projection ──────────────────────────────────────────────────
const sectionDataProjection = `{
  hideSection,
  title,
  subtitle,
  description,
  badge,
  badgeText,
  titlePrefix,
  titleHighlight,
  primaryCta,
  secondaryCta,
  embedUrl,
  mapUrl,
  cards[] {
    title,
    description,
    icon,
    link,
    id,
    "image": image ${imageProjection},
    modalContent
  },
  members[] {
    name,
    designation,
    "photo": photo ${imageProjection},
    bio,
    ishighlight,
    link,
    facebook,
    twitter,
    instagram
  },
  slides[] {
    titlePrefix,
    titleHighlight,
    subtitle,
    badge,
    "image": image ${imageProjection},
    primaryCta,
    secondaryCta
  },
  items[] {
    author,
    rating,
    text
  },
  // contactAppointment fields
  location,
  contact,
  appointment,
  // doctorProfile fields
  name,
  specialty,
  "photo": photo ${imageProjection},
  bio,
  socials,
  qualifications,
  awards,
  memberships,
  // healthAwareness fields
  activities[] {
    id,
    title,
    "thumbnail": thumbnail ${imageProjection},
    "slides": slides[] ${imageProjection}
  },
  videoBadgeText,
  videoTitle,
  videoTitleHighlight,
  videos,
  // conditionsList fields
  col1,
  col2
}`;

// ── Site Details ──────────────────────────────────────────────────────────────
export const ALL_SITE_DETAILS_QUERY = `
*[_type == "siteDetail" && published == true] {
  _id,
  key,
  value,
  published
}
`;

// ── Socials ───────────────────────────────────────────────────────────────────
export const ALL_SOCIALS_QUERY = `
*[_type == "social" && status == true] {
  _id,
  socialKey,
  socialValue,
  status
}
`;

// ── Navigation Menu ───────────────────────────────────────────────────────────
export const NAVIGATION_MENU_QUERY = `
*[_type == "navigationMenu" && menuType->name == $menuTypeName][0] {
  _id,
  menuType -> { name },
  items[] {
    menuName,
    title,
    isClickable,
    linkType,
    sortOrder,
    status,
    "pageSlug": page->slug.current,
    externalLink,
    children[] {
      menuName,
      title,
      isClickable,
      linkType,
      sortOrder,
      status,
      "pageSlug": page->slug.current,
      externalLink
    }
  }
}
`;

// ── Pages ─────────────────────────────────────────────────────────────────────
export const PAGE_BY_SLUG_QUERY = `
*[_type == "page" && slug.current == $slug && status == "published"][0] {
  "slug": slug.current,
  title,
  "pageType": pageType->name,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription,
  "ogImage": seo.ogImage ${imageProjection},
  "schemaMarkup": seo.schemaMarkup,
  isIndex,
  publishedAt,
  sections[hideSection != true] {
    "id": _key,
    "sectionType": _type,
    sortOrder,
    hideSection,
    "sectionData": @ ${sectionDataProjection}
  }
}
`;

export const PAGE_BY_TYPE_QUERY = `
*[_type == "page" && pageType->name == $pageTypeName && status == "published"][0] {
  "slug": slug.current,
  title,
  "pageType": pageType->name,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription,
  "ogImage": seo.ogImage ${imageProjection},
  "schemaMarkup": seo.schemaMarkup,
  isIndex,
  publishedAt,
  sections[hideSection != true] {
    "id": _key,
    "sectionType": _type,
    sortOrder,
    hideSection,
    "sectionData": @ ${sectionDataProjection}
  }
}
`;

export const PAGES_SITEMAP_QUERY = `
*[_type == "page" && status == "published" && isIndex != false] | order(_updatedAt desc) {
  "slug": slug.current,
  "updatedAt": _updatedAt
}
`;
