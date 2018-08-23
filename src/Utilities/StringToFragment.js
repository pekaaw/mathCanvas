export default function StringToFragment(string) {
    var renderer = document.createElement('template');
    renderer.innerHTML = string;
    return renderer.content;
}
