import { createHashHistory } from 'history';
import { Router } from 'preact-router';
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

// preact-router erwartet listen(callback: (location) => void),
// history@5 liefert jedoch listen(listener: (update: { action, location }) => void).
// Dieser Adapter gleicht die Signaturen an.
const _raw = createHashHistory();
const hashHistory = {
	listen(callback: (location: { pathname: string; search: string }) => void) {
		return _raw.listen(({ location }) => callback(location));
	},
	location: _raw.location,
	push: (path: string) => _raw.push(path),
	replace: (path: string) => _raw.replace(path),
};

function HomeRoute({ default: isDefault, path }: RouteProps) {
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

function StackGalleryRoute({ default: isDefault, path }: RouteProps) {
	void isDefault;
	void path;

	return <StackGalleryPage />;
}

function App() {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<Header />
			<Router history={hashHistory}>
				<HomeRoute path="/" default />
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
