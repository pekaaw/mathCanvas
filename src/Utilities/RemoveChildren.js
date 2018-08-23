export default function RemoveChildren(targetElement) {
    while (targetElement.firstChild) {
        targetElement.removeChild(targetElement.firstChild);
    }
}
