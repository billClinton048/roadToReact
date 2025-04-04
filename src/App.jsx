const stories = [
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
const  App = () =>  {
  return(
    <div>
    <h1>My Hacker Stories </h1>
    <Search />
    <hr />
    <List list ={ stories} />

    </div>
    )
}

const Search = () => {
  const hundleClick = ()=> {
    console.log("button clicked ....")
  }
  const handleChange = (event) => {
    console.log(event)
    // value of the target
    console.log(event.target.value)
  }
  return(
    <div>
      <label htmlFor = "search" > Search: </label>
    <input id= "search" type="text" onChange= {handleChange} />
    <button type = "button" onClick = {hundleClick}>
    event
    </button>
    </div>)

}

const List = ( props ) =>
    <ul>
      {
        props.list.map((item) => (
          <Item key= {item.objectId} item = {item} />
        ))}
      </ul>

          const Item = (props) => (

          <li>
        <span>
        <a href= {props.item.url}> {props.item.title} </a>
        </span>
        <span> {props.item.author}</span>
        <span> { props.item.num_comments } </span>
        <span> { props.item.points } </span>
      </li>
      );
export default App
