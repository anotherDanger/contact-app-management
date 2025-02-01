export const register = () => {
    const username = document.getElementById('usernameField').value;
    const password = document.getElementById('passwordField').value;

    const data = {
        username: username,
        password: password
    };
    document.getElementById('btnRegister').addEventListener('click', async () => {
        const request = new Request('http://localhost:3000/user',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        try{
            const response = await fetch(request);

            if(response.ok)
            {
                console.log('ok')
            };
        }catch(err)
        {
            console.log('error')
        }

    })
}