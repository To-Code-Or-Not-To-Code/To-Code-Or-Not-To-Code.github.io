import { createApp } from "https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.min.js"

let url = new URL(window.location.href);

createApp({
    data() {
        return {
            app: url.searchParams.get("app")
        }
    }
}).mount("body");