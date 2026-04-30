function applyRegex(text, regex, replacement) {
  return text.replace(regex, replacement);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCodeBlocks(markdown) {
  return applyRegex(
    markdown,
    /```([a-z]*)\n([\s\S]*?)\n```/gim,
    (match, lang, code) => {
      const escapedCode = escapeHtml(code);
      const codeId = "code-" + Math.random().toString(36).slice(2, 11);
      // return `<pre><code class="language-${lang}">${escapedCode}</code></pre>`;
      return `
        <pre class="code-block-container relative"><code id="${codeId}" class="language-${lang}">${escapedCode}</code><button class="copy-btn" data-target="${codeId}" title="Copy code">📋</button></pre>
      `;
    }
  );
}

function processCurrentBlock(currentBlock, outputLines, toc) {
  if (currentBlock.length === 0) return;
  const blockContent = currentBlock.join("\n");
  const inlineProcessed = parseInline(blockContent);

  const headingMatch = blockContent.match(/^(#{1,6})\s+(.*)$/);
  if (headingMatch) {
    const level = headingMatch[1].length;
    const text = headingMatch[2].trim();
    const id = slugify(text);
    outputLines.push(`<h${level} id="${id}">${text}</h${level}>`);
    toc.push({ level, text, id });
  } else if (/^(.*)\n={3,}\s*$/gim.test(blockContent)) {
    const text = RegExp.$1.trim();
    const id = slugify(text);
    outputLines.push(`<h1 id="${id}">${text}</h1>`);
    toc.push({ level: 1, text, id });
  } else if (/^(.*)\n-{3,}\s*$/gim.test(blockContent)) {
    const text = RegExp.$1.trim();
    const id = slugify(text);
    outputLines.push(`<h2 id="${id}">${text}</h2>`);
    toc.push({ level: 2, text, id });
  } else if (/^[\-\*_]{3,}\s*$/gim.test(blockContent)) {
    outputLines.push("<hr>");
  } else {
    outputLines.push(`<p>${inlineProcessed.trim().replace(/\n/g, "<br>")}</p>`);
  }
  currentBlock.length = 0;
}

function handleBlockquote(line, trimmedLine, state, currentBlock, outputLines) {
  if (!state.inBlockquote) {
    processCurrentBlock(currentBlock, outputLines, state.toc);
    outputLines.push("<blockquote>");
    state.inBlockquote = true;
  }
  currentBlock.push(trimmedLine.substring(2));
}

function closeBlockquoteIfNeeded(trimmedLine, state, currentBlock, outputLines, line) {
  processCurrentBlock(currentBlock, outputLines, state.toc);
  outputLines.push("</blockquote>");
  state.inBlockquote = false;
  if (trimmedLine !== "") {
    currentBlock.push(line);
  }
}

function handleList(line, trimmedLine, isUnorderedListItem, isOrderedListItem, state, currentBlock, outputLines) {
  if (!state.inList) {
    processCurrentBlock(currentBlock, outputLines, state.toc);
    state.listType = isUnorderedListItem ? "ul" : "ol";
    outputLines.push(`<${state.listType}>`);
    state.inList = true;
  } else if ((state.listType === "ul" && isOrderedListItem) || (state.listType === "ol" && isUnorderedListItem)) {
    outputLines.push(`</${state.listType}>`);
    state.listType = isUnorderedListItem ? "ul" : "ol";
    outputLines.push(`<${state.listType}>`);
  }
  let listItemContent = isUnorderedListItem
    ? trimmedLine.substring(2)
    : trimmedLine.replace(/^\d+\.\s/, "");
  outputLines.push(`<li>${parseInline(listItemContent)}</li>`);
}

function closeListIfNeeded(state, outputLines) {
  if (state.inList) {
    outputLines.push(`</${state.listType}>`);
    state.inList = false;
    state.listType = "";
  }
}

function parseBlockLevel(html, toc) {
  const outputLines = [];
  let currentBlock = [];
  const state = { inList: false, listType: "", inBlockquote: false, toc };

  const lines = html.split("\n");
  for (const line of lines) {
    const trimmedLine = line.trim();
    const isUnorderedListItem = /^[*-]\s/.test(trimmedLine);
    const isOrderedListItem = /^\d+\.\s/.test(trimmedLine);
    const isBlockquoteLine = trimmedLine.startsWith("> ");

    if (isBlockquoteLine) {
      handleBlockquote(line, trimmedLine, state, currentBlock, outputLines);
    } else if (state.inBlockquote) {
      closeBlockquoteIfNeeded(trimmedLine, state, currentBlock, outputLines, line);
      if (!isUnorderedListItem && !isOrderedListItem && trimmedLine !== "") {
        currentBlock.push(line);
      }
    } else if (isUnorderedListItem || isOrderedListItem) {
      handleList(line, trimmedLine, isUnorderedListItem, isOrderedListItem, state, currentBlock, outputLines);
    } else {
      closeListIfNeeded(state, outputLines);
      if (trimmedLine === "") {
        processCurrentBlock(currentBlock, outputLines, toc);
      } else {
        currentBlock.push(line);
      }
    }
  }

  processCurrentBlock(currentBlock, outputLines, toc);
  if (state.inBlockquote) outputLines.push("</blockquote>");
  closeListIfNeeded(state, outputLines);

  return outputLines.join("\n");
}

function parseInline(html) {
  // html = escapeHtml(html);
  html = applyRegex(html, /\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  html = applyRegex(html, /__(.*?)__/gim, "<strong>$1</strong>");
  html = applyRegex(html, /\*(.*?)\*/gim, "<em>$1</em>");
  html = applyRegex(html, /_(.*?)_/gim, "<em>$1</em>");
  html = applyRegex(html, /~~(.*?)~~/gim, "<del>$1</del>");
  html = applyRegex(html, /!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1">');
  html = applyRegex(html, /\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // Inline code with copy
  html = applyRegex(html, /`(.*?)`/gim, (_, code) => {
    const codeId = "code-" + Math.random().toString(36).slice(2, 11);
    return `<code class="inline-code" id="${codeId}" data-target="${codeId}" title="Click to copy">${escapeHtml(code)}</code>`;
  });

  return html;
}

function renderTOC(toc) {
  if (toc.length === 0) return "";
  let html = '<nav class="toc"><h2 id="toc">Table of Contents</h2><ul>';
  toc.forEach(item => {
    html += `<li class="toc-level-${item.level}"><a href="#${item.id}">${item.text}</a></li>`;
  });
  html += "</ul></nav>";
  return html;
}



export function markdownToHtml(markdown) {

  const toc = [];
  let html = parseCodeBlocks(markdown);
  html = parseBlockLevel(html, toc);
  return renderTOC(toc) + html;
}
