document.querySelector('#delete-form').addEventListener('submit', () => {
    const confirmation = confirm('Tem certeza que deseja excluir?')

    if(!confirmation) {
        ev.preventDefault()
    }
}) 