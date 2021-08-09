# Employee Directory Information

## Backend

For this propject I used a Ruby on Rails backend with a PostgreSQL database. I made three models: Employees, Departments, and Users. Employees belong to a department and a department has many employees. There is only one user who is the admin. Only the admin can create, update, and destory employees. I used a loop in a seed file to make 100 calls to randomuser.me in order to generate 100 random employees with random data. I assigned each employee to one of five departments randomly as well.

### Frontend

For the frontend, I created a Vue.js app. The views include a home page that serves as the directory of all employees with a search bar to search by any employee attribute, a login page for the admin to login, an employee show page which can be accessed by clicking an employee's picture from the directory, an employee update modal accesssible by the admin from each show page, an employee delete modal accessible by the admin from each show page, and an employee create page accessible by the admin.

### Deployment

The backend is hosted at https://pacific-thicket-40492.herokuapp.com/ while the frontend is hosted at https://postlight-employee-directory.netlify.app/. 

### Extra Notes

I had a blast making this project, and this is truthfully the first full-stack project I've finished and deployed. I missed the step to name my backend (hence pacific-thicket-40492). Thanks for the opportunity to work on this and sharpen my skills. I look forward to further discussion!
