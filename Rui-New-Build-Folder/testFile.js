window.addEventListener('DOMContentLoaded', () => {

    const instance = document.getElementById("myInstance1")

    instance.setAttribute("rotation", 50)

    instance.addEventListener("rotationChange", (e) => {
        console.log(e);
    })
})