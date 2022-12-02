using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NodeDataScript : MonoBehaviour
{
    [Header("JSBridge")]
    public JSBridge jsBridge;

    private Camera myMainCamera;
    private Vector3 myObjectStartPosition, myMouseStartWorldPosition;

    [SerializeField] float radius = 1;

    private Transform _transform;
    new public Transform transform
    {
        get
        {
            return _transform ?? (_transform = GetComponent<Transform>());
        } 
    }

    private void OnMouseEnter()
    {
        //WebGLPluginJS.DisplayNodeData("Mouse Enter");

        //Trigger the mouse down output in the JS Bridge
        jsBridge.GetNodeHoverStart();
    }

    private void OnMouseExit()
    {
        WebGLPluginJS.DisplayNodeData("Mouse Exit");

        //Trigger the mouse down output in the JS Bridge
        jsBridge.GetNodeHoverStop();
    }

    private void OnMouseDown()
    {
        //WebGLPluginJS.DisplayNodeData("Mouse Down");

        //Trigger the mouse down output in the JS Bridge
        //jsBridge.GetNodeClick();

        //start rolling ball
        Vector3 lMousePosition = Input.mousePosition;
        myMouseStartWorldPosition = lMousePosition;
        myObjectStartPosition = transform.position;
    }

    private void OnMouseDrag()
    {
        //WebGLPluginJS.DisplayNodeData("Mouse Drag");

        //Trigger the mouse down output in the JS Bridge
        //jsBridge.GetNodeDrag();

        //rolling ball alg
        Vector3 lMousePosition = Input.mousePosition;

        Vector3 dr = lMousePosition - myMouseStartWorldPosition;

        Vector3 _n = new Vector3(-dr.y, dr.x, 0);

        _n = _n.normalized;

        this.transform.RotateAround(this.transform.position, _n, -dr.magnitude / radius);

        myMouseStartWorldPosition = lMousePosition;
    }
}
