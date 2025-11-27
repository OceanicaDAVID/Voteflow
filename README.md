# VoteFlow 🗳️

VoteFlow is a modern, decentralized social polling platform designed to facilitate open public discourse. Built with the T3 Stack philosophy, it combines real-time voting mechanics with a familiar social feed experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Status](https://img.shields.io/badge/status-beta-orange.svg)

## 🌟 Project Vision

Our goal is to create a transparent, censorship-resistant platform where community sentiment can be visualized in real-time. We aim to support crypto-native features (like wallet-based tipping) while maintaining a Web2-friendly user experience.

**Official Website**: [voteflow.app](https://voteflow.app)

## 🏗️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js (Google, Apple, X, Instagram)
- **Deployment**: Docker & Docker Compose (Optimized for Debian 12/13)

## 🚀 Key Features

- **Social Feed**: Infinite scroll feed with posts and polls.
- **Dynamic Polling**: Create multi-option polls with instant results visualization.
- **Guest Preview**: "Content-first" approach allowing guests to view content with a transparency overlay before registering.
- **Crypto Tipping**: Integrated wallet address display for ETH/SOL tipping.
- **Role-Based Access Control**: User, Moderator, and Admin roles with dedicated dashboards.
- **I18n**: Multi-language support (English, Chinese, Japanese, Korean, etc.).

## 🤝 Call for Contributors / 志愿者招募

VoteFlow is an open-source social voting and tipping platform **developed with the assistance of Gemini AI**. Our mission is simple: to allow anyone to initiate polls on topics they care about and receive support through cryptocurrency tipping.

**Core Philosophy:**
- **Community Driven**: This project currently **does not have full-time dedicated developers**. We rely on the community to maintain and improve it.

> **A Note from the Founder:**
> "I am a non-technical founder and new to coding/GitHub. I may not be able to manage this repository as professionally as experienced developers, so please forgive any clumsiness on my part. I am deeply grateful for every bit of help from the community. **All contributors will be permanently recorded in the project's history as a token of our appreciation.**"

### 🚧 Help Wanted (我们需要的帮助)

We need developers to help **perfect the core functionality, fix bugs, and ensure stability** for a smooth user experience.

**Current Priority Tasks:**
- [ ] **Stability & Bug Fixes**: Audit the code, fix UI/UX glitches, and ensure everything runs smoothly.
- [ ] **Comment System**: Implement a nested comment section for posts to enable discussion.
- [ ] **Testing**: Add unit and integration tests.

*(Note: Features like Steam Auth, Direct Messaging, Web3 Wallet Connection, and Mobile Apps are NOT priorities right now. We focus on a working web version first.)*

### How to Contribute

1. **Fork** the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a **Pull Request**.

## 🛠️ Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/voteflow.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file based on the template below:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000" # Use https://voteflow.app in production
   # Add your OAuth keys here
   ```

4. **Run Database Migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📄 License & Commercial Usage

### Open Source License (AGPL v3)
VoteFlow is free software distributed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
- ✅ You can use it for free.
- ✅ You can modify it.
- ⚠️ **Crucial**: If you modify it and run it as a service (e.g., a website), you **MUST** open-source your modifications back to the community under the same license.

### Commercial License (Dual Licensing)
Want to build a proprietary/closed-source product based on VoteFlow? Or need enterprise support?

We offer a **Commercial License** that allows you to:
- 🚫 Be exempt from the AGPL open-source requirements.
- 🔒 Keep your modifications and source code private.
- 🛠️ Receive priority support and deployment assistance.

**[Contact us for Commercial Licensing](mailto:license@voteflow.com)** to discuss pricing and terms.
