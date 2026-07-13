# Designing-a-Web-Page

Functional Requirements

The user can view a catalog of books on the main page.

The user can search books by title or author using the text input in the filter panel; the catalog updates in real time as the user types.

The user can filter books by genre.

The user can sort books by publication year in ascending or descending order.

The current number of visible books is displayed above the catalog and is updated every time the filters, search query, or sort order change.

Non-functional Requirements

Semantic HTML and structure

The page uses semantic elements (header, nav, main, section, article, footer) to organize content and help assistive technologies understand the layout.

Styling and separation of concerns

All visual styles are defined in an external styles.css file and linked from index.html via .

CSS selectors rely on class names (.book-card, .controls__input, .catalog__grid, etc.) rather than element selectors, making styles predictable and easy to refactor.

Responsiveness and layout behavior

On wider screens, the layout displays the filter panel on the left and the catalog on the right using a CSS Grid with two columns.

Book cards are arranged in a responsive grid (auto-fit, minmax) so that the number of columns adapts to available width.

JavaScript behavior and organization

All interactive behavior is contained in an external script.js file referenced at the end of body (after the DOM elements), and logic is wrapped in a DOMContentLoaded listener.

JS interacts with the page only via DOM APIs and data attributes (data-title, data-author, data-genre, data-available, data-year) on .book-card elements.

Event listeners are attached for input, change, and click events to provide filtering, sorting, and details toggling without reloading the page.

Usability and accessibility assumptions

Controls are grouped and labeled clearly to make the intent of each filter obvious to users.

