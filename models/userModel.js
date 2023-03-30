const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
  {
    id: 4,
    name: "Jim",
    email: "Jim",
    password: "Jim",
    role: "admin",
  },
  {
    id: 5,
    name: "test",
    email: "test",
    password: "test",
    role: "user",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findOrCreate: (githubProfile, callback) => {
    const user = database.find((user) => user.id === `${githubProfile.username}#${githubProfile.id}`);
    // console.log("User, pre-processing: ", user)
    // console.log("githubProfile, pre-processing: ", githubProfile)
    if (user) {
      callback(null, user);
    } else {
      const githubUser = 
          {
            id: `${githubProfile.username}#${githubProfile.id}`, 
            name: githubProfile.username,
            email: githubProfile._json.email,
            password: null,
            role: 'user'
          };
      database.push(githubUser);
      // console.log("Database: ",database)
      callback(null, githubUser);
    };
  }
};

module.exports = { database, userModel };
