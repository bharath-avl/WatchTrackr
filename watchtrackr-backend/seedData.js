const mongoose = require('mongoose');
const Content = require('./models/Content');
const Season = require('./models/Season');
const Episode = require('./models/Episode');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    await Content.deleteMany({});
    await Season.deleteMany({});
    await Episode.deleteMany({});

    const breakingBad = await Content.create({
      title: 'Breaking Bad',
      type: 'TV Show',
      description: 'A high school chemistry teacher turned methamphetamine producer partners with a former student.',
      year: 2008,
      genre: 'Crime, Drama, Thriller',
      poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    });

    const season1 = await Season.create({
      contentId: breakingBad._id,
      seasonNumber: 1,
      title: 'Season 1',
    });

    await Episode.create([
      {
        seasonId: season1._id,
        episodeNumber: 1,
        title: 'Pilot',
        description: 'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook and sell crystal meth.',
      },
      {
        seasonId: season1._id,
        episodeNumber: 2,
        title: "Cat's in the Bag...",
        description: 'Walt and Jesse attempt to tie up loose ends. The desperate situation gets more complicated with the flip of a coin.',
      },
      {
        seasonId: season1._id,
        episodeNumber: 3,
        title: "...And the Bag's in the River",
        description: 'Walter fights with Jesse over his drug use, causing him to leave Walter alone to deal with their captive.',
      },
    ]);

    const strangerThings = await Content.create({
      title: 'Stranger Things',
      type: 'TV Show',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
      year: 2016,
      genre: 'Drama, Fantasy, Horror',
      poster: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
    });

    const stSeason1 = await Season.create({
      contentId: strangerThings._id,
      seasonNumber: 1,
      title: 'Season 1',
    });

    await Episode.create([
      {
        seasonId: stSeason1._id,
        episodeNumber: 1,
        title: 'The Vanishing of Will Byers',
        description: 'On his way home from a friend\'s house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.',
      },
      {
        seasonId: stSeason1._id,
        episodeNumber: 2,
        title: 'The Weirdo on Maple Street',
        description: 'Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.',
      },
    ]);

    const demonSlayer = await Content.create({
      title: 'Demon Slayer',
      type: 'Anime',
      description: 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.',
      year: 2019,
      genre: 'Animation, Action, Adventure',
      poster: 'https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',
    });

    const dsSeason1 = await Season.create({
      contentId: demonSlayer._id,
      seasonNumber: 1,
      title: 'Season 1',
    });

    await Episode.create([
      {
        seasonId: dsSeason1._id,
        episodeNumber: 1,
        title: 'Cruelty',
        description: 'Tanjiro Kamado works hard to support his family. When he returns home after a night away, he discovers that his family has been slaughtered by a demon.',
      },
      {
        seasonId: dsSeason1._id,
        episodeNumber: 2,
        title: 'Trainer Sakonji Urokodaki',
        description: 'Tanjiro meets Giyu Tomioka, a demon slayer who tells him to seek out a man named Sakonji Urokodaki if he wishes to become a demon slayer.',
      },
    ]);

    await Content.create({
      title: 'The Shawshank Redemption',
      type: 'Movie',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      year: 1994,
      genre: 'Drama',
      poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    });

    await Content.create({
      title: 'The Dark Knight',
      type: 'Movie',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
      year: 2008,
      genre: 'Action, Crime, Drama',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    });

    console.log('Sample data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
