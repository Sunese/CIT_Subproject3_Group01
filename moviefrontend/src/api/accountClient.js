class AccountClient {
    async SignIn(username, password) {
        try {
            const signInModel = JSON.stringify({
                "username": username,
                "password": password
            });
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URI
                + '/api/v1/account/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: signInModel
                });
            return response;
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async SignUp(username, email, password, role) {
        if (role === '')
        {
            role = 'User';
        }
        try {
            console.log('client signin up username:', username);
            const signUpModel = JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
                "role": role
            });
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URI
                + '/api/v1/account/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: signUpModel
                });
            return response;
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default AccountClient;