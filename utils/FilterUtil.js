const getFilterExpression = function (filter) {
    switch (filter.condition) {
        case 'equals':
            return x => x.value === filter.value;
        case 'does_not_equal':
            return x => x.value !== filter.value;
        case 'greater_than':
            return x => x.value > filter.value;
        case 'less_than':
            return x => x.value < filter.value;
        default:
            return null;
    }
}

const filterResponses = function (responses, filters) {
    let matchedResponses = [];

    for (let i = 0; i < responses.length; i++) {
        let questions = responses[i].questions;
        let filteredQuestions = [];

        for (let j = 0; j < filters.length; j++) {
            let filteredQuestionTypes = questions.filter(q => q.id === filters[j].id);
            let filterExpression = getFilterExpression(filters[j]);
            filteredQuestionTypes = filteredQuestionTypes.filter(filterExpression);
            filteredQuestions.push.apply(filteredQuestions, filteredQuestionTypes);
        }

        if (filteredQuestions.length === filters.length) {
            matchedResponses.push(responses[i]);
        }
    }

    return matchedResponses;
};

module.exports = { filterResponses, getFilterExpression};