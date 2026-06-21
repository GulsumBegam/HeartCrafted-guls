# HeartCrafted 💌

**Crafting Emotions Into Forever.**

A luxury emotional gifting platform that transforms memories, love stories, friendships, and life's most meaningful moments into handcrafted keepsakes.

**Live site:** [heartcrafted-guls.vercel.app](https://heartcrafted-guls.vercel.app)

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=flat&logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
</p>

## Demo

![HeartCrafted demo](./heartcrafted_demo.gif)

## ✨ Features

- **AI Gift Matcher** — a guided 4-question quiz (recipient, occasion, what matters most, style) that recommends the perfect handcrafted gift
- **Bespoke Gift Builder** — a "Tell Us Your Story" flow where customers share memories, photos, and emotions for artisans to craft into a custom keepsake
- **Curated Collections** — browse handcrafted gifts like the Forever Memory Box, Love Story Scrapbook, Friendship Legacy Kit, and Voice Memory Frame
- **Stories & Testimonials** — real customer stories showcasing the emotional impact of each gift
- **Memory Gallery** — a visual showcase of past handcrafted keepsakes
- **Contact & Newsletter** — direct inquiry form plus an email subscription for gift inspiration and early access

## 📸 Screenshots

<table>
  <tr>
    <td width="50%"><img src="./01-hero.png" alt="Homepage hero" /><br/><sub align="center">Homepage — Crafting Emotions Into Forever</sub></td>
    <td width="50%"><img src="./02-collections.png" alt="Collections" /><br/><sub>Curated gift collections</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="./04-ai-matcher.png" alt="AI Gift Matcher" /><br/><sub>AI Gift Matcher — guided quiz</sub></td>
    <td width="50%"><img src="./05-match-result.png" alt="AI match result" /><br/><sub>Perfect match result</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="./03-builder.png" alt="Bespoke gift builder" /><br/><sub>Bespoke Gift Builder — tell your story</sub></td>
    <td width="50%"><img src="./06-stories.png" alt="Customer stories" /><br/><sub>Stories that made us cry (happily)</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="./07-gallery.png" alt="Memory gallery" /><br/><sub>Memory Gallery — crafted with love</sub></td>
    <td width="50%"><img src="./08-about.png" alt="About page" /><br/><sub>About — born from a gift that changed everything</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="./09-contact.png" alt="Contact page" /><br/><sub>Let's craft something special</sub></td>
    <td width="50%"></td>
  </tr>
</table>

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router) + [React 19](https://react.dev)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **Database / ORM:** [Prisma 7](https://www.prisma.io)
- **Animation:** [GSAP](https://gsap.com) (with `@gsap/react`), [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/) smooth scroll
- **Media:** [Cloudinary](https://cloudinary.com) via `next-cloudinary`
- **Forms & validation:** [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Email:** [Resend](https://resend.com)
- **Icons:** [Lucide](https://lucide.dev)
- **Linting:** ESLint 9

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+ recommended)
- A package manager: npm, yarn, pnpm, or bun
- A PostgreSQL (or your configured) database for Prisma
- Cloudinary and Resend API credentials (for media uploads and email)

### Installation

```bash
git clone https://github.com/GulsumBegam/HeartCrafted-guls.git
cd HeartCrafted-guls
npm install
```

### Environment Variables

Create a `.env` file in the project root with the variables your setup needs, for example:

```env
DATABASE_URL="postgresql://user:password@host:5432/heartcrafted"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RESEND_API_KEY=your_resend_api_key
```

> Check `prisma/schema.prisma` and the codebase for the exact variable names your instance expects.

### Database Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📜 Available Scripts

| Script          | Description                   |
| ---------------- | ------------------------------ |
| `npm run dev`   | Start the development server   |
| `npm run build` | Build the app for production   |
| `npm run start` | Start the production server    |
| `npm run lint`  | Run ESLint                     |

## 📁 Project Structure

```
HeartCrafted-guls/
├── prisma/       # Prisma schema & migrations
├── public/       # Static assets
├── src/          # Application source (pages/components/lib, etc.)
├── next.config.ts
├── tsconfig.json
└── package.json
```

## ☁️ Deployment

The easiest way to deploy this app is via [Vercel](https://vercel.com/new), the platform from the creators of Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

## 📬 Contact

Have a vision for a gift, a story to share, or a question? Reach out via the [contact page](https://heartcrafted-guls.vercel.app/#contact) on the live site.

## 📄 License

No license has been specified yet for this repository. Consider adding one (e.g. MIT) if you intend for others to use or contribute to this project.
