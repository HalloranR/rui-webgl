using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneSetter : MonoBehaviour
{
    [Header("Camera")]
    public Camera cam;
    public GameObject camObject;

    public bool interactivity = true;

    public void SetCameraRotationX(float xRotation)
    {
        camObject.transform.Rotate(new Vector3(xRotation, cam.transform.rotation.y, cam.transform.rotation.z));
    }

    public void SetCameraRotationY(float yRotation)
    {
        camObject.transform.Rotate(new Vector3(cam.transform.rotation.x, yRotation, cam.transform.rotation.z));
    }

    public void SetCameraZoom(float zoom)
    {
        cam.fieldOfView = zoom;
    }

    public void SetIneteractivity(bool _interactivity)
    {
        interactivity = _interactivity;
    }
}
