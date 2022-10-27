using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Threading.Tasks;
using UnityEngine.Networking;

public class SceneBuilder : MonoBehaviour
{
    public delegate void SceneBuilt();
    public static event SceneBuilt OnSceneBuilt;
    public List<GameObject> TissueBlocks;
    public List<GameObject> Organs;
    public List<string> MaleEntityIds;
    public List<string> FemaleEntityIds;

    [SerializeField] private SceneConfiguration sceneConfiguration;
    [SerializeField] private GameObject preTissueBlock;
    [SerializeField] private DataFetcher dataFetcher;
    [SerializeField] private NodeArray nodeArray;
    [SerializeField] private GameObject loaderParent;

    private int modelsLoaded;
    private int numberOfHubmapIds;
    public int NumberOfHubmapIds
    {
        get { return numberOfHubmapIds; }
    }

    //driver code 
    private async void Start()
    {
        sceneConfiguration = GetComponent<SceneConfiguration>();
        await GetNodes(sceneConfiguration.BuildUrl());
        await GetOrgans();
    }

    public async Task GetNodes(string url)
    {
        DataFetcher httpClient = dataFetcher;
        nodeArray = await httpClient.Get(url);
    }

    public async Task GetOrgans()
    {
        List<Task<GameObject>> tasks = new List<Task<GameObject>>();
        List<GameObject> loaders = new List<GameObject>();
        Dictionary<GameObject, Node> dict = new Dictionary<GameObject, Node>();

        foreach (var node in nodeArray.nodes)
        {
            if (node.scenegraph == null) break;
            GameObject g = new GameObject()
            {
                name = "Loader"
            };
            g.AddComponent<ModelLoader>();
            loaders.Add(g);
            g.transform.parent = loaderParent.transform;
            Task<GameObject> t = g.GetComponent<ModelLoader>().GetModel(node.scenegraph);
            tasks.Add(t);
        }

        await Task.WhenAll(tasks);

        Debug.Log("Scene has been loaded");
    }


    private async Task<HubmapIdHolder> Get(string url, HubmapIdHolder response)
    {
        try
        {
            using var www = UnityWebRequest.Get(url);
            var operation = www.SendWebRequest();

            while (!operation.isDone)
                await Task.Yield();

            if (www.result != UnityWebRequest.Result.Success)
                Debug.LogError($"Failed: {www.error}");

            var result = www.downloadHandler.text;

            var text = www.downloadHandler.text;
            response = JsonUtility.FromJson<HubmapIdHolder>(text);
            return response;
        }
        catch (Exception ex)
        {
            Debug.LogError($"{nameof(Get)} failed: {ex.Message}");
            return default;
        }
    }


    private class HubmapIdArray
    {
        [SerializeField] public HubmapIdHolder[] hubmapIdHolder;
    }

    private class HubmapIdHolder
    {
        public string hubmap_id;
    }

}