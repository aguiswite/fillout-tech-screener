const express = require('express');
const apiService = require("../services/FilloutApiService");
const filterUtil = require("../utils/FilterUtil")
const paginationUtil = require("../utils/PaginationUtil")
const router = express.Router();

router.get('/:formId/filteredResponses', async (req, res, next) => {
    let filtersParam = req.query['filters'];
    if (!filtersParam) {
        res.status(500);
        res.send('Missing filter param');
        return;
    }

    const limit = req.query['limit'] || 150;
    const filters = JSON.parse(filtersParam);
    const formId = req.params['formId'];

    const {data} = await apiService.getResponses(formId, req.query);
    let responses = filterUtil.filterResponses(data["responses"], filters);
    let pagination = paginationUtil.calculateResponsePagination(responses, limit);
    res.send({data: {...data, responses, ...pagination}});
});

module.exports = router;
