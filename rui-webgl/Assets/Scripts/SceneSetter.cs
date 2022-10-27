using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneSetter : MonoBehaviour
{
    [Header("Camera")]
    public Camera cam;
    public GameObject camObject;

    public JSBridge jsBridge;

    public void SetCameraRotationX(float xRotation)
    {
        camObject.transform.Rotate(new Vector3(xRotation, cam.transform.rotation.y, cam.transform.rotation.z));

        jsBridge.GetRotationChange(cam.transform.rotation.x, cam.transform.rotation.y);
    }

    public void SetCameraRotationY(float yRotation)
    {
        camObject.transform.Rotate(new Vector3(cam.transform.rotation.x, yRotation, cam.transform.rotation.z));

        jsBridge.GetRotationChange(cam.transform.rotation.x, cam.transform.rotation.y);
    }

    public void SetCameraZoom(float zoom)
    {
        cam.fieldOfView = zoom;

        jsBridge.GetZoomChange(cam.fieldOfView);
    }
}
