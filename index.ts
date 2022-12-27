import {createInstance} from "i18next";
import ns1 from "./locales/en/ns1.json";
import ns2 from "./locales/en/ns2.json";
import ns3 from "./locales/en/ns3.json";

export const defaultNS = "ns1";
export const resources = {
    en: {
        ns1,
        ns2,
        ns3,
    },
} as const;

const i18nextInstance = createInstance()

i18nextInstance.init({
    lng: "en",
    ns: ["ns1", "ns2", "ns3"],
    defaultNS,
    resources,
});

const t0 = i18nextInstance.getFixedT('en')

t0('ns1:ns1') // ❓
t0('ns2:ns2') // ❓
t0('ns3:ns3') // ❓
t0('ns1')     // ❓
t0('ns2')     // ❓
t0('ns3')     // ❓


const t1 = i18nextInstance.getFixedT('en', ['ns2', 'ns3'])

t1('ns2:ns2') // ✅
t1('ns3:ns3') // ✅
t1('ns1:ns1') // ✅
t1('ns1')     // ❌ <-- False positive?
t1('ns2')     // ✅ Avoiding key clashing I guess?
t1('ns3')     // ✅ Same as above

// OK
const t2 = i18nextInstance.getFixedT('en', 'ns2')

t2('ns1:ns1') // ✅
t2('ns2:ns2') // ✅
t2('ns3:ns3') // ✅
t2('ns1')     // ✅
t2('ns2')     // ✅
t2('ns3')     // ✅
