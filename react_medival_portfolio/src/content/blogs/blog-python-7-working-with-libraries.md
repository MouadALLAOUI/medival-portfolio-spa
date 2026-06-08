# Python 7: Working with Libraries

Python's real power isn't just in the language itself — it's in the massive ecosystem of third-party libraries. Whether you need to make HTTP requests, scrape websites, or work with data, there's almost certainly a library for it.

## Installing Libraries with `pip`

`pip` is Python's package manager. Use it to install libraries from the Python Package Index (PyPI):

```bash
pip install requests
pip install beautifulsoup4
pip install pandas
```

You can also upgrade an existing library:

```bash
pip install --upgrade requests
```

## Importing Installed Libraries

Once installed, import them like built-in modules:

```python
import requests
from bs4 import BeautifulSoup
```

## Making HTTP Requests with `requests`

The `requests` library is the standard for working with APIs and web pages:

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)  # 200
print(response.json())       # parses JSON response
```

You can also send POST requests with data:

```python
data = {"username": "alice", "message": "Hello!"}
response = requests.post("https://api.example.com/send", json=data)
```

## Web Scraping with BeautifulSoup

BeautifulSoup parses HTML and makes it easy to extract data:

```python
from bs4 import BeautifulSoup
import requests

response = requests.get("https://example.com")
soup = BeautifulSoup(response.text, "html.parser")

# Find all links
for link in soup.find_all("a"):
    print(link.get("href"))
```

## Virtual Environments

Virtual environments keep each project's dependencies isolated. Without them, different projects can conflict:

```bash
# Create a virtual environment
python -m venv myenv

# Activate it (Windows)
myenv\Scripts\activate

# Activate it (Mac/Linux)
source myenv/bin/activate

# Install packages inside it
pip install requests

# Deactivate when done
deactivate
```

Now `requests` is only available inside `myenv`, not globally on your system.

## Finding the Right Library

When you need a library, check:

- **PyPI** (pypi.org) — the official package index
- **GitHub** — look for stars and recent activity
- **Stack Overflow** — see what experienced developers recommend

> **💡 Tip:** Always use a virtual environment for your projects. It takes 30 seconds to set up and saves you hours of dependency headaches later.
