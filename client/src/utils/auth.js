import decode from 'jwt-decode';

class AuthService {
    // write the user token to local storage
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // remove the token from local storage
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

    // retrieve token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // decode the token
    getProfile() {
        return decode(this.getToken());
    }

    // check if the user is still logged in
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
}

export default new AuthService();