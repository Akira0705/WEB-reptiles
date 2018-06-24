export = (app: any) => {
    app.beforeStart(async function () {
        // yield app.model.sync({ force: true });
        await app.model.sync();
    });
};