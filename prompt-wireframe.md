# Design Wireframe Workflow Prompt

## Context

You are a UI/UX designer working on the `poetry-and-pottery` project. Your task is to create wireframe design options following a structured wireframe-first approach. Do not read existing wireframes. You just have to implement the designs.

**IMPORTANT:**

- This is the wireframe creation phase only. Do NOT implement any code.
- Do NOT update `wireframes/index.html` to avoid merge conflicts.
- **Parallel Mode:** Multiple agents may work on different tasks simultaneously. Check `design-refactor.md` for task statuses before starting work.

---

## URLs

| Resource   | URL                                                    |
| ---------- | ------------------------------------------------------ |
| Wireframes | `http://127.0.0.1:5500/poetry-and-pottery/wireframes/` |
| Website    | `http://127.0.0.1:3005/`                               |

**Note:** These servers are already running and accessible. No need to start them.

---

## Task Overview

Create **wireframe design options** for sub-tasks within a **specific phase** from `poetry-and-pottery/design-refactor.md`. Each wireframe must show designs for all three viewports (mobile, tablet, desktop).

**Parallel Workflow:**

1. Read `design-refactor.md` to identify the current phase and check task statuses
2. Find a phase that has `🔲 Wireframe Pending` sub-tasks
3. If the phase is not already `🚧 In Progress`, mark it as `🚧 In Progress`
4. Within that phase, skip any sub-task marked `🚧 In Progress` (another agent is working on it)
5. Pick the next available `🔲 Wireframe Pending` sub-task within the phase
6. Mark the sub-task as `🚧 In Progress` in `design-refactor.md` BEFORE starting work
7. Create the wireframe designs
8. Mark sub-task as `⏳ Awaiting Approval` when done
9. Repeat for remaining pending sub-tasks in the same phase

---

## Workflow Steps

### Step 1: Analysis & Planning

1. **Read the task file and identify the phase**
   - Open and review `poetry-and-pottery/design-refactor.md`
   - Find a phase that has `🔲 Wireframe Pending` sub-tasks
   - If the phase is not already marked `🚧 In Progress`, mark it now

2. **Select a sub-task within the phase**
   - Within your chosen phase, check for sub-tasks with status `🚧 In Progress` — **SKIP these** (another agent is working on them)
   - Identify and select the next available sub-task with status `🔲 Wireframe Pending`

3. **Claim the sub-task (BEFORE starting work)**
   - Update `design-refactor.md` to mark your selected sub-task as `🚧 In Progress`
   - This prevents other agents from picking up the same sub-task

4. **Study existing design context**
   - Review existing wireframes in `poetry-and-pottery/wireframes/` folder (do NOT modify `index.html`)
   - Use `agent-browser` to view and capture snapshots of existing wireframes
   - Analyze the forest theme (colors, typography, spacing conventions)
   - Note the mandatory design tokens from `design-refactor.md`

---

### Step 2: Study Existing Wireframes

3. **View wireframes using agent-browser**

   ```bash
   # View wireframes index
   agent-browser open http://127.0.0.1:5500/poetry-and-pottery/wireframes/index.html
   agent-browser snapshot  # Get accessibility tree
   agent-browser screenshot wireframes-index.png --full

   # View specific wireframe files
   agent-browser open http://127.0.0.1:5500/poetry-and-pottery/wireframes/task-X-X-name.html

   # Capture at different viewports
   agent-browser set viewport 375 812    # Mobile
   agent-browser screenshot mobile.png

   agent-browser set viewport 768 1024   # Tablet
   agent-browser screenshot tablet.png

   agent-browser set viewport 1440 900   # Desktop
   agent-browser screenshot desktop.png
   ```

---

### Step 3: Wireframe Creation

For **EACH** selected task, create wireframe options:

4. **Create 3-4 design options (A, B, C, D)**

   Each option MUST include designs for ALL viewports:

   | Viewport | Width  | Height | Breakpoint    |
   | -------- | ------ | ------ | ------------- |
   | Mobile   | 375px  | 812px  | Default       |
   | Tablet   | 768px  | 1024px | `md:`         |
   | Desktop  | 1440px | 900px  | `lg:` / `xl:` |

5. **Wireframe file structure**
   - **Location:** `poetry-and-pottery/wireframes/`
   - **Naming:** `task-X-X-component-name.html`
   - **Shared styles:** Import from `_shared-styles.css`
   - **Format:** HTML with forest theme styles

6. **Wireframe content requirements**

   Each wireframe file should include:
   - Task number and component name as title
   - Status indicator (IN PROGRESS or AWAITING APPROVAL)
   - All design options labeled (Option A, B, C, D)
   - All three viewport sizes per option
   - Notes/feedback area (optional)

---

### Step 4: Finalize & Move to Next Task

7. **Capture wireframe screenshots**

   ```bash
   # Open your new wireframe
   agent-browser open http://127.0.0.1:5500/poetry-and-pottery/wireframes/task-X-X-name.html

   # Capture Mobile viewport for each option
   agent-browser set viewport 375 812
   agent-browser screenshot task-X-X-mobile-optionA.png
   agent-browser scroll down 500
   agent-browser screenshot task-X-X-mobile-optionB.png
   # ... repeat for all options

   # Capture Tablet viewport
   agent-browser set viewport 768 1024
   agent-browser screenshot task-X-X-tablet-optionA.png
   # ... repeat

   # Capture Desktop viewport
   agent-browser set viewport 1440 900
   agent-browser screenshot task-X-X-desktop-optionA.png
   # ... repeat
   ```

8. **Update task status**
   - Update `poetry-and-pottery/design-refactor.md`
   - Change task status from `🚧 In Progress` to `⏳ Awaiting Approval`

9. **Pick up next sub-task in the same phase**
   - Go back to Step 1 and repeat for remaining `🔲 Wireframe Pending` sub-tasks within the same phase
   - Continue until all sub-tasks in the phase are designed or claimed by other agents

---

<!-- ### Step 5: Record Approval (After User Responds)

10. **Document user selections**
    - Record which option was selected for each viewport
    - Update wireframe file with approval status
    - Update `design-refactor.md` status to `✅ Approved`
    - Document any user feedback or modifications requested

11. **Clean up wireframe file**
    - Keep ONLY the approved options for each viewport
    - Remove non-selected options
    - Mark section as `✅ APPROVED`
    - Add approved selections summary at top

--- -->

## STOP HERE - Do Not Implement

**CRITICAL:** After approval is recorded, STOP. Do not proceed with implementation.

Implementation is handled by `prompt-implement.md` which:

1. Takes snapshots of approved wireframes
2. Implements the code changes
3. Verifies UI matches wireframe via agent-browser
4. Updates design-refactor.md to mark tasks as completed

---

## agent-browser Quick Reference

```bash
# Navigation
agent-browser open <url>              # Open URL
agent-browser reload                  # Reload page

# Viewport Control
agent-browser set viewport 375 812    # Mobile
agent-browser set viewport 768 1024   # Tablet
agent-browser set viewport 1440 900   # Desktop

# Screenshots
agent-browser screenshot <path>       # Screenshot current view
agent-browser screenshot <path> --full # Full page screenshot

# Accessibility & AI
agent-browser snapshot                # Get element tree with refs
agent-browser snapshot -i             # Interactive elements only
agent-browser snapshot -c             # Compact output

# Scrolling
agent-browser scroll down 500         # Scroll down 500px
agent-browser scroll up 300           # Scroll up 300px
agent-browser scrollintoview <sel>    # Scroll element into view

# Element Info
agent-browser get text <sel>          # Get element text
agent-browser get html <sel>          # Get element HTML
agent-browser is visible <sel>        # Check if visible
```

---

## Design Requirements Checklist

Before presenting wireframes, verify:

- [ ] Uses ONLY forest theme colors (no new colors)
- [ ] All 3 viewports designed (mobile, tablet, desktop)
- [ ] Follows page header pattern from design-refactor.md
- [ ] Follows card pattern (no borders, soft shadows, rounded-2xl)
- [ ] Button styles correct (rounded-lg for CTA, rounded-full for icons)
- [ ] Typography uses Plus Jakarta Sans (display) and Outfit (body)
- [ ] Proper spacing (generous outer, tight inner)
- [ ] 3-4 distinct options with clear differences
- [ ] Screenshots captured for all options/viewports

---

## Output Expectations

At the end of this workflow:

1. **New wireframe file(s)** in `wireframes/` folder with:
   - 3-4 design options per task
   - All 3 viewports per option
   - Do NOT modify `index.html`

2. **Screenshots** of all wireframe options at each viewport

3. **Updated design-refactor.md** with:
   - Phase marked `🚧 In Progress`
   - Sub-tasks marked `⏳ Awaiting Approval` when wireframes are complete

**Note:** Approval stage will be handled separately. Focus only on creating wireframe designs.

---

## Status Legend

| Status                 | Meaning                                                |
| ---------------------- | ------------------------------------------------------ |
| `🔲 Wireframe Pending` | Task available — pick this up                          |
| `🚧 In Progress`       | Agent is actively working on this — **SKIP** (claimed) |
| `⏳ Awaiting Approval` | Wireframes created, waiting for user selection         |
| `✅ Approved`          | User approved, ready for implementation                |
| `✔️ Completed`         | Implementation done and verified                       |
