# Case Study 1: InvenTree Parts UI Manual Test Suite

This document outlines a comprehensive manual test suite for the InvenTree Parts module. It covers part creation, detail views, attributes, categories, revisions, units of measure, and boundary conditions.

---

## Suite Summary
- **Total Test Cases**: 26
- **Test Categories**: Part Creation & Import, Detail View Tabs, Part Categories, Attributes, Units of Measure, Revisions, Negative & Boundary scenarios.

---

## 1. Part Creation & Import Flows

### TC-UI-001: Manual Part Creation (Happy Path)
- **Feature**: Part Creation
- **Description**: Verify that a user can create a standard active part with all required and basic optional fields.
- **Preconditions**: User is logged in with part-creation permissions. At least one part category exists.
- **Execution Steps**:
  1. Navigate to the Parts listing page.
  2. Click on the "Create Part" button.
  3. Enter Name: `Resistor 10k Ohm`, IPN: `RES-10K-0805`.
  4. Select a valid Part Category from the dropdown (e.g. `Electronics/Resistors`).
  5. Enter Description: `10k Ohm surface mount resistor 0805`.
  6. Ensure "Active" checkbox is checked.
  7. Click "Save".
- **Expected Result**: Part is successfully created. User is redirected to the newly created part's detail page displaying a success message.
- **Negative/Boundary Check**: No

### TC-UI-002: Part Creation - Duplicate IPN Check (Negative)
- **Feature**: Part Creation
- **Description**: Verify that the system prevents creation of a part with a duplicate Internal Part Number (IPN).
- **Preconditions**: A part with IPN `RES-10K-0805` already exists in the database.
- **Execution Steps**:
  1. Click on "Create Part".
  2. Enter Name: `Alternative Resistor 10k`, IPN: `RES-10K-0805` (identical to existing).
  3. Select Category: `Electronics/Resistors`.
  4. Click "Save".
- **Expected Result**: Part is not created. A validation error appears on the IPN field indicating "A part with this IPN already exists".
- **Negative/Boundary Check**: Yes

### TC-UI-003: Part Creation - Missing Required Fields (Negative)
- **Feature**: Part Creation
- **Description**: Verify validation errors appear if required fields are left blank.
- **Preconditions**: User on Part Creation modal.
- **Execution Steps**:
  1. Clear the "Name" field.
  2. Select a Category.
  3. Click "Save".
- **Expected Result**: Validation error appears on "Name" field: "This field is required". Save is blocked.
- **Negative/Boundary Check**: Yes

### TC-UI-004: Bulk Part Import via Data Wizard
- **Feature**: Part Import
- **Description**: Verify that parts can be imported via an external CSV file.
- **Preconditions**: CSV file with columns `Name`, `Description`, `Category` prepared.
- **Execution Steps**:
  1. Navigate to Parts list.
  2. Click "Import" or "Upload Parts File".
  3. Select the CSV file and upload.
  4. Map columns: `Name` to `Name`, `Description` to `Description`, `Category` to `Category`.
  5. Run validation step. Confirm no mapping errors.
  6. Click "Submit Import".
- **Expected Result**: Data wizard reports successful import of all rows. The newly imported parts appear in the Parts list table.
- **Negative/Boundary Check**: No

---

## 2. Part Detail View Tabs

### TC-UI-005: Detail View Tab - Stock Navigation
- **Feature**: Part Detail Tabs
- **Description**: Verify that the "Stock" tab correctly shows stock items and levels.
- **Preconditions**: A part exists with 2 stock items in different locations.
- **Execution Steps**:
  1. Open Part Detail page.
  2. Click on the "Stock" tab.
- **Expected Result**: The tab displays a list of stock items showing current quantity, location (e.g. `Warehouse A`), and status. The total stock matches the sum of the individual items.
- **Negative/Boundary Check**: No

### TC-UI-006: Detail View Tab - BOM (Bill of Materials) Management
- **Feature**: Part Detail Tabs
- **Description**: Verify that the "BOM" tab lists sub-components for an Assembly part and allows adding a new BOM item.
- **Preconditions**: Part is configured with "Assembly" attribute = True. A component part exists.
- **Execution Steps**:
  1. Open the assembly part's detail page.
  2. Click on the "BOM" tab.
  3. Verify existing sub-components list is visible.
  4. Click "Add BOM Item".
  5. Select a component part, enter Quantity: `2`, and click "Save".
- **Expected Result**: The new component is added to the BOM list and quantity is displayed correctly.
- **Negative/Boundary Check**: No

### TC-UI-007: Detail View Tab - Allocated Stock
- **Feature**: Part Detail Tabs
- **Description**: Verify that the "Allocated" tab shows stock items allocated to builds or sales orders.
- **Preconditions**: Part has stock items allocated to Build Order #100.
- **Execution Steps**:
  1. Open Part Detail.
  2. Click "Allocated" tab.
- **Expected Result**: Displays list showing "Build Order #100", allocated quantity, and date allocated.
- **Negative/Boundary Check**: No

### TC-UI-008: Detail View Tab - Build Orders
- **Feature**: Part Detail Tabs
- **Description**: Verify the "Build Orders" tab displays builds where this part is either the output or a required component.
- **Preconditions**: The part is listed in an active build order.
- **Execution Steps**:
  1. Open Part Detail.
  2. Click "Build Orders" tab.
- **Expected Result**: Displays the table of matching Build Orders with Status, Quantity, and Dates.
- **Negative/Boundary Check**: No

### TC-UI-009: Detail View Tab - Parameters
- **Feature**: Part Detail Tabs
- **Description**: Verify Part Parameters (e.g. Resistance, Tolerance) are displayed and editable.
- **Preconditions**: Part has parameters template defined.
- **Execution Steps**:
  1. Navigate to Part Detail -> "Parameters" tab.
  2. Click "Add Parameter" or edit icon next to "Resistance".
  3. Change value to `10.5k Ohm` and save.
- **Expected Result**: Parameter value updates on screen and matches the modified value.
- **Negative/Boundary Check**: No

### TC-UI-010: Detail View Tab - Variants (Templates)
- **Feature**: Part Detail Tabs
- **Description**: Verify that variants of a template part are displayed.
- **Preconditions**: Part is designated as a Template part and has 2 variant parts.
- **Execution Steps**:
  1. Open the template part's page.
  2. Click the "Variants" tab.
- **Expected Result**: Displays a table listing the 2 variant parts with links to their respective detail pages.
- **Negative/Boundary Check**: No

### TC-UI-011: Detail View Tab - Revisions
- **Feature**: Part Detail Tabs
- **Description**: Verify the "Revisions" tab lists past design revisions of this part.
- **Preconditions**: Part revisions feature is enabled and revisions exist.
- **Execution Steps**:
  1. Open Part Detail page.
  2. Click "Revisions" tab.
- **Expected Result**: A table lists past revisions (e.g., Rev A, Rev B) with comments and change dates.
- **Negative/Boundary Check**: No

### TC-UI-012: Detail View Tab - Attachments
- **Feature**: Part Detail Tabs
- **Description**: Verify that files (datasheets, images) can be uploaded and displayed under Attachments.
- **Preconditions**: A PDF datasheet file is ready on the local machine.
- **Execution Steps**:
  1. Open Part Detail -> "Attachments" tab.
  2. Click "Upload File" and select the PDF.
  3. Click "Save".
- **Expected Result**: File is uploaded, appears in the attachments list with correct file size, and provides a download link.
- **Negative/Boundary Check**: No

### TC-UI-013: Detail View Tab - Related Parts
- **Feature**: Part Detail Tabs
- **Description**: Verify mapping and displaying of related parts.
- **Preconditions**: Two separate parts exist.
- **Execution Steps**:
  1. Navigate to Part Detail -> "Related Parts" tab.
  2. Click "Add Related Part".
  3. Select the other part and click "Save".
- **Expected Result**: The relationship is established; both parts show each other in their "Related Parts" tab.
- **Negative/Boundary Check**: No

### TC-UI-014: Detail View Tab - Test Templates
- **Feature**: Part Detail Tabs
- **Description**: Verify that test templates (quality checks) can be defined.
- **Preconditions**: Part is marked as "Testable".
- **Execution Steps**:
  1. Navigate to Part Detail -> "Test Templates" tab.
  2. Click "Add Test Template".
  3. Enter Name: `Visual Inspection`, Checkbox: `Required`. Click "Save".
- **Expected Result**: Test template is added and will be required for any stock item test results.
- **Negative/Boundary Check**: No

---

## 3. Part Categories Hierarchy & Filtering

### TC-UI-015: Category Tree and Breadcrumb Navigation
- **Feature**: Part Categories
- **Description**: Verify hierarchical category tree navigation and breadcrumb updates.
- **Preconditions**: Hierarchy `Electronics` -> `Semiconductors` -> `Diodes` exists.
- **Execution Steps**:
  1. Navigate to Parts list.
  2. Click on category card `Electronics`.
  3. Click on sub-category card `Semiconductors`.
- **Expected Result**: Category view filters to only display parts in Semiconductors and its sub-categories. Breadcrumb updates to `Parts > Electronics > Semiconductors`.
- **Negative/Boundary Check**: No

### TC-UI-016: Parametric Tables and Advanced Filtering
- **Feature**: Part Categories
- **Description**: Verify category part listing filters parts on attribute checkboxes and parametric columns.
- **Preconditions**: Multiple parts with different attributes exist in the category.
- **Execution Steps**:
  1. Open `Electronics` category.
  2. Apply filter: Check `Assembly` only.
  3. Apply search query: `Microcontroller`.
- **Expected Result**: The table updates immediately to display only parts that are assemblies AND contain "Microcontroller" in name/IPN/description.
- **Negative/Boundary Check**: No

---

## 4. Part Attributes Configuration

### TC-UI-017: Part Attributes Behavior - Assembly vs Component
- **Feature**: Attributes
- **Description**: Verify setting Assembly/Component flags unlocks/locks corresponding tabs.
- **Preconditions**: User is editing a part.
- **Execution Steps**:
  1. Open Edit Part form.
  2. Check "Assembly" flag, uncheck "Component" flag. Save.
  3. Observe tabs.
  4. Edit Part form again, uncheck "Assembly" flag. Save.
- **Expected Result**:
  - When "Assembly" is checked: "BOM" and "Build Orders" tabs are visible.
  - When "Assembly" is unchecked: "BOM" tab is hidden.
- **Negative/Boundary Check**: No

### TC-UI-018: Part Attributes Behavior - Trackable (Serial Numbers)
- **Feature**: Attributes
- **Description**: Verify that checking "Trackable" enables serial number assignment on stock creation.
- **Preconditions**: Editing a part.
- **Execution Steps**:
  1. Toggle "Trackable" flag to TRUE on Part Edit screen. Save.
  2. Click "New Stock Item" for this part.
- **Expected Result**: The Stock creation form displays field for "Serial Numbers" (range assignment, e.g. 101-110). If "Trackable" is FALSE, serial fields are hidden or disabled.
- **Negative/Boundary Check**: No

---

## 5. Units of Measure Configuration

### TC-UI-019: Base Unit and Compatible Supplier Unit
- **Feature**: Units of Measure
- **Description**: Verify that supplier parts allow compatible physical unit conversions.
- **Preconditions**: A part exists with base unit `meters`.
- **Execution Steps**:
  1. Go to the part's purchasing tab.
  2. Add Supplier Part.
  3. Enter Supplier Unit: `cm`. Save.
- **Expected Result**: Supplier unit is accepted because centimeters are compatible with meters.
- **Negative/Boundary Check**: No

### TC-UI-020: Base Unit and Incompatible Supplier Unit (Negative)
- **Feature**: Units of Measure
- **Description**: Verify error when specifying incompatible physical units.
- **Preconditions**: A part exists with base unit `meters`.
- **Execution Steps**:
  1. Go to the part's purchasing tab.
  2. Add Supplier Part.
  3. Enter Supplier Unit: `liters`. Save.
- **Expected Result**: Save fails. Error message displayed: "Units are incompatible with base units (meters vs liters)".
- **Negative/Boundary Check**: Yes

---

## 6. Part Revisions & Locking

### TC-UI-021: Part Revision Creation
- **Feature**: Part Revisions
- **Description**: Verify creation of a design revision.
- **Preconditions**: Revisions feature is enabled. A base part exists.
- **Execution Steps**:
  1. Navigate to Part detail.
  2. Click "Create Revision" button.
  3. Enter Revision code: `B`, description: `Updated PCB trace width`. Save.
- **Expected Result**: Revision Part is created. Revision lists in the "Revisions" tab.
- **Negative/Boundary Check**: No

### TC-UI-022: Prevent Circular Revisions (Negative)
- **Feature**: Part Revisions
- **Description**: Verify that the system blocks circular revision linkage.
- **Preconditions**: Part A is a revision of Part B.
- **Execution Steps**:
  1. Edit Part B.
  2. Set "Revision Of" field to Part A.
  3. Click Save.
- **Expected Result**: Save is rejected. Validation error: "Circular revision reference detected".
- **Negative/Boundary Check**: Yes

### TC-UI-023: Part Lock Enforcement (Negative)
- **Feature**: Part Locking
- **Description**: Verify that locking a part prevents modifying parameters and BOM items.
- **Preconditions**: Part locking is enabled globally. A part has "Locked" attribute = True.
- **Execution Steps**:
  1. Go to the locked part's detail page.
  2. Navigate to BOM tab. Try to delete an item.
  3. Navigate to Parameters tab. Try to edit a parameter value.
- **Expected Result**: Edit/Delete actions are disabled (buttons grayed out or hidden). Direct POST/DELETE requests return a 400 Bad Request / Locked error.
- **Negative/Boundary Check**: Yes

---

## 7. Negative & Boundary Scenarios

### TC-UI-024: Inactive Part Restrictions (Negative)
- **Feature**: Active/Inactive States
- **Description**: Verify that an inactive part cannot be added to a Bill of Materials or new Stock Item.
- **Preconditions**: A part has "Active" attribute = False.
- **Execution Steps**:
  1. Navigate to an active Assembly part -> BOM tab.
  2. Click "Add BOM Item".
  3. Search for the inactive part in the part selection dropdown.
- **Expected Result**: The inactive part does not appear in the selection list, or is marked as disabled and cannot be selected.
- **Negative/Boundary Check**: Yes

### TC-UI-025: Revision-of-Revision Chain Prevention (Negative)
- **Feature**: Part Revisions
- **Description**: Verify that the system blocks setting a revision's revision to the base.
- **Preconditions**: Part B is a revision of Part A.
- **Execution Steps**:
  1. Create Part C as a revision of Part B.
  2. Attempt to make Part A a revision of Part C.
- **Expected Result**: Save fails with a circular reference or revision validation warning.
- **Negative/Boundary Check**: Yes

### TC-UI-026: Mandatory IPN format boundary check
- **Feature**: Part Creation
- **Description**: Verify boundary length limit of Internal Part Number (IPN).
- **Preconditions**: User is creating a part.
- **Execution Steps**:
  1. Enter IPN with 101 characters (exceeding maximum 100 character limit).
  2. Click Save.
- **Expected Result**: Save fails. Error message displayed: "Ensure this value has at most 100 characters (it has 101)."
- **Negative/Boundary Check**: Yes

---

## 8. Security & Accessibility (Non-Functional Test Cases)

### TC-UI-027: Keyboard Only Navigation (Accessibility - WCAG 2.1 AA)
- **Feature**: Accessibility (A11y)
- **Description**: Verify that the "Create Part" modal is fully operable using only a keyboard.
- **Preconditions**: User is logged in and is on the Parts list page.
- **Execution Steps**:
  1. Unplug the mouse/disable touchpad.
  2. Use `Tab` to navigate to the "Create Part" button and press `Enter`.
  3. Verify keyboard focus indicator is visible on the first field (Name).
  4. Fill the fields and use `Tab` to navigate to the "Save" button. Press `Enter`.
- **Expected Result**: The entire modal opens, fields receive focus in a logical sequence, and the form can be submitted successfully without mouse interaction.
- **Negative/Boundary Check**: No

### TC-UI-028: Image Alternative Text & ARIA Attributes (Accessibility)
- **Feature**: Accessibility (A11y)
- **Description**: Verify that part images have alt tags and dynamic tabs have proper ARIA attributes for screen readers.
- **Preconditions**: A part exists with an uploaded image.
- **Execution Steps**:
  1. Right-click on the part image thumbnail on the Part Detail page and select "Inspect".
  2. Inspect the HTML structure of the thumbnail.
  3. Inspect the Tab List elements (Stock, BOM, etc.).
- **Expected Result**:
  - The image tag contains a descriptive `alt` attribute (e.g. `alt="Part Image for Resistor 10k"`).
  - Tab links contain ARIA roles: `role="tab"`, `aria-selected="true"`, and `aria-controls="stock"`.
- **Negative/Boundary Check**: No

### TC-UI-029: Client-Side Cross-Site Scripting (XSS) Prevention (Security)
- **Feature**: Security
- **Description**: Verify that the UI sanitizes HTML/JS payloads entered in the Part Name or Description.
- **Preconditions**: User is on the Create Part screen.
- **Execution Steps**:
  1. In the Part Name field, enter: `<script>alert('XSS_Test')</script>`.
  2. In the Description field, enter: `<img src=x onerror=alert('XSS_Img')>`.
  3. Click Save.
  4. View the newly created part page.
- **Expected Result**: The part is created safely. The script tags do not execute. The screen displays the literal text characters on the UI, indicating output encoding is enforced.
- **Negative/Boundary Check**: Yes

### TC-UI-030: Malicious File Upload Blocking (Security)
- **Feature**: Security
- **Description**: Verify that the file upload engine prevents uploading malicious script extensions in the Attachments tab.
- **Preconditions**: User on the part detail -> Attachments tab.
- **Execution Steps**:
  1. Click "Upload File".
  2. Attempt to upload a script file (e.g. `reverse_shell.php` or `malware.exe`).
  3. Attempt to upload a double-extension file (e.g. `datasheet.pdf.exe`).
- **Expected Result**: The file upload is rejected. The UI displays an error indicating "File type not permitted" or blocks execution of executed code on the media server.
- **Negative/Boundary Check**: Yes

