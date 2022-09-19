// Read more about creating JS plugins: https://www.patrykgalach.com/2020/04/27/unity-js-plugin/
// Creating functions for the Unity
mergeInto(LibraryManager.library, {

   DisplayNodeArray: function (nodeArr) {
      console.log(Pointer_stringify(nodeArr));
   },

   DisplayNodeData: function (str)v{
   console.log("Now displaying node data:");
      console.log(Pointer_stringify(str));
   }


    GetInitialized: function () {

    }


    GetNodeClick: function () {

    }


    GetNodeDrag: function () {

    }


    GetNodeHoverStart: function () {

    }


    GetNodeHoverStop: function () {

    }


    GetRotationChange: function () {

    }
});