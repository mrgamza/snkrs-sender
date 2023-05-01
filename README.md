# SNKR sender
Save the SNKR application information and send it by email when searching based on the current time.

## Environment variable
- DB_HOST : Database host
- DB_USER : Database user
- DB_PASSWORD : Database password
- DB_NAME : Database name
- SAVE_PASSWORD : DB insert password
- EMAIL_SUBJECT : email subject
- GOOGLE_USER_NAME : Google email user name 
- GOOGLE_EMAIL : Google email id
- GOOGLE_PASSWORD : Google email password

## Database model
Create database tables.
- name: Varchar
- time: Date
- link : Varchar

## Use
Type command in root.
- node ./app.js

## Author
- Donghyuk Lee, mrgamza@gmail.com

## License
- MIT license.