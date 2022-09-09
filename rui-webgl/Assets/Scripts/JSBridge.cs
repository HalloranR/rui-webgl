using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JSBridge : MonoBehaviour
{
    [SerializeField] private DataManager dataManager;

    public void SetScene(string webStr)
    {
        WebGLPluginJS.DisplayNodeData("Start");

        NodeArray nodeArray = dataManager.Deserialize(webStr);

        WebGLPluginJS.DisplayNodeData("Marshal Error?");

        //WebGLPluginJS.DisplayNodeArray(nodeArray);
    }



    public void SetRotationY(float rotationY)
    {

    }

    public void SetRotationX(float rotationX)
    {

    }

    public void SetZoom(float zoom)
    {

    }

    public void SetTarget(int value)
    {

    }

    public void SetBounds(Vector3 xyz)
    {

    }

    public void SetCamera(string camera)
    {

    }

    public void SetInteractivity(bool _interactive)
    {

    }
}
