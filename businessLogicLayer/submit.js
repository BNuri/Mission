module.exports = async (models, req, res) => {
    // const input = JSON.parse(req.body.input);
    const input = req.body.input;
    const problems = await models.Problem.findAll({});
    const results = problems.map((problem, idx) => {
        return {
            id: problem.id,
            result: (input[idx].answer === problem.answer),
            answer: problem.answer
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
