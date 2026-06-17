import re
from pathlib import Path

media_file = Path("react_medival_portfolio/src/data/mediaManager.js")
content = media_file.read_text(encoding='utf-8')

# Simple approach: find all lines with key: "value" or key: number that don't end with comma
# and add comma if next line is not closing brace

lines = content.split('\n')
result = []

for i, line in enumerate(lines):
    result.append(line)
    
    # Check if this line has a property assignment (key: value)
    # Patterns: date: "...", pageCount: 5, etc.
    if re.match(r'^\s+\w+:\s+', line) and ':' in line:
        # Check if line already ends with comma
        if not line.rstrip().endswith(','):
            # Check what comes next
            if i + 1 < len(lines):
                next_line = lines[i + 1].strip()
                # If next line is NOT closing brace, add comma
                if next_line and not next_line.startswith('}'):
                    result[-1] = result[-1].rstrip() + ','

content = '\n'.join(result)
media_file.write_text(content, encoding='utf-8')
print("✓ Fixed all missing commas!")
