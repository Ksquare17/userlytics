Features
1. Counter Component
Created a counter component with increment, decrement, and reset functionalities.
The background color changes smoothly based on the counter value. When reset, the background color returns to its initial state.
2. User Data Form
Designed a form to capture user data such as name, email, phone, and address.
I used Formik to handle form state and yup for validation, ensuring user inputs are correctly validated (e.g., name and address must not be empty, email and phone must be valid).
The form supports auto-generating a user ID.
Added a pop-up to alert users if they try to close the browser with unsaved changes.
3. Rich Text Editor
Integrated a rich text editor to visualize and edit user data. I used React Quill for handling rich text formatting (bold, italic, underline, lists).
The content is rendered in HTML, stored in Redux, and persists even after the page is reloaded.
A dropdown allows selecting a user, and the corresponding user data (HTML content) is loaded into the editor, allowing the user to make changes.
4. Dashboard Visualization
Created a dashboard to visualize key user metrics, including a counter and user profile data.
Used React Charts (Bar chart) to visualize user registration trends over time, showing the number of new users that registered each day.
Libraries and Tools Used
1. Material UI (MUI)
MUI was used throughout the app to ensure a consistent, modern UI. The library provided me with pre-built components like TextField, Button, and Card, which helped me quickly build a clean and responsive design. It also has excellent support for theming and customization, which allowed me to match the app’s color scheme and layout to the desired aesthetic.
2. React Spring
I used React Spring for smooth background color transitions when the counter value changes. 
3. Formik
Formik was used to handle the form state and validation. It helped manage the form inputs and ensured that all the required fields were properly validated before submission. Formik’s integration with Yup made validation straightforward and simple.
4. Yup
Yup was used for schema validation in the form. It ensures that inputs like name, address, email, and phone are validated correctly (e.g., email follows a proper format, phone is numeric).
5. Redux Toolkit (RTK)
Redux Toolkit was used for global state management. It helped me store user data, including the auto-generated user ID, and persist it. This makes the data available across multiple components and helps in preserving it after page reloads.
6. React Charts
React Charts (React-Vis or React-Chartjs-2) was used to display user registration trends over time. The bar chart visualizes the number of new users who registered on each day, giving insights into user growth.
