const setAuthDataInLocalStorage = (tokenInfo) => {
    console.log("setAuthDataInLocalStorage ", tokenInfo);
    localStorage.setItem("shopping_app_token_info", JSON.stringify(tokenInfo));
};

const cleanAuthDataFromLocalStorage = () => {
    localStorage.removeItem("shopping_app_token_info");
};

export default { setAuthDataInLocalStorage, cleanAuthDataFromLocalStorage };