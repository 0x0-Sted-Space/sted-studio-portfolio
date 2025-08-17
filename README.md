# Sted Studio Portfolio

A modern, responsive portfolio website built with Next.js 15, showcasing creative work, projects, and expertise. This portfolio features a clean design system, internationalization support, and optimized performance.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 18, TypeScript, and Sass
- **Responsive Design**: Optimized for all screen sizes and devices
- **Performance Optimized**: Image optimization, lazy loading, and efficient bundling
- **SEO Ready**: Automatic meta tag generation, structured data, and sitemap
- **Content Management**: MDX support for blog posts and project pages
- **Interactive Components**: Gallery, world map, project showcase, and more
- **Dark/Light Theme**: Built-in theme switching with system preference detection
- **Internationalization**: Multi-language support with next-intl

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Sass/SCSS
- **Content**: MDX
- **Deployment**: Vercel
- **Icons**: React Icons
- **Animations**: CSS transitions and transforms

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd sted-studio-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Customization

### Configuration

Edit the main configuration in `src/app/resources/config.js`:

- Base URL settings
- Theme preferences
- Feature toggles
- Visual effects

### Content

Update content in `src/app/resources/content.js`:

- Personal information
- Project details
- Social links
- About section

### Adding Blog Posts

Create new `.mdx` files in `src/app/[locale]/blog/posts/`

### Adding Projects

Create new `.mdx` files in `src/app/[locale]/work/projects/`

## 🌍 Internationalization

This portfolio supports multiple languages. Configure languages in the config file and add translations in the `messages/` directory.

## 📱 Responsive Design

The portfolio is fully responsive and tested across:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Manual Deployment

```bash
npm run build
npm start
```

## 📊 Performance

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: WebP and AVIF support
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Optimized static asset caching

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).

## 👨‍💻 Author

**Shiva Karan K**

- Email: lucky3aeon@yahoo.com
- GitHub: [@shiva-karan-k](https://github.com/shiva-karan-k)
- LinkedIn: [shiva-karan](https://www.linkedin.com/in/shiva-karan/)
- Twitter: [@Shiva_KaranK](https://x.com/Shiva_KaranK)

## 🙏 Acknowledgments

Built with [Once UI](https://once-ui.com) design system and inspired by modern portfolio best practices.
