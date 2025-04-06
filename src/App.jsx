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


// custom hook
const useStorageState = ( key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem( key) || initialState );

  React.useEffect(() => {
  localStorage.setItem(key , value) }, [value]);

return[ value, setValue];
}

// using the custom hook
const [searchTerm, setSearchTerm ] = useStorageState('search', 'react')


// this is a callback function
  const handleSearch = (event) => {
    // console.log(event.target.value)
    setSearchTerm(event.target.value)

  }

// filtering the stories
  const searchedStories = stories.filter(function (story) {
   return story.title.toLowerCase().includes(searchTerm.toLowerCase())

  })

  return(
    <div>
    <h1>My Hacker Stories </h1>
    <InputWithLabel id= "search" label= "Search" value= {searchTerm} onInputChange = { handleSearch }>
    <strong> Search: </strong>
    </InputWithLabel>
    <hr />
    <List list ={searchedStories} />

    </div>
    )
}

// The search component
const InputWithLabel = ( { id, label, type= "text", value, isFocused, onInputChange, children} ) => {

  const inputRef = React.useRef();

React.useEffect (() => {
if( isFocused && inputRef.current ){
  inputRef.current.focus()

}
}, [ isFocused ])

// function to hundle the button
  const hundleClick = ()=> {
    console.log("button clicked ....")
  }

  return(
    <>
      <label htmlFor = {id} >{ children } </label>
&nbsp;
    <input id={id} value= { value} type= { type} ref = {inputRef} onChange= { onInputChange } />

    <p> searching for <strong>{}</strong> </p>
    <button type = "button" onClick = {hundleClick}>
    event
    </button>
    </>)

}

// List component
const List = ( { list } ) =>

    <ul>
      {
        list.map(( {objectId, ...item}) => (
          <Item key= {objectId}  {...item} />
        ))}
      </ul>

// Item component
const Item = ( { title, url, author, num_comments, points }) => (

   <li>
        <span>
        <a href= {url}> {title} </a>
        </span>
        <span> {author}</span>
        <span> { num_comments } </span>
        <span> { points } </span>
      </li>

      );


export default App
