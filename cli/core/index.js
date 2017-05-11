
exports.pagination = program => {
    return program
        .option('-p, --page <n>', 'Page', Number, 1)
        .option('-l, --per-page <n>', 'Items per page', Number, 10)
}