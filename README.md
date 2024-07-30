# Educational Establishments

This project is a web application for managing educational establishments. The application is built using React, TypeScript, and various other modern web development tools. It includes features such as Google Maps integration, form validation

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 18 or higher)
- pnpm (recommend 9.6.0 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deividassaltupis/educational-establishments.git
   cd educational-establishments
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add your environment variables. For example:

development:

```env
PROXY_SERVER_URL_SCHEME=http://
PROXY_SERVER_HOST=127.0.0.1:5000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NODE_ENV=development
```

production:

```env
PROXY_SERVER_URL_SCHEME=https://
PROXY_SERVER_HOST=proxy_server_host
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NODE_ENV=production
```

### Available Scripts

In the project directory, you can run the following scripts:

#### Development

To start the development server with live reloading:

```bash
pnpm run dev
```

This will start the React development server on [http://localhost:3000](http://localhost:3000).

To start the proxy server for the backend:

Firstly you need to build it:

```bash
pnpm run proxy-server-build
```

Start it:

```bash
pnpm run proxy-server-start
```

This will start the React development server on [http://localhost:5000](http://localhost:5000) (default PORT 5000).

Make sure to run the proxy server on a different port (e.g., 5000).


#### Production

To build the project for production:

```bash
pnpm run build
```

This will create a `dist` directory with the production build of the application.

To start the production server:

```bash
pnpm run start
```

This will serve the production build of the application on [http://localhost:3001](http://localhost:3001).

To build and start the proxy server for the backend:

```bash
pnpm run proxy-server-build
pnpm run proxy-server-start
```

### Linting and Formatting

To lint the code using ESLint:

```bash
pnpm run lint
```

To format the code using Prettier:

```bash
pnpm run format
```

## Project Structure

The project structure is as follows:

```
educational-establishments/
├── dist/                   # Production build
├── public/                 # Public assets and index.html
├── server/                 # Backend proxy server
├── src/                    # Source code
│   ├── components/         # React components
|   |── constants/          # Constants
|   |── hooks/              # React hooks
│   ├── layout/             # Layout components
│   ├── routes/             # Route components
│   ├── styles/             # Styling (themes and global styles)
│   ├── types/              # TypeScript files containing types
│   ├── utils/              # Utility functions
│   ├── index.tsx           # Entry point for React application
│   ├── root.tsx            # Root component
├── .env                    # Environment variables
├── package.json            # Project configuration and dependencies
├── rollup.config.js        # Rollup configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.

---

Author: Deividas Šaltupis

If you have any questions, feel free to contact me at deividassaltupis18@gmail.com