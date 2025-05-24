
export function logger(req, res, next){
    const method = req.method;
    const path = req.path;
    const query = req.url;
    const date = new Date().toISOString();
    console.log(`[${date}] ${method} ${path} ${query}`);

    next();
}