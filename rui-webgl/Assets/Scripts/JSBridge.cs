using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JSBridge : MonoBehaviour
{
    private DataManager dataManager;

    public void RecieveMessageFromHTML(string webStr)
    {
        NodeArray nodeArray = dataManager.Deserialize(webStr);

        WebGLPluginJS.DisplayNodeArray(nodeArray);
    }
}
