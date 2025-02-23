import web from "./application/web";
const PORT: Number = 5050;
web.listen(PORT, (): void => console.log(`running on port ${PORT}`));

