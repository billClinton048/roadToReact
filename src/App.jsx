const list = [
  {
title: "React",
url: "https://react.org",
author:"Clinton Karanja",
num_comments: 3,
points: 4,
objectId: 0,
  },
  {
title: "Redux",
url: "https://react.org",
author:"Mwangi Clinton",
num_comments: 2,
points: 5,
objectId: 1,

  }
]
function App(){
  return(
    <div>
    <h1>My Hacker Stories </h1>
    <Search />
    <hr />
    <List />

    </div>
    )
}

function Search(){
  return(
    <div>
      <label htmlFor = "search" > Search: </label>
    <input id= "search" type="text" />
    </div>)

}

function List(){
  return(
    <ul>
      {
        list.map(function (item){
          return(
          <li key={item.objectId}>
        <span>
        <a href= {item.url}> {item.title} </a>
        </span>
        <span> {item.author}</span>
        <span> { item.num_comments } </span>
        <span> { item.points } </span>
      </li>
      )
        })

      }
    </ul>)

}
export default App
