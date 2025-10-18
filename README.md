# Textmarker

[![Firefox Add-on](https://img.shields.io/amo/v/textmarkerpro.svg)](https://addons.mozilla.org/firefox/addon/textmarkerpro/)

Textmarker is a highly customizable text highlighter for Firefox that allows you to save your highlights for later visits.

## Project Overview

This browser extension allows users to highlight text on web pages with various colors and styles. The highlights are saved and automatically reapplied when the user revisits the page. The extension also provides a user interface for managing and organizing highlights.

## Architecture

The extension is built with JavaScript and follows a modular architecture. The core components are:

*   **Data Store:** The data store is responsible for managing the extension's data, including settings, history, and page notes. It uses a combination of local and sync storage to persist data and sync it across devices. The main logic for the data store is in `src/utils/store.js`.
*   **UI Components:** The UI components are responsible for the user interface of the extension. They are located in the `src/content` directory and are divided into subdirectories for each component (e.g., `sidebar`, `options-ui`, `tbb-menu`).
*   **Background Scripts:** The background scripts are responsible for handling events and managing the extension's state. The main background script is `src/background/main.js`.
*   **Content Scripts:** The content scripts are responsible for interacting with web pages. They are located in the `src/content` directory and are injected into web pages to handle highlighting and other page-specific functionality.

## Getting Started for Contributors

We welcome contributions to Textmarker! To get started, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/textmarker.git
    ```
2.  **Install the dependencies:**
    ```bash
    npm install
    ```
3.  **Load the extension in Firefox:**
    *   Open Firefox and navigate to `about:debugging`.
    *   Click on "This Firefox".
    *   Click on "Load Temporary Add-on".
    *   Select the `manifest.json` file in the root of the repository.

## Contributing

Please follow these guidelines when contributing to Textmarker:

*   **Code Style:** We use ESLint to enforce a consistent code style. Please make sure your code follows the rules in `.eslintrc`.
*   **Commit Messages:** Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for your commit messages.
*   **Pull Requests:** Please open a pull request for any changes you make. We will review your pull request and provide feedback as soon as possible.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
