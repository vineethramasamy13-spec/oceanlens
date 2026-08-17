# 🌊 OceanLens AI

OceanLens AI is a state-of-the-art interactive dashboard for physical and biological oceanographic analysis. It aggregates live and delayed-mode ARGO float trajectories, CTD (Conductivity, Temperature, Depth) profiles, and marine biological indicators, providing grounded AI-driven reasoning for planetary ocean monitoring.

---

## 🚀 Key Features

* **📈 Physical Profile Analysis**: Depth-resolved charts mapping Temperature, Salinity, Potential Density, Dissolved Oxygen, and Sound Speed.
* **🐠 Marine Biology Zone Profiler**: Pelagic zone classification (Epipelagic, Mesopelagic, Bathypelagic) with automated threshold mapping to identify **hypoxic Oxygen Minimum Zones (OMZ)**.
* **🔊 Sonar SOFAR Refraction Simulator**: Interactive, canvas-based wave propagation ray-tracer demonstrating Snell's Law sound channel bending and trapping inside the SOFAR axis waveguide.
* **🛰️ NASA MODIS & Vessel Traffic Map Overlays**: Trajectory tracking with toggles for satellite chlorophyll-a density and maritime shipping lanes.
* **💬 Expert AI Chatbot**: A friendly, scientifically-rigorous assistant powered by LLaMA-3.3 (via Groq API) for answering general and domain-specific oceanography questions.

---

## 🛠️ Getting Started in Visual Studio Code

Follow these steps to run the application locally on your machine.

### 📋 Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your system. You can verify it in your terminal/cmd using:
```bash
node -v
```

### 1️⃣ Open the Project in VS Code
1. Open **Visual Studio Code**.
2. Go to **File** > **Open Folder...** (or `Ctrl+K Ctrl+O` / `Cmd+O`).
3. Select and open the `oceanlens-ai` folder.

### 2️⃣ Configure Environment Variables
The AI analysis cards and chatbot require a Groq API Key to function.
1. In the project root, create a file named `.env.local` (or copy `.env.example` if available).
2. Open `.env.local` and insert your API key:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```
   *(Note: `.env.local` is listed in `.gitignore` and will never be committed to Git for your security).*

### 3️⃣ Install Dependencies
1. Open the integrated terminal in VS Code: **Terminal** > **New Terminal** (or press ``Ctrl+```).
2. Run the install command:
   ```bash
   npm install
   ```

### 4️⃣ Launch the Application
You can run the development server in one of two ways:

#### Option A: Quick-Start Launcher (Windows only)
* Double-click the `start.bat` file in the VS Code file explorer or your system explorer to open a command prompt and launch the server automatically.

#### Option B: Terminal Command (All OS)
* Run the following script in the integrated VS Code terminal:
  ```bash
  npm run dev
  ```

---

## 🌐 View the App

Once the server compiles and starts, click the link below or paste it into your browser:
👉 **[http://localhost:3000/](http://localhost:3000/)**

---

## 🔌 Recommended VS Code Extensions

For the best development experience, consider installing these extensions inside VS Code:
* **Tailwind CSS IntelliSense** (by Tailwind Labs) – For utility classes completion.
* **ESLint** (by Microsoft) – For code linting and syntax validation.
* **Prettier - Code formatter** (by Prettier) – For automatic formatting.
