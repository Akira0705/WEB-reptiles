export = {
    get pathPrefix() {
        return (this as any).app.config.admin.pathPrefix;
    },
}