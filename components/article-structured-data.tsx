"use client"

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  author,
  images,
}: {
  title: string
  description: string
  datePublished: string
  dateModified: string
  author: { name: string; url: string }
  images: string[]
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: images,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    publisher: {
      "@type": "Organization",
      name: "StakeETH",
      logo: {
        "@type": "ImageObject",
        url: "https://stakeeth.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://stakeeth.com/articles/best-eth-staking-platforms",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
