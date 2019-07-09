import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: "royalbhati.auth0.com",
      clientID: "qw0ftj4Kq0QPuuxWgJ7PWwbUHw0BvpnX",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile email"
    });

    this.logout = this.logout.bind(this.auth0);
  }

  login = () => {
    this.auth0.authorize();
  };
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = result => {
    const expiresAt = JSON.stringify(
      result.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("id_Token", result.idToken);
    localStorage.setItem("expiresAt", expiresAt);
  };

  isAuthenticated = () => {
    // new Date().getTime() < JSON.parse(localStorage.getItem("expiresAt"));
    // const isAuthPromise = new Promise(function(resolve, reject) {
    //   if (localStorage.getItem("id_Token")) {
    //     resolve({
    //       response: true,
    //       token: jwtDecode(localStorage.getItem("id_Token")).aud
    //     });
    //   }else{
    //     reject({
    //       response: false,
    //       token: ""
    //     });
    //   }
    // });
    if (localStorage.getItem("id_Token")) {
      return {
        response: true,
        token: jwtDecode(localStorage.getItem("id_Token")).aud
      };
    } else {
      return { response: false, token: "" };
    }
  };

  logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id_Token");
    localStorage.removeItem("expiresAt");
    await this.auth0.logout({
      clientID: "qw0ftj4Kq0QPuuxWgJ7PWwbUHw0BvpnX",
      returnTo: "http://localhost:3000/"
    });

    return new Promise((resolve, reject) => {
      resolve(1);
    });
  };
}
