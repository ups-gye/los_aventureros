// config/passport.js
const LocalStrategy = require("passport-local").Strategy;
const User = require("../app/models/user");

module.exports = function (passport) {
  // Serialización del usuario
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialización del usuario
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Estrategia de registro
  passport.use(
    "local-register",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true, // Permite pasar la solicitud completa a la callback
      },
      async (req, username, password, done) => {
        try {
          const existingUser = await User.findOne({
            "local.username": username,
          });
          if (existingUser) {
            return done(
              null,
              false,
              req.flash("registerMessage", "El usuario ya existe")
            );
          }

          // Crear un nuevo usuario
          const newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.email = req.body.email;

          // Asignar rol basado en el email
          if (newUser.local.email.includes("est.")) {
            newUser.local.role = "estudiante";
            newUser.puntos = 0; // Asignar puntos solo a estudiantes
          } else {
            newUser.local.role = "profesor";
            newUser.puntos = undefined; // No asignar puntos a los profesores
          }

          await newUser.save();
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Estrategia de login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await User.findOne({ "local.username": username });
          if (!user) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Usuario no encontrado")
            );
          }

          if (!user.validatePassword(password)) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Contraseña incorrecta")
            );
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};