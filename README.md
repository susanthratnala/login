🏥 MedGoPlus (Demo)

MedGoPlus is a production-style React Native healthcare onboarding app built to streamline the registration of healthcare providers through a structured, multi-step workflow.

It focuses on data accuracy, smooth UX, and real-world onboarding flows used in digital health platforms.

⚡ Why This Project Exists

Most onboarding systems are messy, drop users mid-way, or collect inconsistent data.

This app solves that by:

Structuring onboarding into clear progressive steps
Ensuring complete and validated data collection
Delivering a smooth, app-like experience (not clunky forms)
🚀 Core Features
🔐 Authentication
Secure login & signup flow
OTP-based verification system
📋 Multi-Step Onboarding Flow
User Information → Personal & contact details
Professional Details → Qualifications & experience
Service Configuration → Custom service offerings
Banking Details → Payout setup
🔄 Smart Navigation
Step-by-step progression
State persistence across screens
Seamless transitions using React Navigation
📱 Mobile-First Design
Fully responsive (Android + iOS)
Clean UI with consistent theming
🧠 State Handling
Efficient local state management for form data
Prevents data loss during navigation
🛠️ Tech Stack
Framework: React Native (0.80.2)
Language: JavaScript / TypeScript
Navigation: React Navigation (Stack)
UI Handling:
react-native-safe-area-context
react-native-gesture-handler
Media Uploads: react-native-image-picker
Architecture: Modular folder structure + reusable components
📂 Project Structure
src/
├── components/     # Reusable UI components
├── navigation/     # Navigation logic & stacks
├── screens/        # App screens (Auth + Onboarding steps)
├── services/       # API/service layer
├── theme/          # Colors, typography, design system
└── utils/          # Helpers & constants
🧩 Key Highlights (What Makes This Strong)
Real-world healthcare onboarding use-case
Clean multi-step UX architecture
Scalable folder + service structure
Designed like a production app, not a college demo
🏁 Getting Started
Prerequisites
Node.js (>= 18)
React Native CLI setup
Android Studio / Xcode
Installation
git clone https://github.com/susanthratnala/login.git
cd login
npm install
iOS Setup (macOS only)
cd ios && pod install && cd ..
▶️ Running the App
npm start
npm run android
npm run ios
📜 Scripts
npm start → Start Metro bundler
npm run android → Run on Android
npm run ios → Run on iOS
npm run lint → Code quality checks
npm test → Run tests
🔒 Future Improvements 
Backend integration (currently demo-level)
JWT-based authentication
Cloud storage for documents
Role-based access (Doctor / Nurse / Admin)
Deployment to Play Store / App Store
📄 License

MIT License