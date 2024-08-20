

export default function authenticate(req, res, next) {
    //placeholder for middleware based authentication
    //in real application propablu use Passport.js with some specific 'Strategy'
    if (true) {   // alway authenticate for now
        console.log('Authenticating')
        return next(); // User is authenticated
    } else {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }
}