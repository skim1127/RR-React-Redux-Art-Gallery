import './App.css';
// import Nav from './components/Nav'
// import ContentWrapper from './components/ContentWrapper'
// import Footer from './components/Footer'
import { useSelector, useDispatch, connect } from 'react-redux'
import { clearData, fetchData, incrementId, decrementId, inputId } from './features/dataSlice'
import { useEffect } from 'react';

const mapStateToProps = (state)=> ({
  objectId: state.data.objectId
})

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId], dispatch)

  // render image function
  const renderImg = () => {
    if (data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>No image</p>
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
      </div>
      <input value={ data.objectId } onChange={(e) => {
        dispatch(inputId(Number(e.target.value)))
      }} />
      <div>
        <h1>{data.objectId}</h1>
        {renderImg()}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
