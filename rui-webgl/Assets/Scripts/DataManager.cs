using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using UnityEngine.Networking;
using System.Threading.Tasks;

public class DataManager : MonoBehaviour
{
    private NodeArray _nodeArray;

    public NodeArray Deserialize(string str)
    {
        Debug.Log(str);
        //format the string
        var text = str
        .Replace("@id", "jsonLdId")
        .Replace("@type", "jsonLdType")
        .Replace("\"object\":", "\"glbObject\":");

        //convert to json
        _nodeArray = JsonUtility.FromJson<NodeArray>(
        "{ \"nodes\":" +
        text
        + "}"
        );

        Debug.Log(_nodeArray);

        return _nodeArray;
    }
}

[Serializable]
public class NodeArray
{
    [SerializeField] public Node[] nodes;
}

[Serializable]
public class Node
{
    public string jsonLdId;
    public string jsonLdType;
    public string entityId;

    public string[] ccf_annotations;
    public string representation_of;
    public string reference_organ;
    public bool unpickable;
    public bool wireframe;
    public bool _lighting;
    public string scenegraph;
    public string scenegraphNode;
    public bool zoomBasedOpacity;
    public bool zoomToOnLoad;
    public int[] color;
    public float opacity;
    public float[] transformMatrix;
    public string name;
    public string tooltip;
    public float priority;

    public int rui_rank;
    public GLBObject glbObject; //for reference organs
    public string sex; //for reference organs
}

[Serializable]
public class GLBObject
{
    public string id;
    public string file;
}
