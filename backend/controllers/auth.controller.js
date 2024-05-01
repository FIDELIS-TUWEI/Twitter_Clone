const signup = async (req, res) => {
    res.json({
        data: "You reached the signup endpoint"
    });
};

const login = async (req, res) => {
    res.json({
        data: "You reached the login endpoint"
    });
};

const logout = async (req, res) => {
    res.json({
        data: "You have reached the logout endpoint"
    });
};

module.exports = {
    signup, login, logout
};