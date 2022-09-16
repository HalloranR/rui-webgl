//custom class
var myGameInstance = null;

class UnityComp extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = this.template;
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
            <div id="unity-build-title">WebGL Test</div>
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
      var loaderUrl = buildUrl + "/Dev Build.loader.js";
      var config = {
        dataUrl: buildUrl + "/Dev Build.data",
        frameworkUrl: buildUrl + "/Dev Build.framework.js",
        codeUrl: buildUrl + "/Dev Build.wasm",
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
  
        canvas.style.width = "700px";
        canvas.style.height = "440px";
      }
  
      loadingBar.style.display = "block";
  
      var script = document.createElement("script");
      script.src = loaderUrl;
      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          myGameInstance = unityInstance;
          loadingBar.style.display = "none";
          fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
        }).catch((message) => {
          alert(message);
        });
      };
      root.appendChild(script);
    }

    listen(el) {
      el.addEventListener('click', function (){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://ccf-api.hubmapconsortium.org/v1/scene", false ); // false for synchronous request
        xmlHttp.send( null );
        var jsonString = xmlHttp.responseText

        console.log("Here");

        myGameInstance.SendMessage("JSBridge", "SetScene", jsonString);
      })
    }
  }

//define the class and use it
window.customElements.define('unity-comp', UnityComp)
  
document.querySelector('unity-comp').listen(document.getElementById('sendJson'))
  
