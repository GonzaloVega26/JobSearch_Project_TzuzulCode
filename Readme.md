
# Project Node.js Job Search
In this project I made an application with  SOA architecture, where we can use a lot of endpoints to get the data that we Want. In the following steps I'll  show all the diferent endpoints with the request and response
## Login
Access:
- Everyone
### EndPoint: POST /api/auth/login
```json
# Body:
{
    "email": "test_one@mail.com",
    "password": "123456"
}
```

## SignUp
Access:
- Everyone
### EndPoint: POST /api/auth/signup
#### Applicant
```json
# Body:
{
    "name": "Applicant One",
    "email": "applicant_one@mail.com",
    "age": 25,
    "occupation": "Student",
    "password" : "123456",
    "role": "applicant",
    "knowledge": ["Python", "JS"]
}
# Response:
{
    "user": {
        "name": "Applicant One",
        "email": "applicant_one@mail.com",
        "role": "applicant",
        "id": "627c5e94a266ee2e16e8819b"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXBwbGljYW50IE9uZSIsImVtYWlsIjoiYXBwbGljYW50X29uZUBtYWlsLmNvbSIsInJvbGUiOiJhcHBsaWNhbnQiLCJpZCI6IjYyN2M1ZTk0YTI2NmVlMmUxNmU4ODE5YiIsImlhdCI6MTY1MjMxNzg0NCwiZXhwIjoxNjUyOTIyNjQ0fQ.8CBYIALbluS-gkKkaQu7RCN-NyQOvqaHm8Q_iP8_V1E"
}
```
#### Employer
```json
# Body:
{
    "name": "Employer One",
    "email": "employer_one@mail.com",
    "age": 35,
    "occupation": "Chief Executive",
    "password" : "123456",
    "role": "employer",
    "knowledge": ["Python", "JS", "Node.js", "Azure", "AWS"]
}
# Response:
{
    "user": {
        "name": "Employer One",
        "email": "employer_one@mail.com",
        "role": "employer",
        "id": "627c5f05a266ee2e16e8819d"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW1wbG95ZXIgT25lIiwiZW1haWwiOiJlbXBsb3llcl9vbmVAbWFpbC5jb20iLCJyb2xlIjoiZW1wbG95ZXIiLCJpZCI6IjYyN2M1ZjA1YTI2NmVlMmUxNmU4ODE5ZCIsImlhdCI6MTY1MjMxNzk1OCwiZXhwIjoxNjUyOTIyNzU4fQ.TEwdy2_9rshYV6uPkoHs1rHkQnY0uxEqAf2HxfR9-no"
}
```
---

## Add Administrator
Access:
- Admin
Required:
- Admin Token
### EndPoint: POST  /api/auth/admin-privilege/:email
#### Applicant
```json
# Url: /api/auth/admin-privilege/applicant_one@mail.com
# Response:
{
    "_id": "627c5e94a266ee2e16e8819b",
    "name": "Applicant One",
    "email": "applicant_one@mail.com",
    "role": "admin"
}
```
## First Admin
Access:
- Everyone
### EndPoint: POST /api/auth/first-admin/:secret
```json
# Url: /api/auth/admin-privilege/admin-admin
# Response:
{
    "user": {
        "name": "Admin Administrator",
        "email": "admin@admin.com",
        "role": "admin",
        "id": "627c617403226676380395d9"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW4gQWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOiI2MjdjNjE3NDAzMjI2Njc2MzgwMzk1ZDkiLCJpYXQiOjE2NTIzMTg1ODAsImV4cCI6MTY1MjkyMzM4MH0.g0k_2zKArj5v9th_67TO0WEGmmaVHfRyd81ui6CUllc"
}
```

## Get All Jobs
Access:
- Logged user
### EndPoint: GET /api/jobs
```json
# Url: /api/jobs/
# Response:
[
    {
        "_id": "627c63fa03226676380395dd",
        "title": "Frontend Developer React",
        "salary": 2500,
        "details": "Lorem ipsum....",
        "category": [
            "Front-end"
        ],
        "requirements": [
            "React",
            "HTML",
            "CSS"
        ],
        "location": "Mexico",
        "employer_id": "627bf79ca003fb6ce4f679c9",
        "applications": [],
        "__v": 0
    }
]
```

## Get Jobs By Fields
Acces 
- Logged User

### EndPint: Post /api/jobs/search-job
```json
# Url: /api/jobs/search-job
# Body: 
{
	"title": "Frontend Developer React"
}
# Response:
[
{
    "_id": "627c63fa03226676380395dd",
    "title": "Frontend Developer React",
    "salary": 2500,
    "details": "Lorem ipsum....",
    "category": [
        "Front-end"
    ],
    "requirements": [
        "React",
        "HTML",
        "CSS"
    ],
    "location": "Mexico",
    "employer_id": "627bf79ca003fb6ce4f679c9",
    "applications": [],
    "__v": 0
}
]
```
## Get One Job
Access:
- Logged user
### EndPoint: GET /api/jobs/:id
```json
# Url: /api/jobs/627c63fa03226676380395dd
# Response:
{
    "_id": "627c63fa03226676380395dd",
    "title": "Frontend Developer React",
    "salary": 2500,
    "details": "Lorem ipsum....",
    "category": [
        "Front-end"
    ],
    "requirements": [
        "React",
        "HTML",
        "CSS"
    ],
    "location": "Mexico",
    "employer_id": "627bf79ca003fb6ce4f679c9",
    "applications": [],
    "__v": 0
}
```

## Create  Job
Access:
- Logged Employer
- Logged Admin
### EndPoint: POST /api/jobs
```json
# Body:
{
    "title": "Frontend Developer React",
    "salary": 2500,
    "details": "Lorem ipsum....",
    "category": ["Front-end"],
    "requirements" : ["React", "HTML", "CSS"],
    "location":"Mexico",
    "employer_id": "627bf79ca003fb6ce4f679c9"
}
# Response:
{
    "title": "Frontend Developer React",
    "salary": 2500,
    "details": "Lorem ipsum....",
    "category": [
        "Front-end"
    ],
    "requirements": [
        "React",
        "HTML",
        "CSS"
    ],
    "location": "Mexico",
    "employer_id": "627bf79ca003fb6ce4f679c9",
    "applications": [],
    "_id": "627c63fa03226676380395dd",
    "__v": 0
}
```

## Update  Job
Access:
- Logged Employer: Only employer who create the job can update it
- Logged Admin
### EndPoint: PUT /api/jobs/update/:idJOB
```json
# URL: /api/jobs/update/627c63fa03226676380395dd
# Body:
{
	"title": "Sr Frontend Developer React",
	"salary": 2500

}
# Response:
{
    "_id": "627c72fb8ecfa71c7765ec03",
    "title": "Sr Frontend Developer React",
    "salary": 5000,
    "details": "Lorem ipsum....",
    "category": [
        "Front-end"
    ],
    "requirements": [
        "React",
        "HTML",
        "CSS"
    ],
    "location": "Mexico",
    "employer_id": "627c5f05a266ee2e16e8819d",
    "applications": [],
    "__v": 0
}
```

## Delete Job
Access:
- Logged Employer: Only employer who create the job can delete it
- Logged Admin
### EndPoint: DELETE /api/jobs/delete/:idJOB
```json
# URL: /api/jobs/delete/627c72fb8ecfa71c7765ec03

# Response:
{
    "_id": "627c72fb8ecfa71c7765ec03",
    "title": "Sr Frontend Developer React",
    "salary": 5000,
    "details": "Lorem ipsum....",
    "category": [
        "Front-end"
    ],
    "requirements": [
        "React",
        "HTML",
        "CSS"
    ],
    "location": "Mexico",
    "employer_id": "627c5f05a266ee2e16e8819d",
    "applications": [],
    "__v": 0
}
```
## Get Applicants of a job
Access:
- Logged Employer: Only employer who create the job can see the applicants of it
- Logged Admin
### EndPoint: GET /api/jobs/applications/:idjob
```json
# URL: /api/jobs/applications/627c74d9ef3c68cf842748ca
# Response
[
    {
        "_id": "627c5e94a266ee2e16e8819b",
        "name": "Applicant One",
        "email": "applicant_one@mail.com",
        "age": 25,
        "occupation": "Student",
        "knowledge": [
            "Python",
            "JS"
        ],
        "image_url": "https://icon-library.com/images/anon-icon/anon-icon-11.jpg"
    }
]
```

## Get Job Created by The Employer
Access:
- Logged Employer: Only employer who create the job can see the jobs that he created
### EndPoint: GET /api/jobs/my-jobs-created
```json
# URL: /api/jobs/my-jobs-created
# Response
[
    {
        "_id": "627c74d9ef3c68cf842748ca",
        "title": "Frontend Developer React",
        "salary": 2500,
        "details": "Lorem ipsum....",
        "category": [
            "Front-end"
        ],
        "requirements": [
            "React",
            "HTML",
            "CSS"
        ],
        "location": "Mexico",
        "employer_id": "627c5f05a266ee2e16e8819d",
        "applications": [
            "627c5e94a266ee2e16e8819b"
        ],
        "__v": 0
    }
]
```

## Get Jobs for Title related
### EndPoint: POST /api/jobs/search-job/title
Acces:
- Logged User general
```json
# body 
{
	"title": "Developer"
}
```
## Get Jobs for Requirements
### EndPoint: POST /api/jobs/search-job/requirement
Acces:
- Logged User general

```json
# body 
{
	"requirement": ["HTML, CSS"]
}
```
## Get Jobs for Title Salary
### EndPoint: POST /api/jobs/search-job/salary
Acces:
- Logged User general

```json
# body 
{
	"comparator": "greater",
	"salary": 3000
}
```


## Apply To a Job
### EndPoint: POST /api/users/apply-job/:idjob
Access:
- Logged User general.
```json
# URL: /api/users/apply-job/627c74d9ef3c68cf842748ca
# Response
{
    "user": {
        "idUser": "627c5e94a266ee2e16e8819b",
        "name": "Applicant One",
        "email": "applicant_one@mail.com",
        "jobs_applicated": [
            "627c74d9ef3c68cf842748ca"
        ]
    },
    "job": {
        "idJob": "627c74d9ef3c68cf842748ca",
        "title": "Frontend Developer React",
        "salary": 2500,
        "location": "Mexico"
    }
}
```

## Get Jobs that User Applied
### EndPoint: GET /api/users/myjobs
Access:
- Logged User general.
```json
# URL: /api/users/myjobs
# Response
[
    {
        "_id": "627c74d9ef3c68cf842748ca",
        "title": "Frontend Developer React",
        "salary": 2500,
        "details": "Lorem ipsum....",
        "category": [
            "Front-end"
        ],
        "requirements": [
            "React",
            "HTML",
            "CSS"
        ],
        "location": "Mexico",
        "employer_id": "627c5f05a266ee2e16e8819d",
        "applications": [ # User should see this, but can be useful for counting 
            "627c5e94a266ee2e16e8819b"
        ],
        "__v": 0
    }
]
```

## Cancel Application To a Job
### EndPoint: POST /api/users/cancel-job/:idjob
Access:
- Logged User general.
```json
# URL: /api/users/cancel-job/627c74d9ef3c68cf842748ca
# Response
{
    "user": {
        "idUser": "627c5e94a266ee2e16e8819b",
        "name": "Applicant One",
        "email": "applicant_one@mail.com",
        "jobs_applicated": []
    },
    "job": {
        "idJob": "627c74d9ef3c68cf842748ca",
        "title": "Frontend Developer React",
        "salary": 2500,
        "location": "Mexico"
    }
}
```

## Get All Users
### EndPoint:  GET /api/users
Access:
- Logged Admin
```json
# URL: /api/users
# Response
[
    {
        "_id": "627c5e05a266ee2e16e88198",
        "name": "Test One",
        "email": "test_one@mail.com",
        "age": 25,
        "occupation": "Student",
        "password": "$2b$10$OnqlvJH76TK14CLoVem5muFFDv43M2vjtAAu1ZeMsD..EIzB7qW/m",
        "role": "applicant",
        "jobs_applicated": [],
        "knowledge": [
            "Python",
            "JS"
        ],
        "image_url": "https://icon-library.com/images/anon-icon/anon-icon-11.jpg",
        "__v": 0
    },
    {
        "_id": "627c5f05a266ee2e16e8819d",
        "name": "Employer One",
        "email": "employer_one@mail.com",
        "age": 35,
        "occupation": "Chief Executive",
        "password": "$2b$10$MvzeQC1eLUc./9eNYjySW.d5cZzhxbnnwEm0Ao3QI0axS8CK4TW2.",
        "role": "employer",
        "jobs_applicated": [],
        "knowledge": [
            "Python",
            "JS",
            "Node.js",
            "Azure",
            "AWS"
        ],
        "image_url": "https://icon-library.com/images/anon-icon/anon-icon-11.jpg",
        "__v": 0
    }
]
```

## Get One user 
### EndPoint:  GET /api/users/search-user
Disclaimer: to re use the same endpoint it can be used an email or an id in the body of the json
Acces
- Logged User in general: the info that can see is reduced
- Logged Admin

```json
# URL: /api/users/search-user
# Body: 
{
    "_id": "627c5e05a266ee2e16e88198"
}
	Ó

# Response to General User
{
    "name": "Test One",
    "age": 25,
    "email": "test_one@mail.com",
    "occupation": "Student"
}

# Response to Admin
{
    "_id": "627c5e05a266ee2e16e88198",
    "name": "Test One",
    "email": "test_one@mail.com",
    "age": 25,
    "occupation": "Student",
    "password": "$2b$10$OnqlvJH76TK14CLoVem5muFFDv43M2vjtAAu1ZeMsD..EIzB7qW/m",
    "role": "applicant",
    "jobs_applicated": [],
    "knowledge": [
        "Python",
        "JS"
    ],
    "image_url": "https://icon-library.com/images/anon-icon/anon-icon-11.jpg",
    "__v": 0
}
```

## Update User Information
### EndPoint: PUT /api/users/update-profile/:id
Acces:
- Logged User
```json
# URL: /api/users/update-profile/627c5f05a266ee2e16e8819d
# Body: 
{
    "name": "Alejandro One",
    "age": 40
}
# Response
{
    "_id": "627c5f05a266ee2e16e8819d",
    "name": "Alejando One",
    "email": "employer_one@mail.com",
    "age": 40,
    "occupation": "Chief Executive",
    "password": "$2b$10$MvzeQC1eLUc./9eNYjySW.d5cZzhxbnnwEm0Ao3QI0axS8CK4TW2.",
    "role": "employer",
    "jobs_applicated": [],
    "knowledge": [
        "Python",
        "JS",
        "Node.js",
        "Azure",
        "AWS"
    ],
    "image_url": "https://icon-library.com/images/anon-icon/anon-icon-11.jpg",
    "__v": 0
}
```


## Delete User Information
### EndPoint: DELETE /api/users/delete/:id
Acces:
- Logged User: only can delete own account
- Logged Admin
```json
# URL: /api/users/delete/627c5f05a266ee2e16e8819d
# Response
{
    "_id": "627c5f05a266ee2e16e8819d",
    "name": "Alejando One",
    "email": "employer_one@mail.com",
    "age": 40,
    "occupation": "Chief Executive",
    "password": "$2b$10$MvzeQC1eLUc./9eNYjySW.d5cZzhxbnnwEm0Ao3QI0axS8CK4TW2.",
    "role": "employer",
    "jobs_applicated": [],
    "knowledge": [
        "Python",
        "JS",
        "Node.js",
        "Azure",
        "AWS"
    ],
    "image_url": "https://icon-library.com/images/anon-icon/anon-icon-11.jpg",
    "__v": 0
}
```


## Search Users with a field
Disclaimer: cann't search for role: admin to get his info
When look for array of knowledge if the user don't have exactly all the ones especified, it wont show.
### EndPoint: GET /api/users/search
Acces:
- Logged User in General
```json
# URL: /api/users/search
# Body
{
    "occupation": "Student",
    "age": 25
}

# Response
[
    {
        "_id": "627c5e05a266ee2e16e88198",
        "name": "Test One",
        "email": "test_one@mail.com",
        "age": 25,
        "occupation": "Student",
        "knowledge": [
            "Python",
            "JS"
        ],
        "image_url": "https://icon-library.com/images/anon-icon/anon-icon-11.jpg"
    },
    {
        "_id": "627c5e94a266ee2e16e8819b",
        "name": "Applicant One",
        "email": "applicant_one@mail.com",
        "age": 25,
        "occupation": "Student",
        "knowledge": [
            "Python",
            "JS"
        ],
        "image_url": "https://icon-library.com/images/anon-icon/anon-icon-11.jpg"
    }
]
```

