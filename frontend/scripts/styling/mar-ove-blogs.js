import { makeInteractive } from "./general.js";

/**
 * Initializes interactive elements on the page.
 * @throws Will throw an error if makeInteractive fails.
 */
try {
    makeInteractive();
} catch (error) {
    console.error("Error initializing interactive elements:", error);
}
