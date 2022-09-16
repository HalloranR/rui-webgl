using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TestScript : MonoBehaviour
{
    public JSBridge script;

    public int rotationX;
    public int rotationY;

    private void Start()
    {
        script.SetRotationX(rotationX);
        script.SetRotationY(rotationY);
    }
}
