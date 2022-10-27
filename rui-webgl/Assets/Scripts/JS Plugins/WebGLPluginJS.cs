using UnityEngine;
using System.Runtime.InteropServices;

/// <summary>
/// Class with a JS Plugin functions for WebGL.
/// </summary>
public class WebGLPluginJS : MonoBehaviour {

    // Importing "CallFunction"
    [DllImport("__Internal")]
    public static extern void DisplayNodeArray(NodeArray nodeArr);

    [DllImport("__Internal")]
    public static extern void DisplayNodeData(string str);

    [DllImport("__Internal")]
    public static extern void SendEvent(string _id, string eventName, string jsonP);
}
