import { LocationProvider, Route, Router, useLocation } from 'preact-iso';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PwaWrapper } from './components/PwaWrapper';
import { HomePage } from './pages/HomePage';
import { ImprintPage } from './pages/ImprintPage';
import { NewsPage } from './pages/NewsPage';
import { SettingsPage } from './pages/SettingsPage';
import { StackGalleryPage } from './pages/StackGalleryPage';

function AppContent() {
	const { path } = useLocation();

	return (
		<div className="flex flex-col min-h-screen w-full">
			<Header currentUrl={path} />
				<Router>
					<Route path="/" component={HomePage} />
					<Route path="/settings" component={SettingsPage} />
					<Route path="/einstellungen" component={SettingsPage} />
					<Route path="/news" component={NewsPage} />
					<Route path="/neuigkeiten" component={NewsPage} />
					<Route path="/imprint" component={ImprintPage} />
					<Route path="/impressum" component={ImprintPage} />
					<Route path="/stacks" component={StackGalleryPage} />
					<Route path="/stacks-galerie" component={StackGalleryPage} />
					<Route default component={HomePage} />
				</Router>
				<Footer />
				<PwaWrapper />
		</div>
	);
}

function App() {
	return (
		<LocationProvider>
			<AppContent />
		</LocationProvider>
	);
}

export default App;
