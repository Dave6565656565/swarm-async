"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function PartnersSection() {
  const partners = [
    {
      name: "Layer0",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Layer0-3jXulUW7G8RYYKGQwSQ4lZSgqHh1MA.png",
      url: "https://layer0.network",
    },
    {
      name: "Manti",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/manti-KH0R1wLkWj7NlbocypyQ8u4JxgTOj2.png",
      url: "https://manti.finance",
    },
    {
      name: "NKYC",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nkyc-ZPLWuS4vHOyO3nNlJBhXLVIR7N6XX3.png",
      url: "https://nkyc.org",
    },
  ]

  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-[1024px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Our Partners</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We collaborate with industry leaders to provide the best staking experience
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24 lg:gap-32">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Link
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-auto w-auto max-h-12 md:max-h-16"
                  style={{ objectFit: "contain" }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
