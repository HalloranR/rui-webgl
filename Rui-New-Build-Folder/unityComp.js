//custom class
window.UNITY_BODY_UI_REGISTRY = {};

class UnityComp extends HTMLElement {
  myGameInstance = null;
  constructor() {
    super();
    this.innerHTML = this.template;

    window.UNITY_BODY_UI_REGISTRY[this.id] = this;
  }

  get template() {
    return `
    <div id="unity-container" class="unity-desktop">
    <canvas id="unity-canvas" width=960 height=600></canvas>
    <div id="unity-loading-bar">
      <div id="unity-logo"></div>
      <div id="unity-progress-bar-empty">
        <div id="unity-progress-bar-full"></div>
      </div>
    </div>
    <div id="unity-warning"> </div>
    <div id="unity-footer">
      <div id="unity-webgl-logo"></div>
      <div id="unity-fullscreen-button"></div>
      <div id="unity-build-title">rui-webgl</div>
    </div>
  </div>
      `;
  }

  connectedCallback() {
    //Create a reference to the shadow dom root
    const root = this;
    var container = root.querySelector("#unity-container");
    var canvas = root.querySelector("#unity-canvas");
    var loadingBar = root.querySelector("#unity-loading-bar");
    var progressBarFull = root.querySelector("#unity-progress-bar-full");
    var fullscreenButton = root.querySelector("#unity-fullscreen-button");
    var warningBanner = root.querySelector("#unity-warning");

    // Shows a temporary message banner/ribbon for a few seconds, or
    // a permanent error message on top of the canvas if type=='error'.
    // If type=='warning', a yellow highlight color is used.
    // Modify or remove this function to customize the visually presented
    // way that non-critical warnings and error messages are presented to the
    // user.
    function unityShowBanner(msg, type) {
      function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
      }
      var div = root.createElement('div');
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      if (type == 'error') div.style = 'background: red; padding: 10px;';
      else {
        if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(function () {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    }

    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/Rui-new-folder.loader.js";
    var config = {
      dataUrl: buildUrl + "/Rui-new-folder.data",
      frameworkUrl: buildUrl + "/Rui-new-folder.framework.js",
      codeUrl: buildUrl + "/Rui-new-folder.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "rui-webgl",
      productVersion: "0.1",
      showBanner: unityShowBanner,
    };

    // By default Unity keeps WebGL canvas render target size matched with
    // the DOM size of the canvas element (scaled by window.devicePixelRatio)
    // Set this to false if you want to decouple this synchronization from
    // happening inside the engine, and you would instead like to size up
    // the canvas DOM size and WebGL render target sizes yourself.
    // config.matchWebGLToCanvasSize = false;

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas:

      var meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
      container.className = "unity-mobile";

      // To lower canvas resolution on mobile devices to gain some
      // performance, uncomment the following line:
      // config.devicePixelRatio = 1;

      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      unityShowBanner('WebGL builds are not supported on mobile devices.');
    } else {
      // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:

      canvas.style.width = "960px";
      canvas.style.height = "600px";
    }

    loadingBar.style.display = "block";

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
      }).then((unityInstance) => {
        loadingBar.style.display = "none";
        
        //set the unity instance
        this.setUnityInstance(unityInstance);

        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      }).catch((message) => {
        alert(message);
      });
    };

    //attach this script
    root.appendChild(script);
  }

  setUnityInstance(unityInstance){
    //set the game instance
    this.myGameInstance = unityInstance;

    //this runs async so put the id call here
    this.myGameInstance.SendMessage("JSBridge", "SetInstance", this.id);

    //loop through attributes
    console.log(this.observedAttributes);
  }

  listen(el) {
    el.addEventListener('click', () => {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", "https://ccf-api.hubmapconsortium.org/v1/scene", false); // false for synchronous request
      xmlHttp.send(null);
      var jsonString = xmlHttp.responseText

      this.myGameInstance.SendMessage("JSBridge", "SetCamera", "myInstance1");
    })
  }

  listen2(el) {
    el.addEventListener('click', () => {
      const intMessage = document.getElementById("jsonMessage2");
      var rotation = Number(intMessage.value);
      intMessage.value = ""
      this.myGameInstance.SendMessage("JSBridge", "SetRotationX", rotation);
    })
  }

  listen3(el) {
    el.addEventListener('click', () => {
      const intMessage = document.getElementById("jsonMessage3");
      var rotation = Number(intMessage.value);
      intMessage.value = ""
      this.myGameInstance.SendMessage("JSBridge", "SetRotationY", rotation);
    })
  }

  static get observedAttributes() {
    return ['bounds', 'target', 'rotation', 'camera',
      'rotationX', 'zoom', 'interactive', 'scene'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue != newValue){
      const functionName = `Set${name[0].toUpperCase()}${name.slice(1)}`
      console.log(functionName)
      if(this.myGameInstance){
        this.myGameInstance.SendMessage("JSBridge", functionName, newValue);
      }
    }
    else{
      console.log("Same old variable");
    }
  }
}

//define the class and use it
window.customElements.define('unity-comp', UnityComp)

document.querySelector('unity-comp').listen(document.getElementById('sendJson'))
document.querySelector('unity-comp').listen2(document.getElementById('jsonRotationX'))
document.querySelector('unity-comp').listen3(document.getElementById('jsonRotationY'))