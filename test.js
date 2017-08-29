function a(b) {
    return new Promise((resolve, reject) => {
        if (b > 10) return resolve("你好");
        setTimeout(function() {
            resolve("我好");
        }, 1000);
    });
}
async function showResult() {
    let result = await a(8);
    console.log(result);
}
showResult();
