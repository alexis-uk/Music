# STEPS TO RUN:

## 1. Configure the SQL connection strings
Edit DefaultConnection in appsettings.json

## 2. Create DB Schema
dotnet ef database update --project Music.Data --startup-project Music.Web

## 3. Run the application
dotnet run --project Music.Web
