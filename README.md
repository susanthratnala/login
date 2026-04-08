# MedGoPlus (demo)  

MedGoPlus (demo) is a modern, professional React Native application designed for healthcare provider onboarding and registration. It features a seamless, multi-step registration flow to collect user details, professional credentials, service offerings, and banking information.

## 🚀 Features

- **Authentication**: Secure login and account creation with OTP verification.
- **Structured Onboarding**:
  - **User Information**: Personal details and contact information.
  - **Professional Info**: Academic and professional credentials.
  - **Service Details**: Customization of services offered.
  - **Banking Details**: Secure collection of payout information.
- **Dynamic Navigation**: Smooth transitions between steps powered by React Navigation.
- **Responsive Design**: Optimized for both Android and iOS devices.
- **Local State Management**: Efficient handling of multi-step form data.

## 🛠️ Technology Stack

- **Core**: [React Native](https://reactnative.dev/) (0.80.2)
- **Language**: JavaScript/TypeScript
- **Navigation**: [React Navigation Stack](https://reactnavigation.org/docs/stack-navigator/)
- **UI Components**: Custom components with `react-native-safe-area-context` and `react-native-gesture-handler`
- **Utility**: `react-native-image-picker` for document/photo uploads
- **Styling**: Centralized theme management in `src/theme`

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components
├── navigation/     # Navigation configuration
├── screens/        # Screen-level components (Login, Registration steps, etc.)
├── services/       # API and external services logic
├── theme/          # Design system, colors, and global styles
└── utils/          # Helper functions and constants
```

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- Android Studio (for Android) / Xcode (for iOS)

### Installation

1.  **Clone the repository**:
    ```sh
    git clone [repository-url]
    cd login
    ```

2.  **Install dependencies**:
    ```sh
    npm install
    ```

3.  **iOS specific installation** (macOS only):
    ```sh
    cd ios && pod install && cd ..
    ```

### Running the App

1.  **Start Metro Bundler**:
    ```sh
    npm start
    ```

2.  **Run on Android**:
    ```sh
    npm run android
    ```

3.  **Run on iOS**:
    ```sh
    npm run ios
    ```

## 📜 Scripts

- `npm start`: Starts the Metro bundler.
- `npm run android`: Compiles and runs the app on an Android emulator or device.
- `npm run ios`: Compiles and runs the app on an iOS simulator or device.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm test`: Executes unit tests using Jest.



## 📄 License

This project is licensed under the MIT License.
