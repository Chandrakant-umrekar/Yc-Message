# Live View: https://yc-message.vercel.app

# Anonymous Messaging Platform

## Overview

The Anonymous Messaging Platform is a web application that enables users to receive and send anonymous messages through custom-generated links. This platform ensures complete anonymity, allowing users to freely share their thoughts without revealing their identity. Users can create an account, generate their unique message link, and share it with others to receive anonymous feedback, messages, or opinions. Additionally, users can send anonymous messages to others using their shared links.

## Features

- **Account Creation**: Users can sign up and log in to get the dashboard.
- Email Verification: You will get OTP to verify your account.
- **Custom Links**: Each user gets a unique link to receive anonymous messages.
- **Anonymous Messaging**: Allows anyone with the link to send messages without revealing their identity.
- **Secure Communication**: Built with modern security practices to protect user data.
- **Responsive Design**: Accessible across devices with a user-friendly interface.
- **Dark Mode Support**: Enhances usability with light and dark theme options.

## Tech Stack

- **Frontend**: React.js(Next.js), Tailwind CSS
- **Backend**: Next.js (Node.js, Express.js)
- **Validation**: React Hook Form, Zod, mongoose.
- **Database**: MongoDB.
- **Toast Notifications**: For real-time user feedback
- **Next-Auth**: For session and login.
- Email Verification: OTP for account verification using resend.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Chandrakant-umrekar/Yc-Message.git
   cd Yc-Message
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGODB_URL=your_database_url
   RESEND_API_KEY=your_resend_secret
   NEXT_URL=your_api_base_url
   NEXT_SECRET=your_secret
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

### 1. Sign Up and Create an Account

- Visit the homepage and sign up with your name, email and password.

### 2. Generate Your Custom Link

- After signing up, you will get a dashboard with link that you can share with others and also have functionalty to accept or unaccept messages.

### 3. Receive Anonymous Messages

- People can use your link to send you anonymous messages. You can view these messages in your dashboard.

### 4. Send Anonymous Messages

- Use others' shared links to send them anonymous messages while remaining anonymous.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgments

- Special thanks to the open-source community for providing tools and libraries that made this project possible.
- Inspired by anonymous messaging platforms like Sarahah and Whisper.

---

