import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (_, __, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await User.findOne({ email });

    if (user) {
      if (!user.oauthProvider) {
        user.oauthProvider = 'google';
        user.oauthId = profile.id;
        await user.save();
      }
      return done(null, user);
    }

    user = new User({
      name: profile.displayName,
      email,
      oauthProvider: 'google',
      oauthId: profile.id,
      isAccountVerified: true
    });
    await user.save();
    return done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

export default passport;
