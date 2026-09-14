import { makeInteractive } from "./general.js";

/**
 * Initializes the interactive elements for 'ind-ins'.
 * @throws Will throw an error if makeInteractive fails.
 */
try {
    makeInteractive('ind-ins');
} catch (error) {
    console.error('Failed to make interactive elements for ind-ins:', error);
}
