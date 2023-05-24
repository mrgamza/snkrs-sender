# SNKR sender
Save the SNKR application information and send it by email when searching based on the current time.

# environment variables
Set `.env` file
```
EMAIL_ID={Your Email}
EMAIL_PASSWORD={Your Email password}
EMAIL_USERNAME={Email send user name}
ADMIN_ID={Admin Email}
```
## Environment variable
- DB_HOST=Database host
- DB_USER : Database user
- DB_PASSWORD : Database password
- DB_NAME : Database name
- SAVE_PASSWORD : DB insert password
- EMAIL_SUBJECT : email subject
- GOOGLE_USER_NAME : Google email user name 
- GOOGLE_EMAIL : Google email id
- GOOGLE_PASSWORD : Google email password
- PROFILE : Server Profile

## Database model
Create database tables.
- name: Varchar
- time: Date
- link : Varchar

## Use
Type command in root.
- yarn start

## Author
- Donghyuk Lee, mrgamza@gmail.com

## License
- MIT license.