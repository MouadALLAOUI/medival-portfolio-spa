AMZ AUTOMOBILE Front is designed to simplify mechanical workshop management. It enables users to log, monitor, and visualize repair operations using a modern interface powered by React and Electron.

## 📜 Prologue

After my brother — who works as a mechanic — asked for a better way to organize his work,

I started developing **AMZ AUTOMOBILE** to assist him and other mechanics in managing daily tasks more effectively.

## 🏗️ Project Structure 🚗

```bash
Amz-automobile-front/
├── public/
│    ├── favicon.ico
│    ├── index.html
│    ├── manifest.json
│    └── robots.txt
├── src/
│    ├── component/         # All reusable components
│    ├── env/
│    │    ├── strings/      # Multilingual support (FR/EN)
│    │    ├── environnement.jsx
│    │    └── routers.jsx
│    ├── media/             # Images and icons
│    ├── store/
│    │    ├── store.js
│    │    └── userSlice.js
│    ├── styling/           # SCSS, fonts, and style assets
│    ├── views/
│    │    ├── content/      # Main client UI
│    │    ├── Login/        # Login screen
│    │    ├── notfound.jsx
│    │    └── Templates.js
│    └── index.js
├── .editorconfig
├── .eslintrc.json
├── .gitbranch
├── .gitignore
├── main.js
├── package-lock.json
├── package.json
├── preload.js
├── README.md
└── yarn.lock
```

## ⚙️ Installation & Usage 🚗

### 📦 Requirements

- `React` v18.3.1+
- `Node.js`
- `npm` (or `yarn`)

### 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/MouadALLAOUI/Amz-automobile-front

```

2. Navigate into the project directory:

```bash
cd Amz-automobile-front

```

3. Install dependencies:

```bash
npm install

```

> ✅ Ensure there are no installation errors and that a `node_modules` folder is created in the root directory.

### ▶️ Run the Application

Run the following commands in **two separate terminals**:

```bash
npm start

```

```bash
npm run electron

```

> 🖥️ The React app will launch in your browser, and the Electron desktop window will follow.

## 🛠️ Key Features

- ⚡ **Task Management**: Add, edit, and delete mechanical tasks
- 👥 **User Management**: Track who performed each task
- 🚗 **Vehicle Tracking**: Link tasks to specific vehicles by plate number
- 📊 **Data Visualization**: Graphical representation of repair history
- 🧾 **PDF Generation**: Export task reports to PDF
- 🌐 **Multilingual Support**: French and English interfaces
- 🔐 **Authentication**: Secure login system
- 📱 **Responsive Design**: Works on desktop and mobile

## 🏛️ Architecture

The application follows a clean separation of concerns:

- **Components**: Reusable UI elements
- **Views**: Page-level components
- **Store**: Redux state management
- **Env**: Environment configuration and routing

## 🤝 Contributing

Contributions are welcome! Please follow the standard Git workflow:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
