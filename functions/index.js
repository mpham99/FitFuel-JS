exports.handler = async () => {
    return {
        statusCode: 302,
        headers: {
            Location: "/.netlify/functions/login"
        },
        body: ""
    };
};