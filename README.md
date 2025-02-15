# Student Management Next.js Client

## Installation
This repo is the Next.js client for the school management application (https://github.com/markoco14/student-mgmt).
To run the app you must first set up the server. Go to the server repository and follow the instructions. Then come back
here and follow the instructions below:

```
npm install
cp .env.example .env.local
vi .env NEXT_PUBLIC_API_URL=http://127.0.0.1:8000 #or whichever port you choose to use ie; 8001, 8080
npm run dev
```