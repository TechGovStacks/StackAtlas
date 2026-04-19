import type { ParticipantRole, StackItemStatus } from '../types/index.js';

export declare const ROLE_WEIGHTS: Readonly<Record<ParticipantRole, number>>;
export declare const STATUS_WEIGHTS: Readonly<Record<StackItemStatus, number>>;
export declare const TRANSITIVE_WEIGHT: number;
export declare const DIVERSITY_MIN_FACTOR: number;
export declare const DIVERSITY_MAX_FACTOR: number;
export declare const SOVEREIGNTY_THRESHOLD: number;
export declare const SIZE_DAMP_REFERENCE: number;
