import {useLoaderData} from 'react-router-dom'

export default function UseLoaderHook() {
  const loaderData = useLoaderData();

  console.log(loaderData);

  console.log("UseLoaderHook Rendered");

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-header">
        <h1 className="h2">Use Loader Hook</h1>
      </div>
      <div className="card-body py-4 text-center">
        <img src={loaderData.url} width={500} height={500} />
      </div>
    </div>
  );
}

export const dogData= async () => {

  const response = await fetch('https://random.dog/woof.json');

  return await response.json();
}
