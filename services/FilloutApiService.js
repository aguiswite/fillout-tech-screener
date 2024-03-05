const {filloutApiKey, filloutApiBaseUrl} = require("../constants");
const axios = require("axios");

const getResponses = function (formId) {
    return axios.get('https://api.fillout.com/v1/api/forms/' + formId + '/submissions',
        {
            headers: {
                'Authorization': 'Bearer ' + filloutApiKey
            }
        });
}

module.exports = {getResponses};