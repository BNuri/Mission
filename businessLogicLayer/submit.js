module.exports = async (models, req, res) => {
    //const input = JSON.parse(req.body.input);
    const input = req.body;
    const problems = await models.Problem.findAll({});
    const results = problems.map((problem, idx) => {
        return {
            id: problem.id,
            result: (input[idx+1] === problem.answer),
            answer: input[idx+1]
            // result: (input.[idx].answer === problem.answer),
            // answer: input[idx].answer
        };
    });

    await models.Result.bulkCreate(results.map(r => {
        return {
            problem_id: r.id,
            result: r.result ? 1 : 0,
            answer: r.answer
        };
    }));

    res.json({
        results: results
    });
};
