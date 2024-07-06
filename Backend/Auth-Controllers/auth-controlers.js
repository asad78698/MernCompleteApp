const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
dotenv.config();
const AddMovies = require('../DbModels/addmovies');
const userModel = require('../DbModels/users')

// Function to generate token
const generateToken = (user) => {
    return jwt.sign({
        userId: user._id,
        email: user.email,
        username: user.username
    }, 'asadd4azxxsdwsde', { expiresIn: '1d' });
};

// Fetch user data from Google API
async function getGoogleAccount(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    return data;
}

// Send Google OAuth URL
const SendgoogleAuth = async (req, res) => {
    const redirectUri = 'https://mern-complete-app.vercel.app/auth/callback';
    const GoogleAuth = new OAuth2Client({
        clientId: '473913145115-qhbvg2q26nphsuq7j8nojhcb9r5gksdd.apps.googleusercontent.com',
        clientSecret: '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',
        redirectUri: redirectUri
    });
    const authUrl = GoogleAuth.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
        prompt: 'consent'
    });
    res.json({ url: authUrl, profile: 'profile', email: 'email' });
};

// Receive Google OAuth callback
const recievegoogleAuth = async (req, res) => {
    const code = req.query.code;
    try {
        const redirectUri = 'https://mern-complete-app.vercel.app/auth/callback';
        const GoogleAuth = new OAuth2Client({
            clientId: '473913145115-qhbvg2q26nphsuq7j8nojhcb9r5gksdd.apps.googleusercontent.com',
            clientSecret: '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',
            redirectUri: redirectUri
        });
        const { tokens } = await GoogleAuth.getToken(code);
        GoogleAuth.setCredentials(tokens);
        const userData = await getGoogleAccount(tokens.access_token);

        // Find or create user in the database
        let user = await userModel.findOne({ email: userData.email });
        if (!user) {
            user = await userModel.create({
                'username': userData.name,
                'email': userData.email, 
                'phone': '',
                'password': ''

            });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Send the token to the client
       res.redirect(`http://localhost:5173?token=${token}`)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const register = async (req, res) => {
    const { email, username, phone, password } = req.body;

    try {
        // Check if email already exists
        const isEmailExist = await userModel.findOne({ 'email': email });

        if (isEmailExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashpassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = new userModel({
            email,
            username,
            phone,
            password: hashpassword
        });

        // Save the new user to the database
        await newUser.save();

        const token = generateToken(newUser); // Corrected function name

        // Send success response with token
        res.status(201).json({ message: 'User registered successfully', token }); // Combine message and token into a single object
    } catch (err) {
        // Handle any errors that occur during registration
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const userExist = await userModel.findOne({ 'email': email });

        if (!userExist) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Compare passwords
        const isPasswordValid = bcrypt.compareSync(password, userExist.password);

        if (isPasswordValid) {
            const token = generateToken(userExist); // Corrected function name

            // Send success response with token
            return res.status(200).json({ message: 'User logged in successfully', token }); // Combine message and token into a single object
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const AddNewMovies = async (req, res) => {
    const { movieName, movieDescription, movieGenere, movieReleaseDate, movieRating, movieImage } = req.body;
    
    const username = req.user.username;

    try {
        // Find the user based on username
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new instance of AddMovies model
        const newMovie = new AddMovies({
            movieName,
            movieDescription,
            movieGenere,
            movieReleaseDate,
            movieRating,
            movieImage,
            addedBy: user._id // Assigning user's _id to addedBy field
        });

        // Save the new movie to the database
        await newMovie.save();

        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const AllMovies = async (req, res) => {
    try {
        // Check if any movies exist for the user
        const allMovies = await AddMovies.find({ addedBy: req.user._id });

        if (!allMovies || allMovies.length === 0) {
            return res.status(404).json({ message: 'No movies found for this user' });
        }

        res.status(200).json({ allMovies });
    } catch (error) {
        console.error('Error fetching movies:', error); // Ensure this logs the error
        res.status(500).json({ message: 'Internal server error' });
    }
};

const DeleteMovies = async (req, res) => {
    const { movieName } = req.body;

    try {
        // Find the movie by name
        const movie = await AddMovies.findOneAndDelete({ movieName });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully', movie });

} catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Internal server error' });
}
} 

const UpdateMovies = async( req, res) => {
    const {  movieName, newMovieName, movieDescription, movieGenere, movieReleaseDate, movieRating, movieImage } = req.body;
    const checkMovie = await AddMovies.findOne({'movieName': movieName});

    if(!checkMovie){
        return res.status(404).json({ message: 'Movie not found' });
    }

    try{
        const UpdatedMovie = await AddMovies.findOneAndUpdate

        ({ 'movieName': movieName }, 
        { $set: { 'movieName': newMovieName,  'movieDescription': movieDescription, 'movieGenere': movieGenere, 'movieReleaseDate': movieReleaseDate, 'movieRating': movieRating, 'movieImage': movieImage } }, 
        { new: true });


        res.status(200).json({ message: 'Movie updated successfully' });
    
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ message: 'Internal server error' });
    }



}

    


module.exports = { 
    
    register, login, 
    SendgoogleAuth,  recievegoogleAuth,
     AddNewMovies, AllMovies, DeleteMovies,
        UpdateMovies
    
    };
