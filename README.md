# 🍽️ MealApp

**MealApp** is an open-source student project designed to improve the experience of discovering and rating student meal restaurants ("študentski boni") in Maribor, Slovenia. The platform offers both a responsive web application and a mobile app that provide detailed restaurant data, user reviews, photo sharing, and map integration.

---

## ⚙️ Technologies Used

### 🖥 Backend
- **Node.js** with **Express.js**
- **MongoDB** for database

### Frontend
- **React** with **TypeScript**
- **TailwindCSS** for styling

### 📱 Mobile App
- **React Native** with **TypeScript**
- **TanStack Query**
- Photo capturing and GPS features

---

## ✨ Key Features

### Web Application
- Browse restaurants that accept student meal vouchers (bon system)
- Display information including:
  - Name, logo, location
  - Base price, additional payment
- User reviews with upvote/downvote system
- Trust score for active contributors

### Mobile Application (React Native)
Includes all web features, plus:
- Take and upload photos of meals
- View nearby restaurants on an interactive map using device GPS

---

## 🌍 Live Deployment

- **Website (on render)**: https://mealapp-1b8v.onrender.com/
- **Mobile App**: Available via Expo / local deployment  
  *(optional APK or TestFlight link if available)*

---

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run dev
