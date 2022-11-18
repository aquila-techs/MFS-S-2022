// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

import en from './en';
import nl from './dutch';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

let localize = new LocalizedStrings({
 "en-US": en,
 en: en,
 nl: nl
});

export default localize;