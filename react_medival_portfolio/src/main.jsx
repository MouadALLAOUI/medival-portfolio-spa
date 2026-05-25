import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from './lib/contexts/ThemeProvider';
import { PdfSettingsProvider } from './lib/contexts/PdfSettingsContext';
import AppSettingsProvider from './lib/contexts/AppSettingsContext';
import './styles/index.scss'
import App from './App'

const root = createRoot(document.getElementById('root'));


root.render(
	<StrictMode>
		<ThemeProvider>
			<PdfSettingsProvider>
				<AppSettingsProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</AppSettingsProvider>
			</PdfSettingsProvider>
		</ThemeProvider>
	</StrictMode>,
)