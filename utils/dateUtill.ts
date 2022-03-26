export function dateFormat(date : Date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return date.getFullYear() + '-' + month + '-' + day;
}