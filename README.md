# Arone Fritz Portfolio | Web Stack Developer

![Arone Fritz Portfolio](https://github.com/AroneFritz/Aronefritz/raw/main/public/Arone-Fritz.png)

## Overview

I'm Arone Fritz, a passionate Web Stack Developer with expertise in both frontend and backend technologies. This portfolio showcases my projects, skills, and professional experience building modern web applications. I specialize in creating responsive, user-friendly interfaces and robust backend systems.

## 💻 My Skills & Expertise

- **Frontend Development**: React.js, Next.js, HTML5, CSS3, JavaScript (ES6+), TypeScript
- **Backend Development**: Node.js, Express, RESTful APIs, GraphQL, Php Laravel
- **Database Management**: MongoDB, PostgreSQL, MySQL
- **UI/UX Design**: Tailwind CSS, Framer Motion, Responsive Design
- **DevOps & Tools**: Git, GitHub, Vercel, Netlify, CI/CD pipelines
- **Testing & Quality**: Jest, React Testing Library, ESLint

## ✨ Portfolio Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Interactive Animations**: Smooth transitions and engaging UI elements
- **Dynamic Content**: Server-side rendering with Next.js
- **Modern UI**: Clean, accessible design with Tailwind CSS
- **Performance Optimized**: Fast loading times and SEO best practices
- **Testimonial System**: Visitors can submit testimonials that are reviewed before publishing
- **Admin Panel**: Secured admin interface to manage testimonials

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15
- **UI Library**: React 19
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: MongoDB
- **Code Quality**: ESLint & Prettier

## 📁 Project Structure

```
/main-portfolio
├── .next/
│   ├── cache/
│   ├── server/
│   └── static/
├── public/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── testimonials/
│   │   ├── api/
│   │   │   ├── submit-testimonial/
│   │   │   └── testimonials/
│   │   └── page.tsx
│   ├── components/
│   ├── utils/
│   │   ├── models.ts
│   │   └── db.ts
│   └── dummy.json
├── .eslintrc.json
├── .env
├── .env.example
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Project Details

### Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **MongoDB**: A NoSQL database for storing testimonials and other dynamic content.

### Key Files and Directories

- **`app`**: Contains the main application components.
- **`components`**: Contains reusable UI components.
- **`utils`**: Contains utility functions and database models.
- **`src/dummy.json`**: Contains data for the portfolio.
- **`admin`**: Contains the admin panel for managing testimonials.

### Configuration Files

- **`tailwind.config.ts`**: Tailwind CSS configuration.
- **`tsconfig.json`**: TypeScript configuration.
- **`next.config.mjs`**: Next.js configuration.
- **`.env`**: Environment variables for MongoDB connection and other settings.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm package manager
- Git
- MongoDB Atlas account (for testimonial functionality)

### Installation Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/AroneFritz/aronefritzportfolio.git
   ```

2. Navigate to the project directory:

   ```sh
   cd aronefritzportfolio
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Update `NEXT_PUBLIC_APP_URL` with your deployment URL

5. Start the development server:

   ```sh
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### MongoDB Setup

To set up MongoDB for testimonial functionality:

1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient)
3. Create a database user with password
4. Click "Connect" > "Connect your application" and copy the connection string
5. In your `.env` file, replace the `MONGODB_URI` placeholder with your connection string
6. For Vercel deployment, add the `MONGODB_URI` environment variable in the Vercel dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style Guidelines

- Follow the ESLint configuration
- Write meaningful commit messages
- Add appropriate documentation
- Ensure all tests pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or feedback, reach out through:

- Email: lamanilaoarone30@gmail.com
- GitHub: [@AroneFritz](https://github.com/AroneFritz)
- Facebook: [Arone Fritz Lamanilao](https://www.facebook.com/arone.lamanilao/)

---

Built with ❤️ by Arone Fritz Lamanilao
