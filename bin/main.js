let FacetsProcess = require('../obj/src/container/FacetsProcess').FacetsProcess;

try {
    new FacetsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
