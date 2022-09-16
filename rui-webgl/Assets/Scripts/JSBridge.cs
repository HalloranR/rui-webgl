using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JSBridge : MonoBehaviour
{
    [SerializeField] private DataManager dataManager;
    [SerializeField] private SceneSetter sceneSetter;

    public void SetScene(string webStr)
    {
        WebGLPluginJS.DisplayNodeData("Start");

        NodeArray nodeArray = dataManager.Deserialize(webStr);

        WebGLPluginJS.DisplayNodeData("Marshal Error?");

        //WebGLPluginJS.DisplayNodeArray(nodeArray);
    }

    public void SetRotationX(float rotationX)
    {
        sceneSetter.SetCameraRotationX(rotationX);
    }

    public void SetRotationY(float rotationY)
    {
        sceneSetter.SetCameraRotationY(rotationY);
    }

    public void SetZoom(float zoom)
    {
        sceneSetter.SetCameraZoom(zoom);
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
