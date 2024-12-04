axios.get('https://api.institutoalfa.org/api/songs')
.then(function (response) {

    const songData = response.data.songs

    const playButton = document.getElementById('play-btn');
    const audioPlayer = document.getElementById('audio-player');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const songAlbum = document.getElementById('song-album');
    const albumCover = document.getElementById('album-cover');
    let currentSongIndex = 0;
    
    // Arreglo para manejar las canciones favoritas
    let favorites = [];
    
    // Función para cargar la canción actual
    function loadSong(song) {
        songTitle.textContent = song.title;
        songArtist.textContent = song.author;
        songAlbum.textContent = song.album;
        albumCover.src = song.cover;
        audioPlayer.src = song.audio.url;
    }
    
    // Función para alternar entre play/pause
    function playPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = "Pause";
        } else {
            audioPlayer.pause();
            playButton.textContent = "Play";
        }
    }
    
    // Función para pasar a la siguiente canción
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songData.length;
        loadSong(songData[currentSongIndex]);
        playPause();
    }
    
    // Función para retroceder a la canción anterior
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songData.length) % songData.length;
        loadSong(songData[currentSongIndex]);
        playPause();
    }
    
    // Función para agregar a favoritos
    function addToFavorites(song) {
        if (!favorites.includes(song)) {
            favorites.push(song);
            updateFavoritesList();
        }
    }
    
    // Función para actualizar la lista de favoritos en la interfaz
    function updateFavoritesList() {
        const favoritesList = document.getElementById('favorites-list');
        favoritesList.innerHTML = ''; // Limpiamos la lista
        favorites.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${song.title} - ${song.author}`;
            listItem.addEventListener('click', () => {
                currentSongIndex = songData.indexOf(song);
                loadSong(songData[currentSongIndex]);
                playPause();
            });
            favoritesList.appendChild(listItem);
        });
    }
    
    // Evento de play/pause
    playButton.addEventListener('click', playPause);
    
    // Evento para siguiente canción
    nextButton.addEventListener('click', nextSong);
    
    // Evento para canción anterior
    prevButton.addEventListener('click', prevSong);
    
    // Cargar la primera canción por defecto
    loadSong(songData[currentSongIndex]);
    
    // Agregar canciones favoritas al hacer clic en la lista de canciones
    const songListItems = document.querySelectorAll('#song-list li');
    songListItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(songData[currentSongIndex]);
            playPause();
            addToFavorites(songData[currentSongIndex]);
        });
    });
  })

