import { includeHTMLAsync } from '/scripts/utilities.js';
import { setHeaderLogo } from '/components/header/header.js';
import { listeners } from '/scripts/common.js';

const response  = await includeHTMLAsync();

const beersData = JSON.parse(sessionStorage.getItem('beersData'));

setHeaderLogo(beersData); 

listeners(null, null, beersData); 