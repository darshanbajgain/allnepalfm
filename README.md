# AllNepalFM - Online Nepali Radio Streaming Platform

## 🎵 Overview

AllNepalFM is a modern, responsive web application that provides access to publicly available Nepali radio stations. The platform allows users to discover, browse, and listen to FM radio stations from across Nepal, organized by province and category.The application offers a seamless and intuitive user experience for listeners worldwide.

## ✨ Features

- **Province-based Browsing**: Discover stations organized by Nepal's provinces
- **Category Filters**: Browse stations by categories (All, Popular, News)
- **Search Functionality**: Find stations by name or other criteria
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Custom Audio Player**: Feature-rich audio player with play/pause, volume control, and station information
- **Light/Dark Mode**: Toggle between light and dark themes
- **Minimizable Player**: Keep listening while browsing with a minimizable player

## 🛠️ Technologies Used

### Frontend

- **React**: UI library for building the user interface
- **React Router**: For navigation and routing
- **Zustand**: State management for a simplified global state
- **TailwindCSS**: Utility-first CSS framework for styling
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **Lucide Icons**: Beautiful, consistent icon set
- **React Draggable**: For the draggable minimized player
- **Axios**: For API requests with mock adapter for development

### Audio

- **Custom Audio Implementation**: Built a custom audio player using the HTML5 Audio API
- **Streaming Support**: Handles live streaming audio with buffering indicators
- **Media Controls**: Play, pause, volume, and station navigation

### Development

- **Vite**: Fast, modern frontend build tool
- **ESLint**: Code linting and formatting
- **PropTypes**: Runtime type checking for React props

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.x recommended)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/darshanbajgain/allnepalfm.git
cd allnepalfm
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Mobile devices (portrait and landscape)
- Tablets
- Desktops and large screens

The UI adapts intelligently to different screen sizes, with a collapsible sidebar on mobile and a persistent sidebar on larger screens.

## 🎧 Audio Player Implementation

The custom audio player was built from scratch using the HTML5 Audio API and React hooks. Key features include:

- **Streaming Support**: Handles live streaming audio sources
- **Buffering Indicators**: Visual feedback during stream loading
- **Volume Control**: Adjustable volume with mute toggle
- **Error Handling**: Graceful error handling for stream issues
- **Minimizable Interface**: Toggle between full and minimized player views
- **Persistent Playback**: Continue listening while browsing different sections
- **Station Information**: Display current station details

Implementation highlights:

- Used React's `useRef` to manage the audio element
- Implemented custom event listeners for audio events (play, pause, buffering)
- Created a responsive UI that adapts to different screen sizes
- Added drag functionality for the minimized player
- Integrated with the global state management for consistent playback state

## 🎨 UI/UX Design

The UI design follows modern web application principles with a focus on:

- **Clean, Minimalist Aesthetic**: Uncluttered interface with focus on content
- **Intuitive Navigation**: Easy-to-understand navigation with clear visual hierarchy
- **Consistent Design Language**: Uniform styling, spacing, and interactions
- **Accessibility**: High contrast ratios and readable typography
- **Visual Feedback**: Clear indicators for loading, playing, and interactive elements

The Spotify-inspired sidebar provides quick access to main sections while the fixed player bar ensures continuous access to playback controls.

## 🔄 State Management

The application uses Zustand for state management, providing:

- **Player State**: Current station, playback status, volume
- **Search State**: Search terms and filters
- **Theme State**: Light/dark mode preferences

This approach allows for a clean, predictable state flow throughout the application.

## 🌐 API and Data

The application uses a mock API during development (via axios-mock-adapter) that simulates:

- Station listings by province
- Station categories and metadata
- Stream URLs and station information

In production, this would connect to a real backend service.

## 🔮 Future Enhancements

- **User Accounts**: Personal profiles with saved preferences
- **Social Sharing**: Share favorite stations with friends
- **Station Reviews**: User ratings and reviews for stations
- **Advanced Search**: More filtering and sorting options
- **Podcast Support**: Add podcast streaming capabilities
- **PWA Implementation**: Make the app installable on devices

## 👨‍💻 Author

Created by Darshan Bajgain

---

Feel free to contribute to this project by submitting issues or pull requests!
