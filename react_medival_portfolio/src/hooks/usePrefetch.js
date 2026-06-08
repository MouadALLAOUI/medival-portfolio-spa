const prefetchCache = new Set();

export const prefetchRoute = (factory) => {
  const key = factory.toString();
  if (prefetchCache.has(key)) return;
  prefetchCache.add(key);

  const component = factory();
  if (component && typeof component.catch === 'function') {
    component.catch(() => {});
  }
};

export const prefetchOnHover = (factory) => ({
  onMouseEnter: () => prefetchRoute(factory),
  onFocus: () => prefetchRoute(factory),
});
