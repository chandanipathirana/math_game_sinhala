# Sinhala Primary Math Practice App Specification

## 1. Document Purpose

This document defines the product specification for a Sinhala-language math practice app for primary school children. The first release is an MVP focused on simple, enjoyable, repeatable math practice that children can complete independently on a mobile device.

## 2. Product Goal

Build a mobile-first math practice app in Sinhala that helps primary school children improve basic numeracy through short interactive sessions, clear language, large touch-friendly controls, and immediate feedback.

## 3. Target Users

### Primary Users

- Children in Grades 1-3
- Sinhala-speaking learners
- Children using Android phones or tablets

### Secondary Users

- Parents who want to monitor progress
- Teachers who may recommend the app for extra practice

## 4. MVP Vision

The MVP should solve one narrow problem well:

- Children can independently complete short Sinhala math practice sessions
- Practice focuses on foundational math skills only
- Sessions are simple, visually clear, and rewarding

The app should not attempt to be a full school management platform or a complete curriculum product in version 1.

## 5. MVP Scope

### In Scope

- Grade selection for Grades 1-3
- Topic-based practice
- One question per screen
- Short practice sessions of 5-10 questions
- Sinhala-only child-facing experience
- Large buttons and clear visual design
- Image-supported questions
- Audio playback for question reading
- Instant correct/incorrect feedback
- End-of-session summary
- Basic local progress tracking
- Simple parent view for progress

### Out of Scope for MVP

- Multiplication and division
- Advanced gamification systems
- Teacher dashboard
- Classroom management
- Multi-language support
- Live competitions
- Complex personalization
- Full analytics platform

## 6. Learning Topics for MVP

The initial release should include only the following topics:

1. Number recognition
2. Counting
3. Addition
4. Subtraction
5. Bigger/smaller comparison
6. Simple word problems

## 7. Grade Coverage

### Grade 1

- Number recognition
- Counting objects
- Simple addition
- Simple subtraction

### Grade 2

- Larger number recognition
- Addition with slightly higher values
- Subtraction with slightly higher values
- Comparison questions
- Introductory word problems

### Grade 3

- Mixed addition and subtraction
- Comparison
- Slightly more complex word problems

## 8. Core Product Principles

The app should follow these principles:

- Simple enough for a child to use with minimal help
- Fully usable in Sinhala
- Designed for short attention spans
- Rewarding and encouraging, never punishing
- Focused on repetition and confidence-building
- Mobile-first and low-friction

## 9. User Experience Requirements

### Child Experience

- One task at a time
- Large readable Sinhala text
- Large touch targets
- Minimal distractions
- Bright, friendly visuals
- Clear success feedback
- Clear retry path after mistakes

### Session Design

- Each session contains 5-10 questions
- Each question appears on its own screen
- Feedback is immediate
- Final results screen is short and positive

### Interaction Rules

- Avoid text entry wherever possible
- Prefer tap-based answers
- Keep transitions simple and fast
- Use images to support understanding for younger children

## 10. Sinhala Language Requirements

Sinhala quality is a core requirement, not an optional translation layer.

### Content Requirements

- Use child-friendly Sinhala
- Avoid overly formal textbook wording
- Keep sentences short
- Use familiar examples from everyday life
- Ensure word problems sound natural when spoken aloud

### Technical Requirements

- Sinhala text must render correctly on common Android devices
- Font choice must be tested early
- UI layout must support Sinhala text length without clipping
- Audio should use natural Sinhala pronunciation

### Audio Requirements

- Every question should have an audio playback option
- Audio must be clear and slow enough for children
- Pre-recorded human audio is preferred over poor-quality TTS

## 11. Functional Requirements

### 11.1 Grade Selection

- The child can select Grade 1, Grade 2, or Grade 3
- Grade labels appear in Sinhala
- The selected grade determines available question difficulty

### 11.2 Topic Selection

- The child can choose a topic from a simple topic list
- Topics appear in Sinhala with supportive icons or illustrations

### 11.3 Question Engine

- The app displays one question at a time
- Questions may use text, numbers, and images
- The app supports multiple-choice or tap-based answers
- Questions should be drawn from a structured question bank or generated from safe templates

### 11.4 Feedback

- Correct answers show positive Sinhala feedback such as short praise
- Incorrect answers show gentle corrective feedback
- Feedback should encourage retry and continued effort

### 11.5 Session Summary

- Show total correct answers
- Show a simple reward such as stars
- Offer replay or topic change

### 11.6 Progress Tracking

- Store completed sessions
- Track scores by topic
- Track weak areas at a basic level
- MVP can store progress locally on device or in a simple user account

### 11.7 Parent View

- Show completed sessions
- Show score trends by topic
- Highlight weaker areas
- Optionally protect this area with a simple PIN

## 12. Content Design Specification

### Question Style

- Short and direct
- Visual when possible
- Age-appropriate
- Progressively structured from easy to harder

### Difficulty Levels

Each topic should include:

- Easy
- Medium
- Hard

Difficulty should increase gradually and should not jump sharply between questions.

### Content Examples

- Number recognition: identify the correct number
- Counting: count stars, fruits, or animals
- Addition: simple sums such as 2 + 3
- Subtraction: simple subtraction such as 6 - 2
- Comparison: choose the larger or smaller number
- Word problem: short everyday scenarios in Sinhala

### Initial Content Target

The MVP should launch with approximately 100-150 questions or templates distributed across the selected topics and grades.

## 13. Non-Functional Requirements

### Performance

- App should load quickly on low-to-mid-range Android devices
- Screen transitions should feel responsive

### Accessibility

- Text must be large and legible
- Color should not be the only signal for correctness
- Audio support should help early readers

### Device and Connectivity

- Mobile-first design is mandatory
- The MVP should work well on common Android browsers
- Offline-friendly behavior is strongly preferred
- If full offline mode is not available in version 1, cached core content should still be considered

## 14. Recommended Platform Approach

The best initial implementation approach is:

- Build a mobile-first web app
- Use it as the first production MVP
- Validate the content and UX before investing in separate native apps

### Why This Approach

- Faster to build than separate Android and iOS apps
- Lower initial cost
- Easier to test with real users
- Sufficient for proving the learning model and Sinhala UX

## 15. Suggested Technical Stack

### Frontend

- React or Next.js
- Mobile-first responsive UI

### Backend

- Firebase or Supabase

### Content Storage

- JSON-based question bank for MVP

### Audio

- Pre-recorded audio clips preferred
- TTS only if quality is acceptable

### Progress Storage

- Local storage for fast MVP
- Optional cloud sync in later phase

## 16. App Screens

The MVP should include the following screens:

1. Splash or welcome screen
2. Grade selection screen
3. Topic selection screen
4. Question screen
5. Feedback state for correct and incorrect answers
6. Session complete screen
7. Parent entry screen
8. Basic progress screen

## 17. Rewards and Motivation

The rewards system should remain simple in version 1.

### Included

- Stars for correct answers
- Short praise in Sinhala
- Topic completion badge or simple celebration

### Excluded

- Virtual shops
- Complex coins or points economy
- Competitive leaderboards

## 18. Success Criteria for MVP

The MVP is successful if:

- A child can complete a session with little or no help after a short introduction
- Sinhala text and audio are clear and natural
- Children stay engaged for a full short session
- Parents can understand progress easily
- Children are willing to replay sessions

## 19. Risks

### Product Risks

- Sinhala wording may feel unnatural
- Questions may not match actual grade level
- UX may be too complex for younger children
- The app may become cluttered if too many features are added early

### Technical Risks

- Sinhala font rendering issues on Android devices
- Poor audio quality
- Weak offline support

### Mitigation

- Test early with children, parents, and teachers
- Review content with Sinhala-speaking educators
- Validate fonts and layout on real devices
- Keep MVP feature set narrow

## 20. Delivery Plan

### Phase 1: Definition

- Confirm grade range
- Finalize topics
- Write first 100-150 questions
- Create wireframes for key screens

### Phase 2: MVP Build

- Build grade and topic selection
- Build question engine
- Build session flow
- Add feedback and results
- Add local progress tracking

### Phase 3: Sinhala UX and Testing

- Add Sinhala audio
- Validate Sinhala font rendering
- Test with 5-10 children
- Adjust wording, layout, and difficulty

### Phase 4: Release Preparation

- Fix critical usability issues
- Prepare deployment
- Collect first round of parent and teacher feedback

## 21. Future Enhancements

These can be considered after MVP validation:

- Multiplication and division
- Teacher dashboard
- Account sync across devices
- Richer adaptive learning
- More detailed reporting
- Additional grade levels
- Native Android app

## 22. Immediate Next Steps

The next product tasks should be:

1. Define the exact grade coverage for launch
2. Finalize the first four topics
3. Draft the first 100-150 Sinhala questions
4. Create wireframes for the six main child-facing screens
5. Validate font and audio approach on Android devices
