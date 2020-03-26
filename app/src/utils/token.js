const setAuthDataInLocalStorage = (tokenInfo) => {
    console.log("setAuthDataInLocalStorage ", tokenInfo);
    localStorage.setItem("shopping_app_token_info", JSON.stringify(tokenInfo));
};

const cleanAuthDataFromLocalStorage = () => {
    localStorage.removeItem("shopping_app_token_info");
};

const getAuthDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("shopping_app_token_info"));
};

const isAuthenticated = () => {
    return localStorage.getItem("shopping_app_token_info") || false;
};

const getHeaderWithToken = (token) => {
    return {
        'Authorization': `Bearer ${token.idToken}`
    }
}

export default {
    setAuthDataInLocalStorage,
    cleanAuthDataFromLocalStorage,
    isAuthenticated,
    getAuthDataFromLocalStorage,
    getHeaderWithToken
};