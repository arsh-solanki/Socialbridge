// seed.js (Complete Updated - Users, Mentors, Profiles, Sample Sessions & Posts)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const User = require('./models/User');
const MentorProfile = require('./models/MentorProfile');
const Session = require('./models/Session');
const Post = require('./models/Post');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await MentorProfile.deleteMany();
    await Session.deleteMany();
    await Post.deleteMany();
    console.log('Cleared existing data...');

    // Helper to create user with plain password (auto-hashed by model)
    const createUser = async (name, email, role) => {
      const user = new User({ name, email, password: 'password123', role });
      await user.save();
      console.log(`Seeded ${role} user: ${email}`);
      return user;
    };

    // Seed Mentee
    const mentee = await createUser('Test Mentee', 'mentee@test.com', 'Mentee');

    // Seed Jane Smith (Data Scientist Mentor)
    const jane = await createUser('Jane Smith', 'jane@test.com', 'Mentor');

    // Create Jane's Profile
    const janeProfile = new MentorProfile({
      userId: jane._id,
      title: 'Data Scientist',
      bio: 'Expert in machine learning and data analysis for business insights.',
      expertise: ['Data Science', 'Machine Learning', 'Python'],
      isPremium: false,
      averageRating: 4.5
    });
    await janeProfile.save();
    console.log('Seeded Jane Smith profile');

    // Sample Session 1: For Mentee Q&A (/qa/:id) and Mentor Q&A (/mentor/qa/:id)
    const sampleSession = new Session({
      mentee: mentee._id,
      mentor: janeProfile._id,
      subject: 'Career transition to Data Science',
      menteeGoals: 'Current: Software Engineer. Target: Data Scientist. Problem: Lack of ML skills. Goals: Learn Python/Pandas in 3 months.',
      status: 'Active'
    });
    await sampleSession.save();
    console.log('Seeded sample session ID:', sampleSession._id);

    // Sample Initial Post (Mentee's onboarding message)
    const initialPost = new Post({
      session: sampleSession._id,
      author: mentee._id,
      authorRole: 'Mentee',
      content: 'Hi Jane, I\'m a software engineer looking to transition to data science. What resources do you recommend for beginners?'
    });
    await initialPost.save();

    // Sample Mentor Response Post
    const mentorPost = new Post({
      session: sampleSession._id,
      author: jane._id,
      authorRole: 'Mentor',
      content: 'Great question! Start with Python basics on Codecademy, then Pandas for data manipulation. Practice on Kaggle datasets. Let me know your progress!'
    });
    await mentorPost.save();

    // Link posts to session
    sampleSession.posts = [initialPost._id, mentorPost._id];
    await sampleSession.save();

    // Sample Feedback (for completed sessions)
    sampleSession.feedback = { rating: 5, comments: 'Excellent guidance!' };
    sampleSession.status = 'Completed';
    await sampleSession.save();

    // Update Jane's averageRating
    janeProfile.averageRating = 4.8;
    await janeProfile.save();

    // Seed Additional Mentors (for /mentors list)
    const additionalMentors = [
      {
        name: 'John Doe',
        email: 'mentor@test.com',
        title: 'Senior Product Manager',
        bio: 'Experienced PM with 10+ years in tech startups.',
        expertise: ['Product Management', 'Leadership'],
        isPremium: true,
        averageRating: 4.8
      },
      {
        name: 'Mike Johnson',
        email: 'mike@test.com',
        title: 'CEO & Executive Coach',
        bio: 'Seasoned executive with 20 years in scaling companies.',
        expertise: ['Leadership', 'Executive Coaching'],
        isPremium: true,
        averageRating: 4.9
      },
      {
        name: 'Emily Davis',
        email: 'emily@test.com',
        title: 'Growth Marketer',
        bio: 'Specialist in digital marketing and user acquisition.',
        expertise: ['Growth Marketing', 'SEO'],
        isPremium: false,
        averageRating: 4.6
      }
    ];

    for (const mData of additionalMentors) {
      const user = await createUser(mData.name, mData.email, 'Mentor');
      const profile = new MentorProfile({
        userId: user._id,
        title: mData.title,
        bio: mData.bio,
        expertise: mData.expertise,
        isPremium: mData.isPremium,
        averageRating: mData.averageRating
      });
      await profile.save();
      console.log(`Seeded additional Mentor: ${mData.name}`);
    }

    console.log('✅ Seeding complete! Sample session ID for testing: ' + sampleSession._id);
    console.log('Test:');
    console.log('- Mentee Q&A: /qa/' + sampleSession._id);
    console.log('- Mentor Q&A: /mentor/qa/' + sampleSession._id);
    console.log('- Mentee Login: mentee@test.com / password123');
    console.log('- Mentor Login: jane@test.com / password123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();