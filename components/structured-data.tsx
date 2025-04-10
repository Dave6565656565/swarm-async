"use client"

export function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ethereum Staking Platform",
    url: "https://www.ethereumstakingplatform.com",
    logo: "https://www.ethereumstakingplatform.com/logo.png",
    description: "A secure platform for Ethereum staking and earning rewards",
    sameAs: [
      "https://twitter.com/ethstakingplatform",
      "https://github.com/ethstakingplatform",
      "https://discord.gg/ethstakingplatform",
    ],
    foundingDate: "2023",
    founders: [
      {
        "@type": "Person",
        name: "Ethereum Staking Team",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "United States",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@ethereumstakingplatform.com",
    },
  }

  const websiteVerification = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.ethereumstakingplatform.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.ethereumstakingplatform.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteVerification) }} />
    </>
  )
}
