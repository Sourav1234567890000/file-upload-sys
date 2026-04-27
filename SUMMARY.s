Financial Statement Analyzer — Project Summary for Interviews
What is it?
A loan assessment system where a loan officer registers applicants, 
uploads their bank statements, and the system automatically determines 
loan eligibility based on their financial data.
Tech stack:
React, Node.js, Express, MongoDB, Mongoose, Multer

What it does:

Applicant fills a registration form — name, PAN, Aadhaar, loan amount
Data is saved to MongoDB with status "pending"
Loan officer uploads the applicant's bank statement as a CSV
System parses the CSV, calculates total credits
If total credits >= 2x loan amount → status updates to "approved"
If not → applicant can retry with another statement
Same statement cannot be uploaded twice — tracked via statementUploaded flag

Where I got stuck and how I solved it:

FormData vs JSON — file inputs can't be sent as JSON, had to use FormData with a for...in loop to append all fields
NaN in totalCredit — forgot to initialize to 0 before the loop, unary plus + to convert string to number
Double response bug — forgot the else block, code kept falling through to the final return
CORS error — frontend and backend on different ports, fixed with cors middleware
Dynamic loan amount — was hardcoded at 25000, fixed by fetching applicant from DB using email and extracting their loanAmount
Leaked MongoDB credentials — accidentally shared connection string, immediately rotated password and moved to .env file

What I learned:

Mongoose model handles full CRUD — not just saving
Separation of concerns — models, controllers, services, middleware each have one job
Real-world loan flow thinking — don't permanently reject, allow retries
Hidden fields — passing data silently from frontend without user typing it


CSV Parser Logic:

Converted the file buffer to a string using toString()
Split the string by newline to get an array of rows
Separated the header row from clean data rows
For each row, split by comma to get individual values
Looped through clean rows, extracted the credit column using index
Used unary plus + to convert string values to numbers
Accumulated total credit — got stuck with NaN initially because totalCredit wasn't initialized to 0 before the loop

The fix: let totalCredit = 0 before the loop. Classic JS gotcha.