import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const MovieSearch = () => {
  const [movieName, setMovieName] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '5c0e0ad0';

  const searchMovie = async () => {
    console.log("Botón 'Buscar' presionado");
    if (!movieName) {
      setError('Por favor ingresa el nombre de una película');
      return;
    }

    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`);
      if (!response.ok) {
        setError('Hubo un problema con la conexión a la API');
        return;
      }

      const data = await response.json();
      console.log("Datos recibidos de la API:", data);

      if (data.Response === 'True') {
        setMovieData(data);
        setError('');
      } else {
        setMovieData(null);
        setError('Película no encontrada.');
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError('Hubo un error al realizar la búsqueda.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Películas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre de una película"
        value={movieName}
        onChangeText={text => setMovieName(text)}
      />
      <Button title="Buscar" onPress={searchMovie} />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        movieData && (
          <View style={styles.movieContainer}>
            <Image
              style={styles.poster}
              source={{
                uri: movieData.Poster !== "N/A"
                  ? movieData.Poster
                  : 'https://via.placeholder.com/200x300?text=No+Image'
              }}
            />
            <Text style={styles.movieTitle}>{movieData.Title}</Text>
            <Text style={styles.moviePlot}>{movieData.Plot}</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  movieContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  moviePlot: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});

export default MovieSearch;
