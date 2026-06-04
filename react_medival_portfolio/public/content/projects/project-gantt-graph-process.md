# 📜 The Gantt Grimoire — A MonoCore Tale

*An arcane desktop tome for conjuring Gantt charts and mastering the art of process scheduling across cooperative and preemptive realms.*

## 📖 Prologue 

In the heart of the MonoCore Tower, a digital grimoire was forged — *The Gantt Grimoire*. Born from the ancient scrolls of CPU incantation, it visualizes the mystic flow of process scheduling using enchanted Gantt diagrams.

> Crafted by the code sorcerer **Mouad**, this relic allows initiates and masters alike to witness the hidden dance of processes, time quanta, and context switches.

## 🧱 Tome Structure

 ```bash
ProcessusGanttGraphs/
    ├── __main__.py
    ├── __init__.py
    ├── *readme.md*
    ├── classes/
    │   ├── graph.py
    │   ├── processus.py
    │   ├── gui.py
    │   └── __init__.py
    ├── data/
    │   │── set_data.py
    │   │── get_data.py
    │   │── testdata.py
    │   └── __init__.py
    ├── assets/
    │   └── Figure_1.png
    └── ordannacement/
        ├── __init__.py
        ├── cooperatif/
        │   ├── __init__.py
        │   ├── fifo.py
        │   ├── srtf.py
        │   └── round_robin.py
        └──  premtif/
            ├── __init__.py
            ├── fifo.py
            ├── srtf.py
            └── round_robin.py 

```

## 📘 Invocation Ritual 

To unlock the tome's powers, you must: 

### 📌 Requirements: 

- Python 3.x or later
- The `matplotlib` incantation:
```bash
pip install matplotlib
``` 

### 🔮 To awaken the grimoire: 

```bash
python __main__.py
```
Or simply:
```bash
python .
``` 

## ✨ Arcane Powers 

Harness the magic of time manipulation: 

> 📜 ** Algorithmic Scrolls:** 

- 🔸 First In, First Out * (FIFO) *
- 🔸 Round Robin * (RR) *
- 🔸 Shortest Remaining Time First * (SRTF) *
- 🔸 Cooperative Incantations
- 🔸 Preemptive Interventions

> 📦 ** Mystical Data Sources:** 

- 💬 Console spellcasting(manual entry) 
- 📂 CSV rune importing 
- 🔀 Random test data conjuration 

> 🎨 ** Visualization Rituals:** 

- 📊 Live Gantt chart rendering with `matplotlib`
- ⏱️ Real-time animation of process scheduling
- 🎭 Color-coded process blocks for easy identification

> 🏆 ** Achievements Unlocked:** 

- 🧙 Understanding of CPU scheduling algorithms
- 📈 Visualization of process execution flows
- 🎓 Educational tool for learning process management
