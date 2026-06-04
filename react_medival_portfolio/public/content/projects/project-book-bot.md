## 📖 Introduction

**Boot.dev BookBot** is a simple Python app that analyzes a `.txt` file — counting both the number of **words** and how many times each **letter** appears.

It's a small but powerful project to practice Python fundamentals like:

- File handling
- Loops and conditionals
- Dictionaries and lists
- Sorting and reporting

## ⚔️ Prologue

When I started learning **Python**, I discovered an amazing platform called [**Boot.dev**](https://www.boot.dev/).

This app was one of my first learning projects from that course — so it holds a special place in my coding journey.

## 🏗️ Project Structure

```bash
bootdev_bookbot/
├── main.py
├── README.md
└── books/
    └── frankenstein.txt
```

## ⚙️ Installation & Usage

### 🧩 Requirements

- Python (any recent version)

### 💾 Installation

  1. **Clone the repository**

```bash
git clone https://github.com/MouadALLAOUI/bootdev_bookbot.git  

```

  2. **Open the directory**

```bash
cd bootdev_bookbot

```

### 🚀 Run the app

```bash
python main.py

```

## Change the Input File

To analyze a different file, open `main.py` and update **line 2** of the function:

```python
def file_export():
    with open('books/ frankenstein.txt') as f:
```

You can replace `'books / frankenstein.txt'` with the path to your own text file.

## ✨ Features

- 📘 Count total words in a text file
- 🔤 Count total letters used
- 🧮 Count frequency of each individual letter

## 🧭 Future Plans

- [ ] Add a GUI interface
- [ ] Support more file types (`.docx`, `.pdf`, `.md`, etc.)
- [ ] Add import options (e.g., choose from more books)
- [ ] Add export options (e.g., to `.csv` or `.json`)
- [ ] Improve reporting visuals

## 🤝 Contributing

To leave your mark upon this tome: 

1.Fork the repository via the magic mirror(GitHub) 
2.Forge your branch: 
```bash
git checkout -b AmazingFeature
```
3.Etch your changes: 
```bash
git commit -m 'Add some AmazingFeature'
```
4.Push to the branch: 
```bash
git push origin AmazingFeature
```
5.Open a Pull Request
