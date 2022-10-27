// Read more about creating JS plugins: https://www.patrykgalach.com/2020/04/27/unity-js-plugin/
// Creating functions for the Unity
mergeInto(LibraryManager.library, {

   DisplayNodeArray: function (nodeArr) {
      console.log(Pointer_stringify(nodeArr));
   },

   DisplayNodeData: function (str){
      console.log("Now displaying node data:");
      console.log(Pointer_stringify(str));
   },

   SendEvent: function (id, eventName, payload){
      _id=Pointer_stringify(id)
      const registry = window.UNITY_BODY_UI_REGISTRY || {};
      const instance = registry[_id];
      console.log(_id);
      console.log(instance);
      if(instance){
        const event = new CustomEvent(Pointer_stringify(eventName), { detail: payload});
        event.payload = event;
        instance.dispatchEvent(event);
        console.log("did we make it here");
      }
   }
});