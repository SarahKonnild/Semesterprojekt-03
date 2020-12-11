module.exports = {
    /**
    * @author Kasper Svane
    * 
    * Configuration strings for connection to the MongoDB Atlas Cluster
    * 
    * @req The connection string for Docker is defined inside "Docker-Compose.yml" for when the container starts
    * 
    * @req The connection string without Docker (Which is currently used) is located here
    */

    //Test API's with Docker
    //db: process.env.DB

    //Test API's without Docker
    db: "mongodb+srv://svane:1234@cluster0.izgdh.mongodb.net/brewster?retryWrites=true&w=majority"
};