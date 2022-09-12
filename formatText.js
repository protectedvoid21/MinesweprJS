export function formatText(text) {
    if(text < 10) {
        return '00' + text
    }
    else if(text < 100) {
        return '0' + text
    }
    return text
}