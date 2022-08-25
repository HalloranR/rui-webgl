using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JSBridge : MonoBehaviour
{
    [SerializeField] private DataManager dataManager;

    public void RecieveMessageFromHTML(string webStr)
    {
        WebGLPluginJS.DisplayNodeData("Start");

        NodeArray nodeArray = dataManager.Deserialize(webStr);

        //WebGLPluginJS.DisplayNodeArray(nodeArray);

        WebGLPluginJS.DisplayNodeData("Marshal Error?");
    }
}
