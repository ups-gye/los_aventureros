module.exports = (app, passport) => {
  // Ruta para la página principal
  app.get("/", (req, res) => {
    res.render("index");
  });

  // Ruta para la página de login
  app.get("/login", (req, res) => {
    res.render("login", {
      message: req.flash("loginMessage"),
    });
  });

  // Procesa el formulario de login
  app.post(
    "/login",
    passport.authenticate("local-login", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (req, res) => {
      // Redirección basada en el rol
      if (req.user.local.role === "profesor") {
        res.redirect("/dashboard/profesor");
      } else if (req.user.local.role === "estudiante") {
        res.redirect("/dashboard/alumno");
      } else {
        res.redirect("/"); // Redirección por defecto si el rol no coincide
      }
    }
  );
  
  // Ruta para la página de registro
  app.get("/register", (req, res) => {
    res.render("register", {
      message: req.flash("registerMessage"),
    });
  });

  // Procesa el formulario de registro
  app.post(
    "/register",
    passport.authenticate("local-register", {
      successRedirect: "/", // Redirige aquí si el registro es exitoso
      failureRedirect: "/register", // Redirige aquí si el registro falla
      failureFlash: true, // Habilita mensajes de error usando connect-flash
    })
  );

  // Rutas protegidas: Dashboards específicos
  app.get("/dashboard/profesor", isLoggedIn, (req, res) => {
    res.render("dashboard/profesor", {
      user: req.user,
    });
  });

  app.get("/dashboard/alumno", isLoggedIn, (req, res) => {
    res.render("dashboard/alumno", {
      user: req.user,
    });
  });

  // Ruta para cerrar sesión
  app.get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

  // Nueva ruta para actualizar puntos
  app.post('/actualizar-puntos', isLoggedIn, async (req, res) => {
    try {
      const newPoints = req.body.puntos;

      // Actualizar los puntos del usuario autenticado
      await User.findByIdAndUpdate(req.user._id, { puntos: newPoints });

      res.json({ message: "Puntos actualizados correctamente" });
    } catch (err) {
      console.error("Error al actualizar los puntos:", err);
      res.status(500).json({ message: "Error al actualizar los puntos" });
    }
  });

  // Middleware para asegurarse de que el usuario está autenticado
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
};
