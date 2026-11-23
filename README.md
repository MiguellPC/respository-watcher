# Repository Watcher

A React app for keeping a list of GitHub repositories and browsing their issues. Add a repository by entering its `owner/repository` name, then view its details and filter or navigate through its issues.

## Table of contents

- [Overview](#overview)
  - [Features](#features)
  - [Links](#links)
- [Getting started](#getting-started)
- [Built with](#built-with)
- [Author](#author)

## Overview

### Features

- Add public GitHub repositories by their `owner/repository` name.
- Keep the repository list in browser local storage.
- Remove repositories from the list.
- View repository details, including its owner, avatar, and description.
- Browse issues filtered by all, open, or closed status.
- Navigate through issues in pages of five.
- Open an issue on GitHub.

### Links

- Repository: [GitHub](https://github.com/MiguellPC/respository-watcher)
- Data source: [GitHub REST API](https://api.github.com/)

## Getting started

### Prerequisites

- Node.js
- Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MiguellPC/respository-watcher.git
   cd respository-watcher
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Open the local URL printed by Vite in your browser.

### Available scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the development server. |
| `yarn build` | Create a production build in `dist`. |
| `yarn preview` | Preview the production build locally. |
| `yarn lint` | Run ESLint. |

## Built with

- React
- JavaScript (JSX)
- Vite
- React Router
- Axios
- styled-components

![Skills](https://skillicons.dev/icons?i=react,js,vite)

## Author

- GitHub - [MiguellPC](https://github.com/MiguellPC)