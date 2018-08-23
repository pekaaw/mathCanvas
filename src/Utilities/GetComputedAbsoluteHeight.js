export default function GetComputedAbsoluteHeight(element) {
    let styles = window.getComputedStyle(element);
    return Math.ceil(
        parseFloat(styles["marginTop"]) + 
        parseFloat(styles["marginBottom"]) +
        element.offsetHeight
    );
}
