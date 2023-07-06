let url = new URL(window.location.href);

createApp({
    data() {
        return {
            app: url.searchParams.get("app")
        }
    }
}).mount("body");