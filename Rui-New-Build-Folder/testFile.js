window.addEventListener('DOMContentLoaded', () => {

    const instance = document.getElementById("myInstance1")

    instance.setAttribute("rotationY", 50)

    instance.addEventListener("rotationChange", (e) => {
        console.log(e);
    })
})