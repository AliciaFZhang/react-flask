import './App.css';
import { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form'

function App() {
  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticle] = useState(null)
  useEffect(()=>{
    fetch('http://localhost:5000/get', {
        'methods': 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))
  },[])
  const edit = (article)=> {
    setEditedArticle(article)
  }
  const update = (article) => {
    const new_article = articles.map(my_article => {
      if (my_article.id === article.id) {
        return article
      } else {
        return my_article
      }
    })
    setArticles(new_article);
  }
  const insert = (article) => {
    const new_articles = [...articles, article];
    setArticles(new_articles)
  }

  const deleteA = (id) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id === id) {
        return false;
      }
      return true;
    })
    setArticles(new_articles);
  }
  const openForm = () => {
    setEditedArticle({title:'', body: ''})
  }
  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>Flask and ReactJS Course</h1>
        </div>
        <div className="col">
          <button className="btn btn-success"
          onClick = {openForm}>Insert Form</button>
        </div>
      </div>
      <ArticleList articles={articles} edit={edit} deleteA={deleteA}/>
      {editedArticle? <Form article={editedArticle} update= {update} insert={insert}/>: null}

    </div>
  );
}

export default App;
