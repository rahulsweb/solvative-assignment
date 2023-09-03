# solvative-task
## Demo link
https://rahul-solvative-task.netlify.app
![image](https://github.com/rahulsweb/solvative-assignment/assets/43261847/560026f6-0f34-41ac-a472-0dae4c778a2b)
![image](https://github.com/rahulsweb/solvative-assignment/assets/43261847/605f1121-23ee-431f-923f-a1e7a74f00b7)
![image](https://github.com/rahulsweb/solvative-assignment/assets/43261847/ed3eac15-ceb3-4900-a572-83b13b4962c2)
## Project details
# -Functionality
Search box is on top-left side of page
Table is at bottom of search box
Pagination box below the table
Besides pagination a user input to let user decide how many cities data user want from server [ Default is 5 and max is 10]
Search box
Once user types and presses enter, start showing results in the table
Keyboard shortcut CTRL/CMD + / should work, it will make search box focused
Table
In table there will be 3 columns:
# - static counter starting from 1
Place Name
Country - Show country with flag
For flag, use CountryID from response and get flag from https://www.countryflagsapi.com/ (https://www.countryflags.io/:file_type/:country_code).
For example, for CountryID="IN-sky", you will get flag from https://countryflagsapi.com/png/in
For no result, simply say "No result found" in table
For null/undefined/blank search, display "Start searching" in table
When results are getting fetched, show a spinner on top of table.
Pagination
In pagination depending upon search result the pagination numbers should get update.
If no result found hide pagination box.
Limit API data
A input box preferably on the far right side on the level of pagination box to let user decide how much data it should fetch from server.
Default data fetched by API is 5 and max it can fetch 10 items and user should be limited and some kind of warning should be given if user enters input above 10.
Using the limit key in the params in API we can limit the data fetched from server
Bonus
Implement a way that API calls are not made on every keystroke.
Provide an option to user to let user view as many items as user want on a page instead of default 3.
## Project Details

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# solvative-assignment
