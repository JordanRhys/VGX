const toCurrency = (value) => {
    let str = (value * 100).toString();
    console.log(str);
    let start = str.substr(0, (str.length - 2));
    console.log(start);
    let end = str.substr(-2);
    console.log(end);
    return start + '.' + end;
}

export { toCurrency };