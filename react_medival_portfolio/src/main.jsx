import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from './lib/contexts/ThemeProvider';
import { PdfSettingsProvider } from './lib/contexts/PdfSettingsContext';
import './styles/index.scss'
import App from './App'

const root = createRoot(document.getElementById('root'));


root.render(
	<StrictMode>
		<ThemeProvider>
			<PdfSettingsProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PdfSettingsProvider>
		</ThemeProvider>
	</StrictMode>,
)

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').catch((err) => {
			console.log('Service Worker registration failed: ', err);
		});
	});
}