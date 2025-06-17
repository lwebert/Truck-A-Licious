# Truck-A-Licious

## Description
This repository is an extension of a group project originally completed as part of the University of Denver's Coding and Software Development Boot Camp curriculum. This repository has been further developed by Lauren Webert to address bug fixes and to implement further feature work.

Truck-A-Licious is a full-stack web application for both food truck owners and customers alike. As a food truck owner, users are able to create a profile, where they are prompted to provide the name, location, and schedule for their food truck. Upon completion, this information is logged to a public database and displayed on a calendar that all users, including food truck customers, are able to access. Both regular users and business owners will be able to view an upcoming 5-day schedule of available food trucks, and are able to click on each food truck to see location information, menu details, and hours of business.

## Table of Contents
1. [Technologies](#technologies)
2. [Installation and Usage](#installation-and-usage)
3. [Tests](#tests)
4. [Contributing](#contributing)
5. [License](#license)
6. [Questions](#questions)


## Technologies

- **Front-end**: React

- **Back-end**: Node.js, Express.js

- **Database management**: PostgreSQL, Sequelize ORM

- **Additional Features**: User authentication using JWT


## Installation and Usage

### **INSTALLATION**
To install the application for local use and development, run the following in your local terminal:  

1. Clone the repository to your local computer.  
   `git clone git@github.com:lwebert/Truck-A-Licious.git`
2. Check that node.js is installed.  
   `node -v`
3. Install dependencies.  
   `npm i`


### **USAGE**
Choose one of the following ways to run the application:
- The updated application is currently under development, but will be deployed to Render once completed.  
- The original, un-updated group project is deployed to Render and can be found here: [https://truck-a-licious.onrender.com/](https://truck-a-licious.onrender.com/).  
- For local use, run `npm run start:dev` in the terminal of your local repository.  

Below are photos of what the application should look like once you have it running.
*Home Page* 
![Home page displaying a 5-day calendar of upcoming food trucks.](assets/home.png "Home Page 5-day Food Truck Calendar")

*Profile Sign-Up*
![Food truck owner sign-up form.](assets/signup.png "Food truck owner sign up form")

*Profile Login*
![Food truck owner profile login page.](assets/login.png "Food truck owner login page")


## Tests





## Contributing

**Lauren Webert** *https://github.com/lwebert*  
NEW ADDITIONS:  
- ...

Original Contributions:  
BACK-END:  
- ...  

FRONT-END:  
- *Home.tsx page*: Implemented react hooks to conditionally render a profile Login page or Signup page depending on if the user was signed in or not, and if they had an existing acccount or not. Once logged in, called on the PostgreSQL database to check for existing food truck information associated with the user profile, and conditionally rendered a food truck display component or a food truck form component.
- *Food Truck Data Interface*: Defined the properties and types for a Food Truck.
- *Food Truck Form Component*: Developed a user-friendly 


**Other Contributors**
Thomas Lesner    https://github.com/tlesner  
- ...
Julius Chi       https://github.com/JuliusC72  
- ...
Brandon Franco   https://github.com/BFrausb  
- ...

For a full breakdown of original contributions from other users, please visit the original repository code: [https://github.com/lwebert/Project2-Group3](https://github.com/lwebert/Project2-Group3).



## License

MIT License

Copyright (c) 2025 lwebert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



## Questions

