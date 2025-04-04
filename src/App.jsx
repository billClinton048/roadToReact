import * as React from 'react'


const  App = () =>  {
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

const [searchTerm, setSearchTerm] = React.useState('');

// this is a callback function that is used to communcate with the search component
  const handleSearch = (event) => {
    // console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

// filtering the stories
  const searchedStories = stories.filter(function (story) {
   return story.title.toLowerCase().includes(searchTerm.toLowerCase())

  })
  console.log(searchedStories)

  return(
    <div>
    <h1>My Hacker Stories </h1>
    <Search  onSearch = { handleSearch }/>
    <hr />
    <List list ={searchedStories} />

    </div>
    )
}

// The search component
const Search = ( props ) => {

  // react useStates
  // const [searchTerm, setSearchTerm] = React.useState('')

// function to hundle the button
  const hundleClick = ()=> {
    console.log("button clicked ....")
  }

// function to hundle  react useState
  const handleChange = (event) => {
    // console.log(event)
    // value of the target
    setSearchTerm(event.target.value)
    // console.log(event.target.value)
  }

// sending the prop back to the App component
// props.onSearch(event)

  return(
    <div>
      <label htmlFor = "search" > Search: </label>
    <input id= "search" type="text" onChange= { props.onSearch } />

    <p> searching for <strong>{ props.searchTerm }</strong> </p>
    <button type = "button" onClick = {hundleClick}>
    event
    </button>
    </div>)

}

// List component
const List = ( props ) =>

    <ul>
      {
        props.list.map((item) => (
          <Item key= {item.objectId} item = {item} />
        ))}
      </ul>

// Item component
const Item = (props) => {

return (
   <li>
        <span>
        <a href= {props.item.url}> {props.item.title} </a>
        </span>
        <span> {props.item.author}</span>
        <span> { props.item.num_comments } </span>
        <span> { props.item.points } </span>
      </li>
      )
      };


export default App
