import { useEffect, useState } from 'preact/hooks';

/**
 * useDebounce: Gibt den Wert erst zurück, wenn für die angegebene Verzögerung (delay)
 * keine weitere Änderung mehr erfolgt ist. Jeder neue Wert setzt den Timeout zurück.
 */
export function useDebounce<T>(value: T, delay: number): T {
	const [debounced, setDebounced] = useState(value);
	useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(timer); // Timer wird bei jeder Änderung gecleart
	}, [value, delay]);
	return debounced;
}
