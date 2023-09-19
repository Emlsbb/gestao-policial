export const Authentication = () => {
    const accessToken = sessionStorage.getItem('token');
    return accessToken;
};
