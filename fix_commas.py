#!/usr/bin/env python3
"""
Fix missing commas in mediaManager.js meta objects.
Adds commas after each property EXCEPT the last one.
"""

import re
from pathlib import Path

media_file = Path("react_medival_portfolio/src/data/mediaManager.js")
content = media_file.read_text(encoding='utf-8')

def fix_meta_commas(match):
    """Fix missing commas in meta block"""
    prefix = match.group(1)  # Everything before meta content
    meta_content = match.group(2)  # The meta object content
    suffix = match.group(3)  # Everything after (closing brace)
    
    # Split into lines
    lines = meta_content.split('\n')
    fixed_lines = []
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            fixed_lines.append(line)
            continue
        
        # Check if line ends with a value (not a comment)
        if stripped and not stripped.startswith('//'):
            # Check if this is a property line
            if ':' in stripped:
                # If it doesn't already end with comma, add one
                if not stripped.endswith(','):
                    line = line.rstrip() + ','
        
        fixed_lines.append(line)
    
    # Remove trailing comma from the last property
    for i in range(len(fixed_lines) - 1, -1, -1):
        stripped = fixed_lines[i].strip()
        if stripped and ':' in stripped and not stripped.startswith('//'):
            # This is the last property - ensure no comma
            if fixed_lines[i].rstrip().endswith(','):
                fixed_lines[i] = fixed_lines[i].rstrip()[:-1] + ','
            break
    
    return prefix + '\n'.join(fixed_lines) + suffix

# Find all meta blocks and fix them
# Pattern: meta: { ... }
pattern = r'(meta:\s*\{)\n([\s\S]*?)\n(\s*\})'

new_content = re.sub(pattern, fix_meta_commas, content)

media_file.write_text(new_content, encoding='utf-8')
print("✓ Fixed all meta object commas!")
