module.exports = {
    adminUrl(url: string) {
        return this.app.config.admin.pathPrefix + url;
    }
}