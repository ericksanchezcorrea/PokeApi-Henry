

export default async function useFetch (url) {

  const data =  await fetch(url)

  return data


}
