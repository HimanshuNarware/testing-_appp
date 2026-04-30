# Nari-Shakti: Women's Safety Heatmap (India)

Nari-Shakti is a production-ready, full-stack application designed to visualize crime heatmaps across India. It leverages historical and real-time data to help users identify unsafe areas and provides analytical insights through a map-focused interface.

## 🚀 Features

- **Dynamic Risk Heatmap**: Street-level granularity for crime hotspots across India.
- **Advanced Map Controls**: Switch between Political, Geographic, Terrain, and Minimal map styles.
- **City Intelligence**: Comprehensive data coverage for 20+ major Indian cities, including links to official police portals.
- **Real-time Alert System**: Instant notifications for high-risk incidents or critical women safety reports.
- **Dark/Light Theme**: Persistent theme switching for better accessibility.
- **Political Boundaries**: Clear state-level demarcation on the map.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Mapping**: Leaflet, React-Leaflet
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data**: GeoJSON (State Boundaries), NCRB-inspired JSON datasets

---

## 📥 Installation Guide

Follow these steps to set up the project locally.

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (Version 18.x or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd nari-shakti
```

### 3. Install Dependencies
Run the following command to install all required packages:
```bash
npm install
```

### 4. Environment Setup
Create a `.env` file in the root directory (refer to `.env.example` if available).
```env
# For client-side apps using Vite, prefix variables with VITE_
VITE_APP_NAME=Nari-Shakti
```

### 5. Running the Application
Start the development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000` (or the port specified in your console).

---

## 📂 Project Structure

```text
/src
  /components     # Reusable UI components (MapView, Header, etc.)
  /constants      # Static data and configuration (States, Cities)
  /data           # Simulated crime incident JSON files
  /hooks          # Custom React hooks (useRiskEngine)
  /types          # TypeScript interfaces and types
  App.tsx         # Main application entry point
  index.css       # Global styles and Tailwind imports
```

## 🗺️ Map Customization
The application uses **Esri** and **CartoDB** tile layers. You can toggle map styles via the floating control panel in the top-right corner.

## 📜 License
This project is built for social safety awareness.

---

*Developed with focus on safety and data intelligence.*
