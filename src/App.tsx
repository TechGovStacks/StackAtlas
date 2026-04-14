import { Router } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PwaWrapper } from './components/PwaWrapper';
import { HomePage } from './pages/HomePage';
import { ImprintPage } from './pages/ImprintPage';
import { NewsPage } from './pages/NewsPage';
import { SettingsPage } from './pages/SettingsPage';
import { StackGalleryPage } from './pages/StackGalleryPage';

type RouteProps = {
	default?: boolean;
	path?: string;
};

// preact-router unterstützt keinen history-Prop.
// Hash-Routing: URL-State aus window.location.hash lesen und per
// hashchange-Listener aktualisieren. Der Router erhält die aktuelle
// Route über den kontrollierten url-Prop – unabhängig vom Server-Pfad.
function getHashUrl(): string {
	const hash = window.location.hash;
	return hash.length > 1 ? hash.slice(1) : '/';
}

function StackGalleryRoute({ default: isDefault, path }: RouteProps) {
	void isDefault;
	void path;

	return <StackGalleryPage />;
}

function DepsRoute({ default: isDefault, path }: RouteProps) {
	void isDefault;
	void path;

	return <HomePage />;
}

function SettingsRoute({ default: isDefault, path }: RouteProps) {
	void isDefault;
	void path;

	return <SettingsPage />;
}

function NewsRoute({ default: isDefault, path }: RouteProps) {
	void isDefault;
	void path;

	return <NewsPage />;
}

function ImprintRoute({ default: isDefault, path }: RouteProps) {
	void isDefault;
	void path;

	return <ImprintPage />;
}

function App() {
	const [currentUrl, setCurrentUrl] = useState(getHashUrl);

	useEffect(() => {
		const onHashChange = () => setCurrentUrl(getHashUrl());
		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	}, []);

	return (
		<div className="flex flex-col min-h-screen w-full">
			<Header currentUrl={currentUrl} />
			<Router url={currentUrl}>
				<StackGalleryRoute path="/" default />
				<DepsRoute path="/deps" />
				<DepsRoute path="/abhängigkeiten" />
				<SettingsRoute path="/settings" />
				<SettingsRoute path="/einstellungen" />
				<NewsRoute path="/news" />
				<NewsRoute path="/neuigkeiten" />
				<ImprintRoute path="/imprint" />
				<ImprintRoute path="/impressum" />
				<StackGalleryRoute path="/stacks" />
				<StackGalleryRoute path="/stacks-galerie" />
			</Router>
			<Footer />
			<PwaWrapper />
		</div>
	);
}

export default App;
