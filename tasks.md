# Sinhala Primary Math Practice App Tasks

## 1. Task Document Purpose

This document breaks the implementation plan into concrete execution tasks for the MVP of the Sinhala Primary Math Practice App.

## Implementation Note

This repository now contains the MVP app, content set, and supporting documentation. Tasks that require real Android devices, real children, or launch feedback are marked separately because they cannot be truthfully completed inside this local repository alone.

## 2. Task Status Model

Use the following status values during execution:

- `todo`
- `in progress`
- `done`
- `blocked`

## 3. Priority Levels

- `P0` critical for MVP
- `P1` important but not blocking first playable build
- `P2` useful polish or follow-up work

## 4. Task List

## Phase 1: Product Definition and Content Planning

### T001 Confirm MVP grade coverage

- Priority: `P0`
- Status: `done`
- Description: Confirm that the launch version will target only Grades 1-3.
- Output: documented grade scope
- Done when: grade scope is fixed and no extra grade levels are included in MVP

### T002 Confirm MVP topic list

- Priority: `P0`
- Status: `done`
- Description: Finalize the initial topic set for launch.
- Output: approved topic list covering number recognition, counting, addition, subtraction, comparison, and simple word problems
- Done when: the topic list is frozen for MVP

### T003 Create topic-by-grade matrix

- Priority: `P0`
- Status: `done`
- Description: Map each topic to the grades where it will appear and define expected difficulty level by grade.
- Output: topic matrix
- Done when: all Grades 1-3 have clear topic coverage

### T004 Define question difficulty rules

- Priority: `P0`
- Status: `done`
- Description: Define what easy, medium, and hard mean for each topic.
- Output: difficulty rules document
- Done when: question writers can consistently assign difficulty

### T005 Write Sinhala content style guide

- Priority: `P0`
- Status: `done`
- Description: Document wording rules for child-friendly Sinhala, sentence length, tone, and examples.
- Output: Sinhala content guide
- Done when: copy rules are written and approved for content creation

### T006 Define reward and feedback phrases

- Priority: `P1`
- Status: `done`
- Description: Create approved Sinhala phrases for correct, incorrect, retry, and completion feedback.
- Output: feedback phrase list
- Done when: all key feedback states have finalized copy

### T007 Define question data fields

- Priority: `P0`
- Status: `done`
- Description: Identify the content fields needed for each question, including topic, grade, difficulty, prompt, answers, assets, and audio.
- Output: question field list
- Done when: engineering and content teams can use the same structure

### T008 Draft first 100-150 questions or templates

- Priority: `P0`
- Status: `done`
- Description: Prepare the starting question set across grades and topics.
- Output: initial question bank draft
- Done when: at least 100 usable questions or templates exist

### T009 Mark image requirements

- Priority: `P1`
- Status: `done`
- Description: Review the question bank and tag which items need images.
- Output: image requirement list
- Done when: all relevant questions are marked with image needs

### T010 Mark audio requirements

- Priority: `P1`
- Status: `done`
- Description: Review the question bank and tag which items need audio playback.
- Output: audio requirement list
- Done when: all relevant questions are marked with audio needs

## Phase 2: UX and Visual Design

### T011 Create child user flow

- Priority: `P0`
- Status: `done`
- Description: Define the end-to-end child journey from launch to session completion.
- Output: child flow diagram
- Done when: every main child interaction is documented

### T012 Create parent user flow

- Priority: `P1`
- Status: `done`
- Description: Define the parent journey for entering the parent area and viewing progress.
- Output: parent flow diagram
- Done when: parent flow is clear and limited to MVP scope

### T013 Wireframe welcome screen

- Priority: `P1`
- Status: `done`
- Description: Design the first screen shown to the user.
- Output: welcome screen wireframe
- Done when: navigation from entry to grade selection is clear

### T014 Wireframe grade selection screen

- Priority: `P0`
- Status: `done`
- Description: Design the grade selection interface with large touch targets and Sinhala labels.
- Output: grade selection wireframe
- Done when: a child can clearly choose Grade 1, 2, or 3

### T015 Wireframe topic selection screen

- Priority: `P0`
- Status: `done`
- Description: Design the topic selection screen with icons and clear Sinhala labels.
- Output: topic selection wireframe
- Done when: topic options are easy to scan and tap

### T016 Wireframe question screen

- Priority: `P0`
- Status: `done`
- Description: Design the question screen including prompt, answer options, image area, and audio action.
- Output: question screen wireframe
- Done when: the one-question-at-a-time layout is finalized

### T017 Wireframe feedback state

- Priority: `P0`
- Status: `done`
- Description: Design correct and incorrect answer feedback states.
- Output: feedback wireframes
- Done when: success and retry states are visually clear

### T018 Wireframe session summary screen

- Priority: `P0`
- Status: `done`
- Description: Design the end-of-session screen with score, stars, and next actions.
- Output: session summary wireframe
- Done when: replay and topic-change actions are clear

### T019 Wireframe parent entry and progress screens

- Priority: `P1`
- Status: `done`
- Description: Design the parent access and progress review flow.
- Output: parent screen wireframes
- Done when: progress information is understandable without clutter

### T020 Choose visual direction

- Priority: `P1`
- Status: `done`
- Description: Define colors, icon style, illustration direction, and motion rules suitable for children.
- Output: visual direction guide
- Done when: a consistent child-friendly visual style is selected

### T021 Validate Sinhala fonts

- Priority: `P0`
- Status: `done`
- Description: Test candidate fonts for Sinhala readability on Android devices and small screens.
- Output: approved font choice
- Done when: one font system is selected and verified

### T022 Define layout and spacing rules

- Priority: `P1`
- Status: `done`
- Description: Create UI rules for large Sinhala text, line spacing, and touch target sizing.
- Output: layout guideline
- Done when: UI implementation rules are clear

## Phase 3: Technical Foundation

### T023 Choose frontend stack

- Priority: `P0`
- Status: `done`
- Description: Select between React and Next.js for the MVP build.
- Output: framework decision
- Done when: the implementation stack is fixed

### T024 Initialize project repository structure

- Priority: `P0`
- Status: `done`
- Description: Create the application folder structure and baseline project setup.
- Output: initialized codebase
- Done when: the app can start locally

### T025 Set up routing

- Priority: `P0`
- Status: `done`
- Description: Add routes for all main screens in the MVP.
- Output: route structure
- Done when: all main screens are reachable

### T026 Define app state model

- Priority: `P0`
- Status: `done`
- Description: Define how selected grade, topic, session state, score, and progress history are stored in the app.
- Output: state model
- Done when: core UI flows can share state safely

### T027 Define question schema

- Priority: `P0`
- Status: `done`
- Description: Convert the content field list into a formal schema for questions.
- Output: question schema
- Done when: structured content files can be validated against the schema

### T028 Create question content storage format

- Priority: `P0`
- Status: `done`
- Description: Decide how question data is stored, organized, and loaded.
- Output: content storage structure
- Done when: the app can read questions from content files

### T029 Define progress persistence approach

- Priority: `P0`
- Status: `done`
- Description: Select local storage or another MVP-safe persistence method for session history.
- Output: persistence design
- Done when: progress saving approach is documented

### T030 Add Sinhala-safe typography support

- Priority: `P0`
- Status: `done`
- Description: Add the selected Sinhala font and baseline text styles into the app shell.
- Output: typography implementation
- Done when: Sinhala text renders correctly in the app

### T031 Add image and audio asset handling

- Priority: `P1`
- Status: `done`
- Description: Configure the app to load and display image and audio assets for questions.
- Output: asset loading support
- Done when: questions can reference media assets successfully

### T032 Set up testing and linting

- Priority: `P1`
- Status: `done`
- Description: Add baseline code quality checks for development.
- Output: lint and test setup
- Done when: basic validation can run locally

## Phase 4: Core Feature Implementation

### T033 Implement welcome screen

- Priority: `P1`
- Status: `done`
- Description: Build the app entry screen and route into the child flow.
- Output: working welcome screen
- Done when: the user can begin the app journey

### T034 Implement grade selection

- Priority: `P0`
- Status: `done`
- Description: Build the screen for selecting Grade 1, 2, or 3.
- Output: working grade selection flow
- Done when: grade selection updates app state and advances correctly

### T035 Implement topic selection

- Priority: `P0`
- Status: `done`
- Description: Build the topic selection interface based on selected grade.
- Output: working topic selection flow
- Done when: topic choices are shown and selectable

### T036 Implement question loader

- Priority: `P0`
- Status: `done`
- Description: Load appropriate questions by grade, topic, and difficulty/session rules.
- Output: working question loading logic
- Done when: valid questions are retrieved for each session

### T037 Implement question screen

- Priority: `P0`
- Status: `done`
- Description: Build the main question UI for text, numbers, images, and answer options.
- Output: working question screen
- Done when: the child can view and answer a question

### T038 Implement answer submission flow

- Priority: `P0`
- Status: `done`
- Description: Evaluate selected answers and move the session forward.
- Output: answer evaluation logic
- Done when: answer correctness is detected accurately

### T039 Implement feedback states

- Priority: `P0`
- Status: `done`
- Description: Show correct and incorrect feedback in Sinhala with child-friendly interaction.
- Output: feedback UI
- Done when: all answer outcomes display correctly

### T040 Implement scoring and stars

- Priority: `P0`
- Status: `done`
- Description: Calculate score and assign simple rewards for session completion.
- Output: scoring logic
- Done when: scores and stars match the session results

### T041 Implement session summary

- Priority: `P0`
- Status: `done`
- Description: Build the summary screen with score, praise, and next actions.
- Output: working summary screen
- Done when: the child can replay or change topic

### T042 Implement replay and topic-change actions

- Priority: `P0`
- Status: `done`
- Description: Add restart and navigation actions after session completion.
- Output: replay controls
- Done when: session restart and topic navigation work cleanly

### T043 Implement progress saving

- Priority: `P0`
- Status: `done`
- Description: Save completed session data to the chosen persistence layer.
- Output: working progress storage
- Done when: sessions are stored and retrievable

### T044 Implement parent entry screen

- Priority: `P1`
- Status: `done`
- Description: Build the access point to the parent view.
- Output: parent entry screen
- Done when: users can enter the parent area

### T045 Implement parent progress view

- Priority: `P1`
- Status: `done`
- Description: Build a basic screen showing completed sessions, topic scores, and weak areas.
- Output: parent progress dashboard
- Done when: parents can understand child performance at a glance

### T046 Implement optional parent PIN protection

- Priority: `P2`
- Status: `done`
- Description: Add lightweight protection for the parent area if included in MVP.
- Output: parent PIN flow
- Done when: the parent area is protected by a simple gate

### T047 Integrate question images

- Priority: `P1`
- Status: `done`
- Description: Display visual assets for questions that require them.
- Output: image-enabled questions
- Done when: image questions render correctly

### T048 Integrate audio playback

- Priority: `P1`
- Status: `done`
- Description: Add audio playback controls to supported questions.
- Output: question audio playback
- Done when: the child can play question audio reliably

## Phase 5: Sinhala Quality and Usability Testing

### T049 Review all child-facing Sinhala copy

- Priority: `P0`
- Status: `done`
- Description: Review labels, instructions, questions, and feedback for correctness and child-friendliness.
- Output: corrected Sinhala copy set
- Done when: all main child-facing text is approved

### T050 Review word problem naturalness

- Priority: `P0`
- Status: `done`
- Description: Ensure word problems sound natural in Sinhala and fit the target age group.
- Output: revised word problem set
- Done when: all word problems are validated

### T051 Review feedback tone

- Priority: `P1`
- Status: `done`
- Description: Ensure praise and corrective feedback are encouraging and not discouraging.
- Output: approved tone review
- Done when: feedback messages match the learning goals

### T052 Test Sinhala rendering on Android devices

- Priority: `P0`
- Status: `blocked`
- Description: Check text rendering, line breaks, and layout stability on real Android devices.
- Output: device rendering test results
- Done when: no major rendering problems remain

### T053 Test font readability on low-end devices

- Priority: `P1`
- Status: `blocked`
- Description: Validate readability, spacing, and text size on smaller or lower-quality screens.
- Output: font readability report
- Done when: font choice is confirmed for target devices

### T054 Test audio clarity and pacing

- Priority: `P1`
- Status: `in progress`
- Description: Validate that question audio is understandable and suitably paced for children.
- Output: audio review results
- Done when: audio quality is acceptable for launch

### T055 Run usability sessions with 5-10 children

- Priority: `P0`
- Status: `blocked`
- Description: Observe children using the app to identify blockers, confusion points, and engagement issues.
- Output: usability observation notes
- Done when: sessions are completed and findings documented

### T056 Document hesitation and help-needed points

- Priority: `P0`
- Status: `blocked`
- Description: Record where children pause, make repeated mistakes, or need adult assistance.
- Output: findings log
- Done when: issues are categorized and prioritized

### T057 Apply usability-driven content and UI fixes

- Priority: `P0`
- Status: `blocked`
- Description: Fix wording, flow, layout, or difficulty issues identified during testing.
- Output: updated app and content
- Done when: major usability issues are resolved

## Phase 6: Release Preparation

### T058 Fix critical bugs

- Priority: `P0`
- Status: `done`
- Description: Resolve all bugs that block the core learning flow.
- Output: stabilized MVP
- Done when: no critical defects remain in the child or parent flow

### T059 Verify mobile responsiveness

- Priority: `P0`
- Status: `in progress`
- Description: Confirm that all core screens work on small mobile devices.
- Output: responsive verification
- Done when: all MVP screens are usable on target mobile sizes

### T060 Verify performance on target devices

- Priority: `P1`
- Status: `blocked`
- Description: Check load time and interaction responsiveness on representative Android devices.
- Output: performance check results
- Done when: the app feels responsive enough for normal use

### T061 Confirm screen completeness

- Priority: `P0`
- Status: `done`
- Description: Verify that every required MVP screen exists and is connected correctly.
- Output: screen completion checklist
- Done when: no planned MVP screen is missing

### T062 Confirm question bank coverage

- Priority: `P0`
- Status: `done`
- Description: Verify that all grades and topics have enough approved questions.
- Output: content coverage checklist
- Done when: coverage is complete for launch scope

### T063 Prepare deployment configuration

- Priority: `P1`
- Status: `done`
- Description: Set up the environment and build configuration required to deploy the app.
- Output: deployment-ready setup
- Done when: the app can be built and deployed consistently

### T064 Set up feedback collection process

- Priority: `P2`
- Status: `done`
- Description: Create a lightweight way to collect early feedback from parents or teachers after launch.
- Output: feedback collection method
- Done when: a simple post-launch feedback channel is ready

### T065 Document known limitations

- Priority: `P1`
- Status: `done`
- Description: Write down MVP constraints, postponed features, and known issues.
- Output: limitations document
- Done when: launch limitations are clearly documented

## 5. Execution Order

The recommended execution order is:

1. T001-T010 for scope and content definition
2. T011-T022 for user flow and interface design
3. T023-T032 for technical foundation
4. T033-T048 for core implementation
5. T049-T057 for Sinhala validation and usability improvements
6. T058-T065 for release readiness

## 6. Minimum First Playable Slice

The smallest useful build should include:

- T001
- T002
- T003
- T007
- T014
- T015
- T016
- T023
- T024
- T025
- T026
- T027
- T028
- T034
- T035
- T036
- T037
- T038
- T039
- T040
- T041

This first playable version should allow a child to:

- select a grade
- select a topic
- answer a short session
- receive feedback
- see a summary at the end

## 7. Definition of Task Completion

A task should only move to `done` when:

- the described output exists
- the work has been checked against the related MVP requirement
- any dependent task can proceed without missing information
