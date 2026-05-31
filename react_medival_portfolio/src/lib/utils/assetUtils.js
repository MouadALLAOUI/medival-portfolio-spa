// src/utils/assetUtils.js
import { getAssetById } from '../../data/mediaManager'; // Adjust path based on your structure

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