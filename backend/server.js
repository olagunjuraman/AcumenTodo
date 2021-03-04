const Hapi = require("@hapi/hapi");

const taskRoutes = require("./routes/taskRoutes");

const Path = require("path");
const Inert = require("@hapi/inert");

const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const __dirnam = Path.resolve();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: "localhost",
    routes: {
      files: {
        relativeTo: Path.join(__dirnam, "/frontend/build"),
      },
    },
  });

  await server.register(Inert);

  server.route(taskRoutes);

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
      },
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
