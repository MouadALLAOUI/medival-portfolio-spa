#!/usr/bin/env python3
"""
Enhance mediaManager.js file meta attributes.
- Adds missing meta attributes based on file type
- Fixes comma syntax issues
- Skips images completely
"""

import re
from pathlib import Path

media_file = Path("react_medival_portfolio/src/data/mediaManager.js")
content = media_file.read_text(encoding='utf-8')

# Pattern to find each entry with meta block
# This matches: { id: "...", path: "...", ..., meta: { ... } }
pattern = r'(\{\s*id:\s*"([^"]+)"[^}]*?path:\s*"([^"]+)"[^}]*?meta:\s*)\{([^}]*?)\}(\s*,?\s*\})'

def extract_meta_dict(meta_str):
    """Parse meta string into dict"""
    meta = {}
    if not meta_str.strip():
        return meta
    
    # Match key: value pairs (strings with quotes or numbers or None)
    matches = re.findall(r'(\w+):\s*(?:"([^"]*)"|([^,}\n]+))', meta_str)
    for key, str_val, other_val in matches:
        val = str_val if str_val else (other_val.strip() if other_val else None)
        meta[key] = val
    
    return meta

def determine_file_type(path):
    """Determine file type from path"""
    path_lower = path.lower()
    if '.pdf' in path_lower:
        return 'pdf'
    elif '.docx' in path_lower:
        return 'docx'
    elif '.pptx' in path_lower:
        return 'pptx'
    elif '.mp4' in path_lower:
        return 'mp4'
    elif '.mp3' in path_lower:
        return 'mp3'
    elif any(x in path_lower for x in ['.png', '.jpg', '.jpeg', '.gif']):
        return 'image'
    return 'unknown'

def should_skip(file_id, file_type):
    """Check if entry should be skipped (images)"""
    if file_type == 'image':
        return True
    if 'cursor' in file_id.lower():
        return True
    if 'blogs-html' in file_id or 'blogs-javascript' in file_id or 'blogs-portal' in file_id:
        return True
    if any(x in file_id for x in ['cafe-medieval', 'city-medieval', 'crmef-gemini']):
        return True
    return False

def enhance_meta(meta_dict, file_type, file_id):
    """Add missing meta attributes"""
    # For PDFs and DOCX
    if file_type in ['pdf', 'docx']:
        if 'pageCount' not in meta_dict:
            # Extract from filename if available
            if 'tp' in file_id:
                meta_dict['pageCount'] = 4
            else:
                meta_dict['pageCount'] = 8
        if 'date' not in meta_dict:
            meta_dict['date'] = "Jan 15, 2026"
        if 'size' not in meta_dict:
            meta_dict['size'] = "2.5 MB"
        if 'author' not in meta_dict:
            meta_dict['author'] = "Content Creator"
        if 'wordCount' not in meta_dict:
            meta_dict['wordCount'] = 2500
    
    # For PPTX
    elif file_type == 'pptx':
        if 'slideCount' not in meta_dict:
            meta_dict['slideCount'] = 20
        if 'pageCount' not in meta_dict:
            meta_dict['pageCount'] = 20
        if 'date' not in meta_dict:
            meta_dict['date'] = "Jan 15, 2026"
        if 'size' not in meta_dict:
            meta_dict['size'] = "3.0 MB"
        if 'author' not in meta_dict:
            meta_dict['author'] = "Content Creator"
        if 'duration' not in meta_dict:
            meta_dict['duration'] = "30 min"
    
    # For MP4
    elif file_type == 'mp4':
        if 'duration' not in meta_dict:
            meta_dict['duration'] = "45 min"
        if 'date' not in meta_dict:
            meta_dict['date'] = "Jan 15, 2026"
        if 'size' not in meta_dict:
            meta_dict['size'] = "500 MB"
        if 'author' not in meta_dict:
            meta_dict['author'] = "Content Creator"
        if 'videoFormat' not in meta_dict:
            meta_dict['videoFormat'] = "1080p"
    
    return meta_dict

def format_meta(meta_dict):
    """Format meta dict as JavaScript object with proper commas and indentation"""
    if not meta_dict:
        return "{}"
    
    lines = []
    for key, value in meta_dict.items():
        if isinstance(value, str):
            if value.lower() == 'none':
                lines.append(f'          {key}: None')
            else:
                lines.append(f'          {key}: "{value}"')
        elif isinstance(value, (int, float)):
            lines.append(f'          {key}: {value}')
        else:
            lines.append(f'          {key}: {value}')
    
    return "{\n" + ",\n".join(lines) + ",\n        }"

# Find and process all entries
replacements = []
for match in re.finditer(pattern, content, re.DOTALL):
    prefix = match.group(1)
    file_id = match.group(2)
    file_path = match.group(3)
    old_meta_str = match.group(4)
    suffix = match.group(5)
    
    file_type = determine_file_type(file_path)
    
    if should_skip(file_id, file_type):
        print(f"⊘ SKIPPING: {file_id} (type: {file_type})")
        continue
    
    # Extract current meta
    meta_dict = extract_meta_dict(old_meta_str)
    
    # Enhance meta
    enhanced_meta = enhance_meta(meta_dict, file_type, file_id)
    
    # Format new meta
    new_meta_str = format_meta(enhanced_meta)
    
    # Build replacement
    old_full = match.group(0)
    new_full = f"{prefix}{new_meta_str}{suffix}"
    
    replacements.append((old_full, new_full))
    print(f"✓ UPDATED: {file_id} (type: {file_type})")

# Apply replacements
new_content = content
for old, new in replacements:
    new_content = new_content.replace(old, new, 1)

# Write back
media_file.write_text(new_content, encoding='utf-8')

print(f"\n✓ Enhanced {len(replacements)} entries!")
print(f"✓ File updated: {media_file}")
