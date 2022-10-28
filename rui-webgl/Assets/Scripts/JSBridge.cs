using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JSBridge : MonoBehaviour
{
    [SerializeField] private SceneSetter sceneSetter;

    private string id = "placeHolder";

                //Initial Setter\\
    public void SetInstance(string _id)
    {
        id = _id;
    }

                //Inputs\\
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

    //public void SetCamera(string camera)
    //{

    //}

    public void SetInteractivity(bool _interactive)
    {

    }


                //Outputs\\
    public void GetInitialized()
    {
        //WebGLPluginJS.SendEvent(id, "initialized", null);
    }


    public void GetRotationChange(float x, float y)
    {
        WebGLPluginJS.DisplayNodeData("Do we get to rotation change");
        WebGLPluginJS.SendEvent(id, "rotationChange", "test");
    }

    public void GetZoomChange(float _zoom)
    {
        WebGLPluginJS.SendEvent(id, "zoom", _zoom.ToString());
    }
}
