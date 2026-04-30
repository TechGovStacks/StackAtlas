import { KolSingleSelect } from '@public-ui/preact';
import type { ComponentProps } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

type KolSingleSelectProps = ComponentProps<typeof KolSingleSelect>;
type Option = { label: string | number; value: unknown; disabled?: boolean };

function flattenOptions(options: unknown): Option[] {
	if (!Array.isArray(options)) return [];
	const result: Option[] = [];
	for (const o of options) {
		if (o && typeof o === 'object' && 'options' in o && Array.isArray(o.options)) {
			result.push(...flattenOptions(o.options));
		} else {
			result.push(o as Option);
		}
	}
	return result;
}

export function AutoSingleSelect(props: KolSingleSelectProps) {
	const { _on, _value, _options, ...rest } = props;

	// Refs so the focusout handler always sees the latest props without re-registering
	const valueRef = useRef(_value);
	const optionsRef = useRef(_options);
	const onChangeRef = useRef(_on?.onChange);
	const wrapperRef = useRef<HTMLDivElement>(null);

	// Keep refs current after every render (must not write .current during render)
	useEffect(() => {
		valueRef.current = _value;
		optionsRef.current = _options;
		onChangeRef.current = _on?.onChange;
	});

	useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;

		const handleFocusOut = () => {
			// Wait one microtask so focus settles on its new target
			setTimeout(() => {
				if (!wrapper.isConnected) return;
				// :focus-within crosses Shadow DOM — true while clear-button still has focus
				if (wrapper.matches(':focus-within')) return;
				const flat = flattenOptions(optionsRef.current);
				if (flat.some((o) => o.value === valueRef.current)) return;
				const first = flat.find((o) => !o.disabled);
				if (!first || !onChangeRef.current) return;
				onChangeRef.current(new Event('change'), first.value);
			}, 0);
		};

		wrapper.addEventListener('focusout', handleFocusOut);
		return () => wrapper.removeEventListener('focusout', handleFocusOut);
	}, []);

	return (
		// display:contents removes the div from layout so the CSS Grid in FilterBar is unaffected
		<div ref={wrapperRef} style={{ display: 'contents' }}>
			<KolSingleSelect {...rest} _value={_value} _options={_options} _on={_on} />
		</div>
	);
}
