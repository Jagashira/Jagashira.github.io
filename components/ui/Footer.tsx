const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/Jagashira"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"
          >
            <span className="sr-only">GitHub</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19c-4.3 1.4 -4.3-2.5 -6-3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
              />
            </svg>
          </a>

          <a
            href="mailto:pyprogjas.3104@gmail.com"
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"
          >
            <span className="sr-only">Email</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
              />
            </svg>
          </a>
        </div>
        <p className="mt-8 text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Satoshi Egashira. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; // 必要に応じてエクスポート
