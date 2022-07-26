# Unity Addressable 소스코드 및 서버설정
## 환경은 다음과 같습니다
### 서버: Node.JS
<a href="https://nodejs.org/ko/">Node.JS 다운로드</a>
___
### 서버 설정방법
1. NodeJS설치
2. 다운로드 받으신 폴더에 CMD창 킨 이후 cd Server 입력 이후 ```npm install``` or ```npm i```
3. npm run start하면 서버가 켜집니다(Express, 서버에서 사용하는 포트번호는 4000번 입니다.)   


___
## Unity Code Review
___
1. Scripts/AddressablesLoader.cs
```cs
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.AddressableAssets;

public static class AddressablesLoader // 네트워크 통신을 이용하기 때문에 비동기처리를 해줍니다(유의!)
{
	public static async Task InitAssets<T>(string label, List<T> createdObjs, Transform parent)
		where T : Object // 서버에서 Addressable의 Asset들을 가져오는 코드입니다.
        // AssetBundle → Addressable → Asset(Label)
	{
		var locations = await Addressables.LoadResourceLocationsAsync(label).Task; // 설정하신 Label들의 위치를 가져옵니다. 

		foreach (var location in locations)
		{
			createdObjs.Add(await Addressables.InstantiateAsync(location, parent).Task as T); // 해당 오브젝트를 추가합니다(Addressable에서 가져온 Asset을 Instantiate(실체화))
            // (location → 위치반환), (parent → 회전(회전에 대한 설정은 없음))
		}
	}
}
```
2. Scripts/AddressablesController.cs  
```cs
using System.Collections.Generic;
using UnityEngine;

public class AddressablesController : MonoBehaviour
{
	[SerializeField]
	private string _label;
	private Transform _parent;
	private List<GameObject> _createdObjs { get; } = new List<GameObject>();

	private void Start()
	{
		_parent = GameObject.Find("GameObject").transform;
		Instantiate(); // 실체화(AddresableLoader에 저장한 createdObjs들을 실체화)
	}

	private async void Instantiate()
	{
		await AddressablesLoader.InitAssets(_label, _createdObjs, _parent); // AddressableLoader.cs 참조
	}
}

```
## p.s)
- Server/app.js를 확인해주세여