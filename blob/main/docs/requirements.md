# Requirements: Team Page & Login Styling

## 1. Team Page Requirements

The application must include a team page that displays information about the project team and individual members.

### Team Information

| Field | Requirement | Rules |
| --- | --- | --- |
| Team Name | Display the team's name | Required. Display prominently on the page. |
| Project Name | Display the project name | Required. Display near the team name. |
| Member Photo | Display each team member's photo | If unavailable, display a placeholder avatar. |
| Member Name | Display each member's name | Required. Display clearly with member details. |
| Member Role | Display each member's project role | Required. Examples: PM, BA, UX Designer, Developer. |
| About Us Blurb | Display a short description of each member | Support multiple lines and prevent text overflow. |

### Team-Specific Considerations

- The page must support all team members.
- Members without a headshot must use a placeholder avatar.
- Longer descriptions must be displayed correctly without being restricted to one line.

---

## 2. Login Styling Scope

The login page changes are limited to **visual styling only**.

### Allowed Changes

- Layout
- Colours
- Typography
- Spacing
- Buttons
- UI components
- General visual improvements

### Not Allowed

The following must remain unchanged:

- Authentication logic
- Login validation behaviour
- Authentication configuration
- Session management
- User permissions
- Existing login flow

No backend or authentication functionality should be modified.

---

## 3. Navigation Flow

- The Team Page is displayed **after a successful login**.
- Users must log in before they can access the Team Page.
- The existing login flow must remain unchanged.

---

## 4. Data Source

- Team member information will be **hardcoded** for the mock sprint.
- No Firestore integration or backend changes are required.
- The page will display static team information only.

---

## 5. Edge Cases

### Missing Profile Photo

**Expected behaviour:**

- Display a default placeholder avatar.
- Maintain consistent layout.

### Long Member Names

**Expected behaviour:**

- Wrap or truncate text gracefully.
- Prevent layout issues.

### Long About Us Blurbs

**Expected behaviour:**

- Allow multi-line text.
- Prevent overflow outside the component.

### Different Screen Sizes

**Expected behaviour:**

- Maintain readability across desktop and smaller screens.
- Adapt the layout appropriately.

---

## 6. Acceptance Criteria

The feature is complete when:

- The team page displays:
  - Team name
  - Project name
  - Member photos
  - Member names
  - Member roles
  - About Us blurbs

- Missing photos display placeholder avatars.
- Long text does not break the layout.
- Login styling has been updated.
- Existing authentication behaviour remains unchanged.

---

## 7. Handoff Notes

These requirements define the expected behaviour and limitations of the team page and login styling feature.

**For UX:**

- Use placeholder avatars where photos are unavailable.
- Support multi-line descriptions for members with longer blurbs.

**For Developers:**

- Implement the design while keeping authentication functionality unchanged.
