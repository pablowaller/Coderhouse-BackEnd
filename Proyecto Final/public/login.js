const loginForm = document.getElementById('login')

loginForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const username = document.querySelector('#username').value;
    
    const request = new Request('/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: `{ "username": "${username}"}`
    });

    fetch(request).then(() => {
        window.location.href="/";
    });

})