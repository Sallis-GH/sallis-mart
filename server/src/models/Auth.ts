// import passport from 'passport';
// import {Strategy} from 'passport-local';
// import Users from './User';

// passport.use(
//   'signup',
//   new Strategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password'
//     },
//     async (email:string, password:string, done) => {
//       try {
//         const user = await Users.create({ email, password });

//         return done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// passport.use(
//   'login',
//   new Strategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password'
//     },
//     async (email, password, done) => {
//       try {
//         const user = await Users.findOne({ email });

//         if (!user) {
//           return done(null, false, { message: 'Users not found' });
//         }

//         const validate = await Users.isValidPassword(password);

//         if (!validate) {
//           return done(null, false, { message: 'Wrong Password' });
//         }

//         return done(null, user, { message: 'Logged in Successfully' });
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );