
````markdown
# 🎓 StudyZone — Client

Welcome to the client-side of StudyHub, a modern online educational platform built with React, Tailwind CSS, and Firebase. This application empowers tutors to offer courses and students to register, study, and take notes with ease.

🌐 **Live Site:** [https://studyzone-ass12-im.surge.sh/](https://studyzone-ass12-im.surge.sh/)  
📂 **GitHub:** [eduHub-clientSide](https://github.com/imon-n/eduHub-clientSide)

---

## 🚀 Features

- 🔐 **Authentication & Authorization** using Firebase (Student / Tutor / Admin roles)
- 📚 **Course Management**
  - Tutors can create and submit courses
  - Admin can approve or reject courses
  - Students can view and book approved sessions
- 📆 **Session Booking** with automated session status (Ongoing / Closed)
- 💾 **Study Materials** sharing (images or Google Drive links)
- 📝 **Personal Notes** for students
- 💳 **Stripe Integration** for secure payments
- 📊 **Admin Dashboard** to manage users, courses, and system feedback

---

## 🛠️ Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| React          | Frontend Library                 |
| Tailwind CSS   | Styling Framework                |
| React Router   | Client-side routing              |
| Firebase       | Authentication & Token Security  |
| React Query    | Server state management          |
| Axios          | HTTP client for API requests     |
| SweetAlert2    | Notification popups              |
| Stripe         | Payment gateway integration      |
| DaisyUI        | Tailwind UI Component library    |

---

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/imon-n/eduHub-clientSide.git
   cd eduHub-clientSide
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file at the root and add:

   ```env
   VITE_API_URL=https://study-hub-server-two.vercel.app
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Run the project**

   ```bash
   npm run dev
   ```

---

## ✅ Best Practices Followed

* ✅ Modular and **reusable components**
* ✅ **React Query** for optimized data fetching and caching
* ✅ API requests are abstracted using **`useAxiosSecure`** hook with token injection
* ✅ Role-based protected routes (Admin, Student, Tutor)
* ✅ Strong **form validation** with meaningful feedback
* ✅ SweetAlert2 for interactive modals and confirmations

---

## 📬 Feedback & Contributions

Got suggestions or improvements?
Feel free to **fork**, **contribute**, or **open an issue** on the GitHub repository.
We welcome all kinds of contributions!

---

---

## 🧠 Maintainer

👨‍💻 Developed by [**@imon-n**](https://github.com/imon-n)

```

---

Let me know if you'd like a matching `README.md` for your **server-side** project as well!
```
