/*
1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
*/

const text = `'I don't want any tea; do you, George?' to which George shouts back, 'Oh, no, I don't like tea; we'll have lemonade instead—tea's so indigestible.'`;

const regexp = new RegExp(`^'|'$`,'gi');
const regexpLeft = new RegExp(`( ')`,'gi');
const regexpRight = new RegExp(`(' )`,'gi');
console.log('BEFORE');
console.log(text);
let str = text.replace(regexp, '"');
str = str.replace(regexpLeft, ' "');
str = str.replace(regexpRight, '" ');
console.log('AFTER');
console.log(str);
//Можно было обойтись одним шаблоном для поиска, но d таком случае replace заменяет ` '` и  `' ` на `"`.