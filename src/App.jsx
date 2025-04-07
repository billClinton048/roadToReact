import * as React from 'react'


const  App = () =>  {
  const intialStories = [
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

// reactive stories
const [stories, setStories] = React.useState([]);
const [isLoading, setIsLoading] = React.useState(false)
const [isError, setIsError] = React.useState(false)

// Handler function
const handleRemoveStory= ( item ) => {
  const newStories = stories.filter(
    (story) => item.objectId != story.objectId );
 setStories(newStories)
}

// Asychronous
const getAsyncStories = () =>
new Promise((resolve) =>
  setTimeout(()=>resolve({data: {stories: intialStories}}), 2000 )
  )

React.useEffect(() => {
setIsLoading(true);

getAsyncStories().then(result=> {
setStories(result.data.stories);
setIsLoading(false)
})
.catch(() => setIsError(true));

}, []);

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
    {isError &&  <p> Something went wrong ...</p>}
    {isLoading ? (<p>Loading ...</p>):
     (  <List list ={searchedStories} onRemoveItem = {handleRemoveStory} /> )}


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
const List = ( { list, onRemoveItem} ) =>

    <ul>
      {
        list.map((item) => (
          <Item key= {item.objectId}  item = {item} onRemoveItem= {onRemoveItem} />
        ))}
      </ul>

// Item component
const Item = ( { item, onRemoveItem}) =>{
//   const handleRemoveItem = () =>{
// onRemoveItem(item);
//   }
return (
   <li>
        <span>
        <a href= {item.url}> {item.title} </a>
        </span>
        <span> {item.author}</span>
        <span> { item.num_comments } </span>
        <span> { item.points } </span>
        <span>
        <button type = 'button' onClick = {() => onRemoveItem(item)} > Dismiss</button>
        </span>
      </li>

      );
}


export default App
