# Design System Strategy: The Ethereal Assistant

## 1. Overview & Creative North Star
The North Star for this design system is **"The Digital Curator."** 

We are moving away from the "industrial" look of traditional SaaS and toward an editorial, high-end experience that feels more like a premium workspace than a technical tool. While inspired by Notion and ChatGPT, we are ditching the rigid lines and "containerized" feel. 

Our goal is to create a **frictionless digital atmosphere**. This is achieved through intentional asymmetry, massive breathing room, and a "soft-brutalism" approach where hierarchy is defined by tonal shifts rather than structural dividers. The interface should feel as though it is printed on fine-grain paper, with AI elements appearing as light-catching glass layers.

---

## 2. Colors: The Tonal Atmosphere
We use color not to decorate, but to define space and "soul." 

### The "No-Line" Rule
**Strict Mandate:** 1px solid borders for sectioning are prohibited. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the definition a user needs.

### Surface Hierarchy & Nesting
Treat the UI as physical layers. Use the surface-container tiers to create nested depth:
- **Base Layer:** `surface` (#f7f9fb)
- **Secondary Workspace:** `surface-container-low` (#f0f4f7)
- **Interactive Cards:** `surface-container-lowest` (#ffffff) for maximum "lift."

### The "Glass & Gradient" Rule
For AI-specific interactions, use "Glassmorphism." Apply `surface-container-lowest` at 60% opacity with a `backdrop-filter: blur(12px)`. This makes the AI feel like a floating, sentient layer above the data. 

**Signature Texture:** Use a subtle linear gradient for primary actions: `primary` (#5450c1) to `primary-container` (#8c88fd) at a 135-degree angle. This adds a "lithographic" depth that flat hex codes lack.

---

## 3. Typography: Editorial Authority
We utilize a dual-font system to balance technical precision with human-centric warmth.

- **Display & Headlines (Manrope):** Chosen for its geometric but friendly personality. Use `display-lg` for welcome states to create an "Editorial" feel. Bold weights should be reserved for high-level information to ground the page.
- **Body & Interface (Inter):** The workhorse. Inter’s high x-height ensures readability in dense AI chat logs and task lists.
- **Hierarchy as Identity:** The contrast between a `display-md` headline and a `label-sm` metadata tag creates a sense of professional curation. Use `tertiary` (#745479) for subtle labels to distinguish "meta-info" from "content."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often messy. We use **Ambient Depth.**

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a soft, natural lift without a single pixel of shadow.
- **Ambient Shadows:** When a card *must* float (e.g., a file upload modal), use a shadow with a blur of 40px, a Y-offset of 12px, and 6% opacity of the `on-surface` color (#2c3437). It should feel like a soft glow, not a dark edge.
- **The Ghost Border:** If accessibility requires a border, use `outline-variant` (#acb3b7) at **15% opacity**. This is the only exception to the No-Line Rule.

---

## 5. Components

### Sidebar Navigation
- **Styling:** Set on `surface-container-low`. No border on the right. 
- **Active State:** Use a `primary-container` pill with `on-primary-container` text. 
- **Interaction:** Indent items slightly on hover rather than just changing color.

### Chat Bubbles
- **User Bubble:** `surface-container-highest` (#dce4e8) with `xl` (1.5rem) rounded corners. Align right.
- **AI Bubble:** `surface-container-lowest` (#ffffff) with a 2px "Ghost Border." Use a subtle `primary` tint for the AI icon to signify "intelligence."
- **Spacing:** Use 24px (1.5rem) between bubbles to maintain the "Editorial" whitespace.

### File Upload Cards
- **Structure:** `surface-container-lowest` with an `outline-variant` dashed "Ghost Border" (20% opacity).
- **Visuals:** Use `tertiary-container` (#f5cdf9) for the upload icon to give it a soft, purple "AI-ready" accent.

### Task Cards & Calendar Elements
- **Layout:** Remove all internal dividers. Use `body-sm` in `on-surface-variant` for dates.
- **Task State:** A completed task shouldn't just be struck through; it should fade to 40% opacity, receding into the background surface.
- **Calendar:** The current day is marked by a `primary` circle; all other days sit on a clean `surface` grid defined by whitespace alone.

### Buttons
- **Primary:** `primary` gradient, `full` (pill) roundedness, 8px soft ambient shadow.
- **Secondary:** `surface-container-high` background, no shadow, `on-surface` text.
- **Interaction:** On click, scale the button down to 0.98 to provide tactile feedback.

---

## 6. Do's and Don'ts

### Do
- **DO** use `xl` (1.5rem) corners for large cards and `sm` (0.25rem) for small UI elements like checkboxes.
- **DO** use "Generous Whitespace." If you think there is enough space, add 8px more.
- **DO** use `tertiary` tones for AI suggestions to differentiate them from human-generated tasks.

### Don't
- **DON'T** use #000000 for text. Always use `on-surface` (#2c3437) for a softer, premium feel.
- **DON'T** use 1px dividers between list items. Use 12px of vertical padding instead.
- **DON'T** use high-saturation "alert" reds. Use our `error` (#a8364b) for a more sophisticated, muted warning.