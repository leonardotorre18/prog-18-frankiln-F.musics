const createSongComponent = (song) => {
    const li = document.createElement('li')
    li.setAttribute('class', '')

    li.innerHTML = `
    ${song.title} - ${song.author}
    `

    return li
}

axios.get('https://api.institutoalfa.org/api/songs')
.then(function (response) {
    const songsInfo = response.data.songs
    const contenedor = document.getElementById('container-song')

    songsInfo.map((song) => {
        const songComponent = createSongComponent(song)
        contenedor.appendChild(songComponent)
    })
  })