export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://heartcrafted.vercel.app/#org",
        name: "HeartCrafted",
        url: "https://heartcrafted.vercel.app",
        logo: "https://heartcrafted.vercel.app/logo.png",
        description:
          "HeartCrafted is a luxury emotional gifting platform where memories, love stories, and life's most meaningful moments are transformed into handcrafted keepsakes.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Virudhunagar",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          email: "forever@heartcrafted.com",
        },
        sameAs: [
          "https://instagram.com/heartcrafted",
          "https://twitter.com/heartcrafted",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://heartcrafted.vercel.app/#website",
        url: "https://heartcrafted.vercel.app",
        name: "HeartCrafted",
        description: "Crafting Emotions Into Forever",
        publisher: { "@id": "https://heartcrafted.vercel.app/#org" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://heartcrafted.vercel.app/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        name: "HeartCrafted Gift Experiences",
        description: "Premium handcrafted emotional gifting experiences",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Forever Memory Box",
            description:
              "A handcrafted keepsake box holding your most treasured photographs and mementos.",
            url: "https://heartcrafted.vercel.app/#collections",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Love Story Scrapbook",
            description:
              "A luxury editorial scrapbook weaving your love story through curated photographs.",
            url: "https://heartcrafted.vercel.app/#collections",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Voice Memory Frame",
            description:
              "A premium wooden frame embedded with a QR code that plays your recorded voice message.",
            url: "https://heartcrafted.vercel.app/#collections",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
