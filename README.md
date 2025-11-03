# Influencer Marketing.Ai - Next.js Static Website

A modern, floating header static website built with Next.js, TypeScript, and Tailwind CSS. Features a beautiful floating navigation bar with colorful logo and responsive design.

## Features

- 🚀 **Next.js 14** with TypeScript
- 🎨 **Tailwind CSS** for styling
- 📱 **Responsive Design** - looks great on all devices
- 🎯 **Floating Header** - modern floating navigation bar
- ⚡ **Static Export** - can be deployed anywhere
- 🔍 **SEO Optimized** - built-in SEO features
- 🎨 **Modern UI** - beautiful gradient backgrounds and animations

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

### Building for Production

1. **Build the static site:**

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Export static files:**
   ```bash
   npm run export
   # or
   yarn export
   ```

The static files will be generated in the `out` directory and can be deployed to any static hosting service.

## Project Structure

```
├── components/          # React components
│   ├── Header.tsx      # Floating header with navigation
│   ├── Hero.tsx        # Hero section
│   ├── Features.tsx    # Features section
│   ├── Footer.tsx      # Footer component
│   └── Layout.tsx      # Main layout wrapper
├── pages/              # Next.js pages
│   ├── _app.tsx        # App component
│   ├── _document.tsx   # Document component
│   └── index.tsx       # Home page
├── styles/             # Global styles
│   └── globals.css     # Global CSS with Tailwind
├── public/             # Static assets
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## Customization

### Colors and Branding

The header logo and colors can be customized in:

- `components/Header.tsx` - Logo colors and text
- `tailwind.config.js` - Color palette
- `styles/globals.css` - Global styles

### Content

Update the content in:

- `components/Hero.tsx` - Main headline and description
- `components/Features.tsx` - Feature cards
- `components/Footer.tsx` - Footer links and information

### Styling

The project uses Tailwind CSS for styling. You can:

- Modify `tailwind.config.js` for custom colors and fonts
- Update `styles/globals.css` for global styles
- Use Tailwind classes directly in components

## Deployment

This project is configured for static export and can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Any static hosting service**

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy your site

### Manual Deployment

1. Run `npm run export`
2. Upload the contents of the `out` directory to your hosting service

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Export static files
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the repository or contact the development team.
# influencer-website
