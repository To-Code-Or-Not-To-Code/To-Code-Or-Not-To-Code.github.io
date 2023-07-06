let url = new URL(window.location.href);

const { createApp } = Vue;

createApp({
    data() {
        return {
            app: url.searchParams.get("app")
        }
    }
});