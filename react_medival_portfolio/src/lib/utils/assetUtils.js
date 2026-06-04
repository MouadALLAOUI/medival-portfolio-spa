// src/utils/assetUtils.js
import { getAssetById, mediaRegistry } from '../../data/mediaManager.js'; // Adjust path based on your structure

/**
 * Universal safe transformer for a single asset ID.
 * Returns a standardized, UI-friendly object with built-in metadata parsing.
 * 
 * @param {string} id - The unique asset ID from mediaRegistry
 * @param {string} typeFallback - 'document', 'image', 'video', 'audio' (handles default names/fallbacks)
 * @returns {Object} Standardized asset layout or a structural fallback object
 */
export const loadSingleAsset = (id, typeFallback = 'document') => {
    if (!id) return getFallbackStructure(typeFallback);

    const asset = getAssetById(id);
    if (!asset) {
        console.warn(`[AssetUtils] Asset with ID "${id}" could not be found.`);
        return getFallbackStructure(typeFallback, id);
    }

    // Automatically parse page metrics or slide metrics into a unified metric
    const unitCount = asset.meta?.pageCount ?? asset.meta?.slideCount ?? asset.meta?.duration ?? null;

    return {
        id: asset.id,
        path: asset.path || '',
        name: asset.label || `Untitled ${typeFallback.toUpperCase()}`,
        description: asset.description || '',
        metric: unitCount, // Unifies pages, slides, or durations for easy rendering
        meta: asset.meta || {}
    };
};

/**
 * Universal safe transformer for multiple asset IDs.
 * Ideal for collections, grids, and list groups.
 * 
 * @param {string[]} idArray - Array of asset string IDs
 * @param {string} typeFallback - Fallback asset classification type
 * @returns {Object[]} Array of standardized asset objects
 */
export const loadMultipleAssets = (idArray, typeFallback = 'document') => {
    if (!idArray || !Array.isArray(idArray) || idArray.length === 0) return [];

    return idArray
        .map(id => loadSingleAsset(id, typeFallback))
        // Filter out fallbacks if you want a clean list, or leave them to catch missing items
        .filter(asset => !asset.isFallback);
};

/**
 * Internal Safe Fallback Structural Generator
 * Prevents UI null pointer exceptions (e.g., trying to read .path of undefined)
 */
function getFallbackStructure(type, missingId = 'unknown') {
    return {
        id: `fallback-${missingId}`,
        path: type === 'image' ? '/media/placeholders/avatar-placeholder.png' : '#',
        name: 'Resource Temporarily Unavailable',
        description: 'The requested file reference could not be located in the asset registry.',
        metric: null,
        meta: {},
        isFallback: true
    };
}

// Eagerly import all markdown files at build time using Vite's import.meta.glob
// Use relative path from this file (src/lib/utils/) up to project root, then into public/content
const markdownModules = import.meta.glob(
    '../../../public/content/**/*.md',
    { query: '?raw', import: 'default', eager: true }
);

// Build a lookup map: normalized path -> content
// Glob returns keys like "../../../public/content/projects/foo.md" (Windows uses backslashes)
// We need to normalize to "/content/projects/foo.md" to match mediaRegistry.markdown paths
const markdownContentMap = {};
for (const [rawPath, content] of Object.entries(markdownModules)) {
    // Extract everything after "public" and normalize separators
    const match = rawPath.match(/public[/\\](.+)/);
    if (match) {
        const normalizedPath = '/' + match[1].replace(/\\/g, '/');
        markdownContentMap[normalizedPath] = content;
    }
}

/**
 * Loads markdown content synchronously from a file by ID.
 * Looks up the markdown path in mediaManager.markdown and returns the pre-loaded content.
 * 
 * @param {string} id - The unique entity ID (e.g., "project-gantt-graph-process")
 * @returns {string} The markdown content as a string
 * @throws {Error} When ID doesn't exist or file not found
 */
export const loadMarkdownAsset = (id) => {
    if (!id) {
        throw new Error('[AssetUtils] loadMarkdownAsset: ID is required');
    }

    const markdownPath = mediaRegistry.markdown?.[id];
    if (!markdownPath) {
        console.warn(`[AssetUtils] loadMarkdownAsset: No markdown path found for ID "${id}".`);
        return '';
    }

    const content = markdownContentMap[markdownPath];
    if (content === undefined) {
        console.warn(`[AssetUtils] loadMarkdownAsset: Markdown file not found for path "${markdownPath}".`);
        return '';
    }

    return content;
};