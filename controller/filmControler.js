const filmsAPI = require("../utils/filmsAPI")

const getFilm = async (req, res) => {
    if (req.params.id) {
         try {
            const film = await filmsAPI.fetchFilm(req.params.title)

                film.then(response => {
                const movie =  {
                    título: response.Title,
                    Autor: response.Writer,
                    Descripcion: response.Plot,
                    src: response.Poster,
                };
                res.status(200).json(movie);
            });
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        };
    } else {
        try {
            const films = await filmsAPI.fetchFilms(req.params.title)
                .then(response => {
                console.log(response);
                
                const movie =  {
                    título: response.Title,
                    Autor: response.Writer,
                    Descripcion: response.Plot,
                    src: response.Poster,
                };
                res.status(200).json(movie);
            });
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        };
    };
};

const createFilm = async (req, res) => {
  const {Title, Writer, Plot, Poster} = req.body;

  const newFilm = {
      titulo: Title,
      Autor: Writer,
      Descripcion: Plot,
      src: Poster,
  };

  const postFilm = await filmsAPI.fetchPostFilm(newFilm) //fetchPostFilm --> llamada a la api
  res.status(200).json({message: `Se ha guardado: ${postFilm.titulo}` });
}

module.exports = {
  getFilm,
  createFilm,
};