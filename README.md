# A WordPress Gulp setup
> A basic setup to automate WordPress theme development

Setup with Gulp 4 and Babel intergrated for use of ECMAscript ES6+

## Basic Instructions
1. Place wp-gulp-4 folder in your themes directory
2. In the wp-gulp-4 folder run npm install
3. Update package.json as needed
4. In gulpfile.js update themeName variable to your theme
5. Update browserSync proxy with your local dev address
6. In your terminal/command line type gulp and hit enter

### Requirements
This setup requires a local PHP and Mysql environment running in the background.

## Directory Overview
```
themes/
│
├── wp-gulp-4/
│   ├── .gitignore
│   ├── gulpfile.js
│   ├── package.json
│   └── README.md
│
│
├── your-theme/
│   ├── scr/
|   |   ├── sass/
|   |   └── js/
│   ├── theme files & folders
│   └── style.css
│
│
└── other-theme/
```