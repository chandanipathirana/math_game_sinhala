# Admin Interface Specification

## Purpose

The admin interface allows a content manager to add, edit, review, export, and import math questions without changing application code.

## Screens

### Admin Login

- PIN-based protected entry
- Separate from the parent dashboard

### Admin Dashboard

- Summary cards showing built-in and custom question counts
- Filterable question list
- Search by prompt text
- New question button

### Question Editor

- Fields for:
  - id
  - grade
  - topic
  - difficulty
  - prompt
  - audio text
  - visual type
  - visual value
  - four answer options
  - correct answer

### Import / Export Area

- Export custom questions as JSON
- Paste JSON and import custom questions

## Key Behaviors

- Custom questions should be stored separately from built-in generated questions
- Built-in questions remain available to the student app
- Custom questions should be editable and deletable
- Export/import should help move question data between devices during early MVP use
