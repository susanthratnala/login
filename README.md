<div align="center">
  <img src="https://img.shields.io/badge/React_Native-0.80.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-Logic-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome" />

  # 🏥 MedGoPlus
  ### *The Future of Healthcare Provider Onboarding*

  MedGoPlus is a production-grade React Native application designed to streamline the complex process of healthcare provider registration. Built with a focus on **data integrity**, **user experience**, and **asynchronous workflows**.
</div>

<hr />

## 📖 Overview
Most onboarding systems are fragmented, leading to high drop-off rates and inconsistent data. MedGoPlus solves this by providing a structured, multi-step journey that ensures every piece of information—from professional credentials to banking details—is collected accurately and efficiently.

> [!TIP]
> This project is designed as a **Blueprint** for enterprise-scale medical platforms, emphasizing modularity and clean architecture.

---

## 🚀 Key Features

### 🔐 Secure Authentication
- **Modern Login/Signup**: A sleek, focused interface for initial access.
- **OTP Verification**: Built-in security layer for verifying provider identity.

### 📋 Professional Onboarding Flow
The registration process is broken down into logical, digestible steps to prevent user fatigue:
1.  **Identity**: Personal and contact details.
2.  **Credentials**: Academic qualifications and professional experience.
3.  **Services**: Dynamic configuration of healthcare services offered.
4.  **Financials**: Secure collection of banking and payout information.

### 🧠 Advanced Architecture
- **State Persistence**: Data is preserved across onboarding steps to prevent loss.
- **Fluid Navigation**: Seamless transitions powered by React Navigation with customized screen animations.
- **Mobile-First**: Fully responsive layouts tailored for both High-End and Entry-Level Android/iOS devices.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React Native 0.80.2](https://reactnative.dev/) |
| **Language** | TypeScript / JavaScript |
| **Navigation** | [React Navigation Stack](https://reactnavigation.org/) |
| **Media** | React Native Image Picker |
| **UX/UI** | Gesture Handler & Safe Area Context |
| **Styling** | Centralized Theme System (src/theme) |

---

## 📂 Project Structure

```bash
src/
├── components/     # Reusable UI Atoms and Molecules
├── navigation/     # Navigation Logic (Stacks & Deep Linking)
├── screens/        # Feature-specific Screen Components
├── services/       # API Integration & Business Logic
├── theme/          # Design System (Colors, Typography, Spacing)
└── utils/          # Helpers, Constants & Validation Schemas
```

---

## 🏁 Getting Started

### 📋 Prerequisites
> [!IMPORTANT]
> Ensure you have your development environment configured for **React Native CLI**. (Expo is not supported for this project).

- **Node.js**: >= 18.x
- **Development Tooling**: Android Studio / Xcode
- **Yarn/NPM**: Latest versions

### ⚙️ Installation

1. **Clone & Navigate**
   ```bash
   git clone https://github.com/susanthratnala/login.git
   cd login
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

---

## ▶️ Execution

### **Development Mode**
```bash
# Terminal 1: Start Metro
npm start

# Terminal 2: Start Mobile App
npm run android   # For Android
npm run ios       # For iOS
```

### **Code Quality**
```bash
npm run lint      # Run ESLint
npm test          # Run Jest Tests
```

---

## 🔒 Future Roadmap

- [ ] **Cloud Sync**: Integration with Firestore/S3 for document persistence.
- [ ] **Biometrics**: FaceID/Fingerprint login integration.
- [ ] **Role Management**: Specialized flows for Doctors vs. Administrative staff.
- [ ] **Web Support**: Porting core logic to React Native Web.

---

## 📄 License
This project is licensed under the **MIT License**. Created with ❤️ by [Susanth Ratnala](https://github.com/susanthratnala).