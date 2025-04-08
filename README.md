**Overview**

PetPal AI is a mobile-first AI-powered pet companion app that helps pet parents monitor and care for their furry friends. The app combines health guidance, pet-to-human translation, activity logging, and smart product recommendations into one seamless and engaging experience.

**Key Features**

**AI Health Assistant**: Symptom checker and virtual triage powered by AI

**Pet Translator**: Bark/meow audio input analysis with mood + confidence score

**Growth Tracker**: Log food, walks, mood, bathroom, and grooming

**AR Styling**: Try on accessories and grooming styles in AR

**Wearable Integration**: Sync vitals from smart pet collars

**Pet Store**: Browse and purchase vet-approved products by category

**Target Users**

**Primary**: Pet parents (ages 25–45), especially dog/cat owners

**Secondary**: Veterinarians and pet care professionals

**Technology Stack**

Frontend: React + Tailwind CSS (mobile PWA-first)

Backend: Firebase (Auth, Firestore, Functions)

AI Integration: OpenAI GPT for assistant, Whisper for audio

AR & Styling: WebAR + image overlays

Voice Analysis: Custom ML model with confidence metrics

**Code Structure**

/src
  /components       → Reusable UI components
  /screens          → Home, Health, Translator, AR, Profile, Store
  /hooks            → Custom React hooks for logic
  /utils            → Formatter, audio recorder, tips
  App.tsx           → Main navigation logic
  index.tsx         → Entry point
/public/assets      → Placeholder images/icons

**Installation**

yarn install
yarn dev

**Or for production:**

yarn build && yarn start

**API Keys & Setup**

Create a .env.local with your OpenAI API key:

VITE_OPENAI_API_KEY=your_key_here

Contribution Guidelines

Use clean commit messages

Document new components/hooks with JSDoc

Ensure accessibility (a11y) on UI

**Future Plans**

Tele-vet integration

Insurance partnerships

Custom pet personality generation

Advanced emotion detection

License

MIT License
