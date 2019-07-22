const toCurrency = (value) => {
    let str = (value * 100).toString();
    let start = str.substr(0, (str.length - 2));
    let end = str.substr(-2);
    return '£' + start + '.' + end;
}

export { toCurrency };