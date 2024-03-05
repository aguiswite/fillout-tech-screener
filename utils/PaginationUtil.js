const calculateResponsePagination = function (responses, limit) {
    return {
        totalResponses: responses.length,
        pageCount: Math.ceil(responses.length / limit)
    };
};

module.exports = {calculateResponsePagination};