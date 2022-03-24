# Rick And Morty uisng graphQL and nextjs

Steeps to run

1. clone the project
2. Yarn install or npm install
3. yarn dev or npm run dev

# Features

1. login and register
2. Local storage
3. Add Favorite
4. About section after Register
5. characters and Episode toggle in home
6. Favorite section with toggle characters and Episode
7. Profile page with profile date created
8. Search page with characters and Episode toggle and type to response search result.
9. Email and password validation
10. loading spinner
11. click to top button
12. toastify used to pop warning or error

# Dependency used

1. @apollo/client and graphql=> used to fetch the queries
2. dateformat=> to formated the date
3. nanoid=> To generate unique string ID
4. react-hexagon=> to convert image with hexagon shape
5. react-infinite-scroll-component=> To make a component infinite scrolling
6. react-scroll-up=> to pull to top
7. react-toastify=> to get pop up with some message
8. unique-names-generator=> To generate unique names
9. use-debounce=> to protect api calls after every click to increase performance and load

# Folder structure

1. Components=> Got all reused components like card, icons, spinner, buttons etc....
2. Helpers=> have all the vlaidators and helper function to check like password email etc....
3. pages=> have all the pages with some dynamic pages like character, episode, profile....
4. Styles=> have global style and other styles are imported as @use to get rid of importing styles in every file.
