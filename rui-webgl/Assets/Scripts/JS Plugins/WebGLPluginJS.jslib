// Read more about creating JS plugins: https://www.patrykgalach.com/2020/04/27/unity-js-plugin/
// Creating functions for the Unity
mergeInto(LibraryManager.library, {

   DisplayNodeArray: function (nodeArr) {
      console.log(nodeArr);
   }
});