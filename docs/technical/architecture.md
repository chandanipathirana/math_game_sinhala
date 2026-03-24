# Technical Architecture

## Implementation Choice

This MVP is implemented as a dependency-light static web app using HTML, CSS, and ES modules. This keeps the app runnable in a restricted environment while preserving the mobile-first MVP flow.

## Core Modules

- `index.html`: screen structure
- `styles.css`: visual system and responsive layout
- `src/content.js`: topic metadata and question bank
- `src/app.js`: state, routing, session logic, progress storage, parent view
- `sw.js`: optional offline shell caching

## State Model

- `grade`
- `topic`
- `sessionQuestions`
- `currentQuestionIndex`
- `answers`
- `feedback`

## Persistence

- Local storage for session history
- Local storage for parent PIN

## Media

- Question visuals are rendered from inline emoji/text assets
- Audio uses browser speech synthesis with `si-LK` when available
