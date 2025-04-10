"use client"

export function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "StakeETH Portal",
    url: "https://stakeethportal.com",
    description:
      "Stake your ETH and earn 15% APY rewards with our secure staking platform. The most trusted Ethereum staking service with flexible terms and low fees.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://stakeethportal.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StakeETH Portal",
    url: "https://stakeethportal.com",
    logo: "https://stakeethportal.com/logo.png",
    sameAs: [
      "https://twitter.com/stakeethportal",
      "https://github.com/stakeethportal",
      "https://discord.gg/stakeethportal",
    ],
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ethereum Staking",
    provider: {
      "@type": "Organization",
      name: "StakeETH Portal",
    },
    description: "Stake your ETH and earn 15% APY rewards with our secure staking platform.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ETH",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  )
}
