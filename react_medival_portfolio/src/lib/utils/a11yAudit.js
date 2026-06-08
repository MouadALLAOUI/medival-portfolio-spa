import React from 'react';

export const runA11yAudit = async () => {
  if (import.meta.env.PROD) return;

  try {
    const axe = await import('axe-core');
    const results = await axe.default.run();

    if (results.violations.length > 0) {
      console.group('%c♿ Accessibility Violations', 'color: #ff6b6b; font-size: 14px; font-weight: bold;');
      results.violations.forEach((violation) => {
        console.group(`%c${violation.impact.toUpperCase()}: ${violation.description}`, 'color: #ffa500;');
        console.log('Help:', violation.helpUrl);
        console.log('Nodes:', violation.nodes.length);
        violation.nodes.forEach((node, i) => {
          console.log(`  ${i + 1}.`, node.html);
          console.log('     Fix:', node.failureSummary);
        });
        console.groupEnd();
      });
      console.groupEnd();
    } else {
      console.log('%c♿ No accessibility violations found!', 'color: #4caf50; font-weight: bold;');
    }

    return results;
  } catch (err) {
    console.warn('Accessibility audit failed:', err);
  }
};

if (import.meta.env.DEV) {
  window.__runA11yAudit = runA11yAudit;
  console.log('%c♿ Accessibility auditor loaded. Run window.__runA11yAudit() in console.', 'color: #90caf9;');
}
