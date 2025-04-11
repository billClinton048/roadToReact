import * as React from 'react'
import'./App.css';


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
    <div className = "container">
    <h1 className = "headline-primary">My Hacker Stories </h1>
    <InputWithLabel id= "search" label= "Search" value= {searchTerm} onInputChange = { handleSearch }>
    <strong> Search: </strong>
    </InputWithLabel>
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
      <label htmlFor = {id} clssName = "label">{ children } </label>
&nbsp;
    <input id={id} value= { value} type= { type} ref = {inputRef} onChange= { onInputChange } className = "input" />

    <p> searching for <strong>{}</strong> </p>
    <button type = "button" onClick = {hundleClick}>
    Submit
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
   <li className =  "item">
        <span style = {{ width: '40%'}}>
        <a href= {item.url}> {item.title} </a>
        </span>
        <span style = {{ width: '30%'}} > {item.author}</span>
        <span style = {{ width: '10%'}} > { item.num_comments } </span>
        <span style = {{ width: '10%'}} > { item.points } </span>
        <span style = {{ width: '10%'}} >
        <button type = 'button' onClick = {() => onRemoveItem(item)} className="button button_small" > Dismiss</button>
        </span>
      </li>

      );
}


export default App
