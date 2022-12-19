# Description
This is a personal project that I created to learn about Java Spring Boot. This API provides CRUD functionality for 
a Learning Management system. It is able to manage students and the details related to their enrollment and courses.

# Author
### Lucas Angelozzi
LinkedIn: https://www.linkedin.com/in/lucas-angelozzi/

# Project Flow
Request ----> Controller ----> Service ----> Repository ----> Database \
Response <---- Controller <---- Service <---- Repository <---- Database

### Controllers
Controllers contain the API endpoints that are exposed on the port when Spring Boot run method is called and the 
application is running. These methods receive and redirect the requests to the proper service method before then 
possibly return the response.

### Services
Services contain the business logic and provide methods that perform the necessary calculations and processing of 
the data. The services will make the necessary repository calls to complete the requested data processing.

### Repository
Repositories provides methods that directly interact with the database. In this project, the repositories extend the 
mongo repository interface which provides some default methods and allows us to create our own custom queries.

### Models
The models are simply the POGO's (Plain Old Java Objects) that are used to represent the objects of our application.