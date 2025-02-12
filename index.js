import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO from './dao/moviesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';

async function main() {
  // Load environment variables
  dotenv.config();
  console.log('MongoDB URI:', process.env.MOVIEREVIEWS_DB_URI); // Debugging

  // Create MongoDB client
  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);

  // Define port
  const port = process.env.PORT || 8000;
  console.log('Using port:', port); // Debugging

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Inject DB into DAOs
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    // Start the server
    app.listen(port, () => {
      console.log('Server is running on port:', port);
    });
  } catch (e) {
    console.error('Failed to connect to MongoDB or start the server:', e);
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error);
