const mongoose = require('mongoose');
const axios = require('axios');
const Content = require('./models/Content');
const Season = require('./models/Season');
const Episode = require('./models/Episode');
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

const fetchPopularShows = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results.slice(0, 10); // Get top 10 shows
  } catch (error) {
    console.error('Error fetching shows:', error.message);
    return [];
  }
};

const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results.slice(0, 10); // Get top 10 movies
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    return [];
  }
};

const fetchPopularAnime = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/tv`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        with_keywords: '210024', // Anime keyword ID
        page: 1,
      },
    });
    return response.data.results.slice(0, 5); // Get top 5 anime
  } catch (error) {
    console.error('Error fetching anime:', error.message);
    return [];
  }
};

const fetchShowDetails = async (showId) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${showId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching show ${showId}:`, error.message);
    return null;
  }
};

const fetchSeasonDetails = async (showId, seasonNumber) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/tv/${showId}/season/${seasonNumber}`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching season ${seasonNumber}:`, error.message);
    return null;
  }
};

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Content.deleteMany({});
    await Season.deleteMany({});
    await Episode.deleteMany({});

    console.log('Fetching popular content from TMDB...');

    // Fetch Movies
    console.log('Fetching movies...');
    const movies = await fetchPopularMovies();
    for (const movie of movies) {
      await Content.create({
        title: movie.title,
        type: 'Movie',
        description: movie.overview,
        year: new Date(movie.release_date).getFullYear(),
        genre: movie.genre_ids ? movie.genre_ids.join(', ') : 'Unknown',
        poster: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        backdrop: movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : null,
      });
      console.log(`✓ Added movie: ${movie.title}`);
    }

    // Fetch TV Shows with Seasons and Episodes
    console.log('\nFetching TV shows...');
    const shows = await fetchPopularShows();
    for (const show of shows.slice(0, 5)) { // Limit to 5 shows to avoid rate limits
      const showDetails = await fetchShowDetails(show.id);
      if (!showDetails) continue;

      const content = await Content.create({
        title: showDetails.name,
        type: 'TV Show',
        description: showDetails.overview,
        year: new Date(showDetails.first_air_date).getFullYear(),
        genre: showDetails.genres ? showDetails.genres.map(g => g.name).join(', ') : 'Unknown',
        poster: showDetails.poster_path ? `${IMAGE_BASE_URL}${showDetails.poster_path}` : null,
        backdrop: showDetails.backdrop_path ? `${IMAGE_BASE_URL}${showDetails.backdrop_path}` : null,
      });
      console.log(`✓ Added show: ${showDetails.name}`);

      // Add first 2 seasons with episodes
      const seasonsToAdd = showDetails.seasons
        .filter(s => s.season_number > 0)
        .slice(0, 2);

      for (const seasonInfo of seasonsToAdd) {
        const seasonDetails = await fetchSeasonDetails(show.id, seasonInfo.season_number);
        if (!seasonDetails) continue;

        const season = await Season.create({
          contentId: content._id,
          seasonNumber: seasonDetails.season_number,
          title: seasonDetails.name,
        });
        console.log(`  ✓ Added ${seasonDetails.name}`);

        // Add episodes (limit to first 5 to save time)
        const episodesToAdd = seasonDetails.episodes.slice(0, 5);
        for (const ep of episodesToAdd) {
          await Episode.create({
            seasonId: season._id,
            episodeNumber: ep.episode_number,
            title: ep.name,
            description: ep.overview || 'No description available',
          });
        }
        console.log(`    ✓ Added ${episodesToAdd.length} episodes`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Fetch Anime
    console.log('\nFetching anime...');
    const anime = await fetchPopularAnime();
    for (const show of anime.slice(0, 3)) {
      const showDetails = await fetchShowDetails(show.id);
      if (!showDetails) continue;

      const content = await Content.create({
        title: showDetails.name,
        type: 'Anime',
        description: showDetails.overview,
        year: new Date(showDetails.first_air_date).getFullYear(),
        genre: showDetails.genres ? showDetails.genres.map(g => g.name).join(', ') : 'Unknown',
        poster: showDetails.poster_path ? `${IMAGE_BASE_URL}${showDetails.poster_path}` : null,
        backdrop: showDetails.backdrop_path ? `${IMAGE_BASE_URL}${showDetails.backdrop_path}` : null,
      });
      console.log(`✓ Added anime: ${showDetails.name}`);

      // Add first season
      if (showDetails.seasons && showDetails.seasons.length > 0) {
        const firstSeason = showDetails.seasons.find(s => s.season_number === 1);
        if (firstSeason) {
          const seasonDetails = await fetchSeasonDetails(show.id, 1);
          if (seasonDetails) {
            const season = await Season.create({
              contentId: content._id,
              seasonNumber: 1,
              title: seasonDetails.name,
            });

            const episodesToAdd = seasonDetails.episodes.slice(0, 5);
            for (const ep of episodesToAdd) {
              await Episode.create({
                seasonId: season._id,
                episodeNumber: ep.episode_number,
                title: ep.name,
                description: ep.overview || 'No description available',
              });
            }
            console.log(`  ✓ Added season 1 with ${episodesToAdd.length} episodes`);
          }
        }
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n✅ Database seeded successfully with real data from TMDB!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();