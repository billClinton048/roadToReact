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

// useState hook
// const [searchTerm, setSearchTerm ] = React.useState("react")

// using the custom hook
const [searchTerm, setSearchTerm ] = useStorageState('search', 'react')



//react useEffect hook
 // React.useEffect(() => {
 //  localStorage.setItem(key , value) }, [value]);


// this is a callback function that is used to communcate with the search component
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
    <Search search = { searchTerm} onSearch = { handleSearch }/>
    <hr />
    <List list ={searchedStories} />

    </div>
    )
}

// The search component
const Search = ( props ) => {
// props destructing
  const {search, onSearch } = props;

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

  re>
      <label htmlFor = "search" > Search: </label>
    <input id= "search" value= {search} type="text" onChange= { onSearch } />

    <p> searching for <strong>{ props.searchTerm }</strong> </p>
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
const Item = ( { title, url, author, num_comments,points }) => (

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
