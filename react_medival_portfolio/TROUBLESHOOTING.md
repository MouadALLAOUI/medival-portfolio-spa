# Troubleshooting Guide

Common issues and solutions for developers working on the Medieval Portfolio.

## Development Issues

### `npm run dev` fails to start

**Symptom**: Port already in use or server won't start.

**Solution**:
```bash
# Kill any process using port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Styles not applying / SCSS errors

**Symptom**: Components render unstyled or SCSS compilation fails.

**Solution**:
1. Ensure you're importing the component's SCSS module:
   ```jsx
   import styles from './ComponentName.module.scss';
   ```
2. Check that the global styles are imported in `src/styles/index.scss`
3. Run `npm run build` to check for SCSS compilation errors

### Environment variables not loading

**Symptom**: `import.meta.env.VITE_*` returns `undefined`.

**Solution**:
1. Ensure the variable is prefixed with `VITE_`
2. Restart the dev server after changing `.env` files
3. Check the variable name matches exactly (case-sensitive)
4. Verify `.env` is in the project root (not in `src/`)

### Images not loading

**Symptom**: Broken image icons or 404 errors for images.

**Solution**:
- Public images: Use absolute paths starting with `/media/...`
- Imported assets: Use relative paths and import them
- Check that the image exists in `public/media/` or `src/assets/`

### Hot Module Replacement (HMR) not working

**Symptom**: Changes don't reflect without manual refresh.

**Solution**:
1. Restart the dev server
2. Clear the Vite cache: `rm -rf node_modules/.vite`
3. Ensure you're editing files inside `src/`

## Build Issues

### Build fails with "out of memory"

**Symptom**: `JavaScript heap out of memory` error during build.

**Solution**:
```bash
# Increase Node memory limit
set NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

### Build succeeds but site is blank

**Symptom**: Production build deploys but shows a blank page.

**Solution**:
1. Check `vite.config.js` — ensure `base: './'` is set for relative paths
2. Open browser DevTools > Console for errors
3. Verify all lazy-loaded components have proper imports
4. Check that `dist/index.html` exists and references the correct JS bundle

### RSS/Sitemap generation fails

**Symptom**: `npm run build` fails during script execution.

**Solution**:
1. Ensure `src/data/blogs.data.js` exports a valid array
2. Check that blog entries have required fields (`slug`, `title`, `date`)
3. Run the scripts individually to debug:
   ```bash
   node scripts/generate-rss.js
   node scripts/generate-sitemap.js
   ```

## Routing Issues

### 404 on page refresh (Netlify/Vercel)

**Symptom**: Refreshing on `/blogs` or `/projects` shows 404.

**Solution**:
- **Netlify**: Already configured in `netlify.toml` with SPA fallback
- **Vercel**: Add `vercel.json` with rewrites (see DEPLOYMENT.md)
- **Other hosts**: Configure your server to serve `index.html` for all routes

### Client-side routes not working

**Symptom**: Clicking links works but direct URL access shows 404.

**Solution**:
1. Ensure `BrowserRouter` is used (not `HashRouter`)
2. Verify the route exists in `src/routes/routes.jsx`
3. Check that the page component is properly exported

## Performance Issues

### Slow initial load

**Symptom**: Page takes a long time to load on first visit.

**Solution**:
1. Check bundle size: `npx vite-bundle-visualizer`
2. Lazy-load heavy components with `React.lazy()`
3. Optimize images (use WebP format, compress)
4. Verify service worker is caching assets

### Animations laggy

**Symptom**: Framer Motion animations stutter or drop frames.

**Solution**:
1. Check if `prefers-reduced-motion` is enabled in OS settings
2. Reduce particle count in `ParticleCanvas`
3. Use `will-change: transform` on animated elements
4. Avoid animating layout properties (width, height, top, left)

## Theme Issues

### Theme not persisting

**Symptom**: Theme resets on page reload.

**Solution**:
1. Check that `localStorage` is available (not in private browsing with restrictions)
2. Verify `ThemeProvider` is wrapping the app in `src/main.jsx`
3. Check browser console for localStorage errors

### Dark mode colors wrong

**Symptom**: Some elements don't adapt to the dark theme.

**Solution**:
1. Use CSS custom properties from `src/styles/_variables.scss` instead of hardcoded colors
2. Check that the element's parent uses `data-theme` attribute
3. Add dark mode styles using `[data-theme="dark"]` selector

## i18n Issues

### Translation not showing / showing key path

**Symptom**: UI shows `sections.hero.title` instead of translated text.

**Solution**:
1. Ensure the translation key exists in the language file
2. Check the path matches the dot-notation structure
3. Verify `useSettings()` is used to access `_t()`
4. Check all 5 language files have the same keys

### Arabic text displaying left-to-right

**Symptom**: Arabic text alignment is incorrect.

**Solution**:
1. Ensure `dir="rtl"` is set on the root element for Arabic
2. Check that CSS uses logical properties (`margin-inline-start` instead of `margin-left`)
3. Verify the language selector properly sets the RTL direction

## Achievement System Issues

### Achievements not saving

**Symptom**: Unlocked achievements reset on page reload.

**Solution**:
1. Check that `localStorage` is available
2. Verify `AchievementsProvider` is in the component tree
3. Check browser console for quota exceeded errors

### Achievement toasts not showing

**Symptom**: Achievements unlock but no notification appears.

**Solution**:
1. Verify `AlertProvider` is in the component tree
2. Check that the achievement is registered in `src/lib/achievements/achievementsRegistry.js`
3. Ensure the toast system isn't suppressed by reduced motion settings

## Common ESLint Errors

| Error | Fix |
|---|---|
| `react-hooks/rules-of-hooks` | Don't call hooks conditionally or in loops |
| `react-hooks/exhaustive-deps` | Add missing dependencies to useEffect/useMemo |
| `no-unused-vars` | Remove unused imports or prefix with `_` |

## Getting Help

1. Check the [AUDIT.md](AUDIT.md) for detailed component audits
2. Review [PROMPTS.md](PROMPTS.md) for past task implementations
3. Search existing GitHub issues
4. Open a new issue with steps to reproduce
