# 🛡️ **Top Down Tank Game**

## Overview
Welcome to **Top Down Tank Game**, an immersive XY-plane navigation video game where you control a tank, fight NPC enemies,
and progress through dynamic levels. This game features exciting combat mechanics, inventory management, basic AI, and 
interactive maps that persist across play sessions.

The goal of this project is to create a fully-functional top-down tank game with engaging gameplay, intuitive controls, 
and visually appealing interfaces. Players will navigate through levels, interact with objects, and defeat AI-controlled
enemy tanks.

---

## 🚀 **Features**
- **XY-plane Navigation:** Move freely across a 2D plane to explore different maps and levels.
- **Combat System:** Engage in battles with enemy NPC tanks equipped with basic AI routines.
- **Dynamic Object Creation:** Real-time generation of various objects, including tanks, obstacles, and items.
- **Inventory Management:** Collect and manage in-game items to aid in combat and exploration.
- **Basic AI:** Enemies make decisions based on limited information and predefined behaviors.
- **Multiple Maps:** Progress through various maps with persistent states, allowing players to revisit areas with saved changes.
- **GUI Integration:** Intuitive user interfaces for inventory, health bars, and map navigation.

---

## 🛠️ **Tech Stack**
- **Frontend:** [React](https://reactjs.org/)
- **Frontend:** [Node.js](https://nodejs.org/en)
- **Testing Libraries:** Jest, React Testing Library
- **Build Tool:** React Scripts
- **AI/State Management:** (Planned) AI libraries for web-based games, basic state management with React.
- **Additional Libraries:** TBD (Based on research for map persistence, AI, etc.)

---

## 🎮 **Gameplay**
Players take control of a tank and navigate through a top-down view map. As you progress, you’ll face enemy tanks controlled by
basic AI routines. Your tank can move in all directions and fire projectiles to destroy NPCs. Items you collect, such as health
packs or power-ups, will be managed via an inventory system accessible through the game’s GUI.

Each map you explore will save your actions (defeated enemies, collected items) and persist this data across play sessions,
allowing you to return and pick up right where you left off.

---

## 🏗️ **Installation & Setup**

### Prerequisites
Before you can run the project, make sure you have the following installed:
- **Node.js** (v16.x or higher)
- **npm** (v7.x or higher)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/dogghoodie/CS_4398
    cd top-down-tank-game
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the app in development mode:
    ```bash
    npm start
    ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🧪 **Testing**

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for testing.

To run tests:
```bash
npm test

