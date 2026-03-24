# Sinhala Primary Math Practice App Plan

## 1. Plan Objective

This plan converts the product specification into an actionable execution roadmap for building the MVP of a Sinhala-language math practice app for primary school children.

## 2. MVP Outcome

Deliver a mobile-first web app that allows children in Grades 1-3 to complete short Sinhala math practice sessions with:

- grade-based content
- topic selection
- one-question-at-a-time practice
- image and audio support
- immediate feedback
- session summary
- basic progress tracking
- simple parent progress view

## 3. Delivery Strategy

The work should be executed in six sequential workstreams:

1. Product definition and content planning
2. UX and visual design
3. Technical foundation
4. Core feature implementation
5. Sinhala quality and usability testing
6. Release preparation

## 4. Workstreams

### Workstream 1: Product Definition and Content Planning

#### Goal

Lock down the MVP scope so the team does not overbuild.

#### Tasks

- Confirm launch audience as Grades 1-3
- Confirm MVP topics:
  - number recognition
  - counting
  - addition
  - subtraction
  - bigger/smaller comparison
  - simple word problems
- Define topic coverage by grade
- Define question difficulty bands: easy, medium, hard
- Create content rules for Sinhala wording
- Define reward language and feedback phrases in Sinhala
- Prepare the first 100-150 questions or question templates
- Identify which questions require images
- Identify which questions require audio

#### Deliverables

- final MVP topic matrix
- question bank outline
- Sinhala content style guide
- initial question dataset draft

#### Acceptance Criteria

- all MVP topics are confirmed
- question coverage exists for all target grades
- wording guidelines are documented
- at least 100 draft questions or templates are prepared

### Workstream 2: UX and Visual Design

#### Goal

Design a child-friendly interface optimized for Sinhala text and mobile touch interactions.

#### Tasks

- Create user flows for child and parent journeys
- Produce wireframes for:
  - welcome screen
  - grade selection
  - topic selection
  - question screen
  - answer feedback state
  - session summary
  - parent entry
  - progress view
- Define layout rules for large Sinhala text
- Choose visual style:
  - color system
  - icon style
  - illustration direction
  - animation style
- Test candidate Sinhala fonts for readability
- Ensure tap targets are large enough for children
- Ensure screens work on small Android viewports

#### Deliverables

- screen flow
- low-fidelity wireframes
- visual direction guide
- typography and spacing rules

#### Acceptance Criteria

- all main screens are designed
- Sinhala text fits without clipping
- UI can be used without keyboard input
- visual language is simple and friendly for children

### Workstream 3: Technical Foundation

#### Goal

Set up the app architecture for a fast MVP build with low technical overhead.

#### Tasks

- Initialize the web app project
- Choose frontend framework:
  - React or Next.js
- Set up routing for core screens
- Define app state model for:
  - selected grade
  - selected topic
  - current session
  - score
  - progress history
- Define the content schema for questions
- Define storage approach for progress
- Add baseline support for Sinhala fonts and localization-safe layout
- Add asset handling for images and audio
- Set up basic testing and linting

#### Deliverables

- initialized application codebase
- content schema
- routing structure
- state management foundation
- local storage or persistence layer

#### Acceptance Criteria

- app runs locally
- question data can be loaded from structured content files
- progress can be saved and retrieved
- Sinhala content renders correctly in the app shell

### Workstream 4: Core Feature Implementation

#### Goal

Build the complete MVP learning flow end to end.

#### Tasks

- Implement grade selection screen
- Implement topic selection screen
- Implement question engine
- Implement answer submission flow
- Implement correct and incorrect feedback states
- Implement reward display such as stars
- Implement session completion summary
- Implement replay and topic-change actions
- Implement local progress tracking
- Implement parent view
- Add PIN protection for parent area if included in MVP
- Integrate images into applicable questions
- Integrate audio playback on question screens

#### Deliverables

- complete child learning flow
- complete session summary flow
- complete parent progress flow

#### Acceptance Criteria

- a child can start a session and finish it without blockers
- scores are calculated correctly
- progress is saved after sessions
- audio and image support work where required
- parent screen shows meaningful progress information

### Workstream 5: Sinhala Quality and Usability Testing

#### Goal

Validate that the app works naturally for Sinhala-speaking children on real devices.

#### Tasks

- Review all child-facing Sinhala text
- Review all word problems for natural phrasing
- Validate praise and error feedback tone
- Test Sinhala rendering on Android devices
- Test font readability on low-end devices
- Test audio clarity and pacing
- Conduct usability sessions with 5-10 children
- Observe where children hesitate or need adult help
- Adjust wording, layout, and difficulty progression

#### Deliverables

- usability findings log
- revised question set
- revised UI adjustments
- final Sinhala copy set

#### Acceptance Criteria

- children can complete the core flow with minimal assistance
- Sinhala copy is natural and understandable
- no major font or layout failures appear on test devices
- major usability issues are resolved

### Workstream 6: Release Preparation

#### Goal

Prepare the MVP for initial launch and early feedback collection.

#### Tasks

- finalize priority bug fixes
- verify mobile responsiveness
- verify basic performance on target devices
- confirm all key screens are complete
- confirm question bank coverage
- prepare deployment configuration
- set up lightweight feedback collection process
- document known limitations for MVP

#### Deliverables

- release candidate build
- deployment setup
- issue list for post-launch improvements

#### Acceptance Criteria

- no critical blockers remain
- app is deployable
- MVP scope is complete
- known gaps are documented

## 5. Recommended Build Order

The implementation should follow this order:

1. Finalize content schema and question structure
2. Build grade and topic selection
3. Build question engine
4. Build scoring and session summary
5. Add progress persistence
6. Add parent progress view
7. Integrate audio and images
8. Run Sinhala and usability validation
9. Prepare release

## 6. Dependencies

Key dependencies that affect delivery:

- Sinhala content review capacity
- access to real Android devices for testing
- decision on whether audio will be recorded or generated
- availability of images or illustration assets
- final choice of frontend stack and storage method

## 7. Risks and Mitigation

### Risk: Scope Expansion

If extra features are added too early, the MVP will slip.

Mitigation:

- keep multiplication, dashboards, and advanced gamification out of scope
- freeze MVP requirements before implementation begins

### Risk: Weak Sinhala UX

If wording or audio feels unnatural, adoption will suffer.

Mitigation:

- involve Sinhala-speaking reviewers early
- test copy and audio before full rollout

### Risk: Device Compatibility Problems

If Sinhala rendering or layout breaks on Android devices, core usability fails.

Mitigation:

- test fonts early
- validate screens on multiple device sizes

### Risk: Content Quality Gaps

If question difficulty is inconsistent, children may disengage.

Mitigation:

- structure content by grade and difficulty
- test progression with real learners

## 8. Milestones

### Milestone 1: Scope Locked

- MVP topics and grade coverage finalized
- content rules documented
- question structure approved

### Milestone 2: Design Ready

- wireframes completed
- visual direction selected
- Sinhala typography validated

### Milestone 3: Core App Playable

- children can complete a full practice session
- feedback and summary work correctly

### Milestone 4: Progress and Parent View Complete

- session history is saved
- basic parent reporting is available

### Milestone 5: Tested Release Candidate

- Sinhala content reviewed
- device testing completed
- major usability issues fixed

## 9. Definition of MVP Done

The MVP is complete when:

- a Grade 1-3 child can select a topic and complete a 5-10 question session
- the app is fully usable in Sinhala
- images and audio support the learning experience where required
- progress is saved and visible in a basic parent view
- the app works reliably on target mobile devices
- the first release is ready for limited launch and user feedback

## 10. Immediate Next Actions

The next execution steps should be:

1. Create the topic-by-grade content matrix
2. Define the question JSON schema
3. Draft the first 100-150 Sinhala questions
4. Produce wireframes for the main child-facing screens
5. Initialize the codebase and app shell
