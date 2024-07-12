## Backend - .NET Web API

This folder contains the backend code for the project, built using ASP.NET Core. It provides a web API exposing endpoints for the frontend application to interact with data and functionalities.

###  Getting Started

**Prerequisites:**

* [.NET Core SDK](https://dotnet.microsoft.com/en-us/download)
* [Git](https://git-scm.com/downloads) (for version control)
* An IDE of your choice. Eg. [VS Code](https://code.visualstudio.com/)

**Running the Backend:**

1. Clone this repository:

   ```bash
   https://github.com/Manuel-heav/Inxtract.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Inxtract
   ```

3. Navigate to the backend folder:

   ```bash
   cd Backend
   ```

4. Restore dependencies:

   ```bash
   dotnet restore
   ```

5. Build the project:

   ```bash
   dotnet build
   ```

6. Run the project:

   ```bash
   dotnet run
   ```

   This will start the API on the default port. You can access the API endpoints using tools like Postman or curl.

**Important:**

* The frontend application likely depends on this backend API being up and running. Refer to the frontend readme for instructions on how to run the entire application.

###  API Endpoints

A list of all available API endpoints with descriptions and request/response formats will be documented here. Please refer to individual endpoint comments within the code for detailed information.

**Example:**

* `GET /api/v1/products` - Retrieves a list of all products.
* `POST /api/v1/products` - Creates a new product.
