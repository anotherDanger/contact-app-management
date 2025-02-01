export const register = () => {
    const username = document.getElementById('usernameField').value;
    const password = document.getElementById('passwordField').value;

    const data = {
        username: username,
        password: password
    };
    document.getElementById('btnRegister').addEventListener('click', () => {
        console.log(JSON.stringify(data));
    })
}