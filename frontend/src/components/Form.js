import React, { useState, useEffect } from 'react'
import APIService from './APIService';

const Form = ({article, update, insert}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  useEffect(()=> {
      setTitle(article.title);
      setBody(article.body);
    }, [article])
  const updateArticle = () => {
    APIService.updateArticle(article.id, {title, body})
    .then(resp => update(resp))
    .catch(error => console.log(error))
  }
  const insertArticle = () => {
    APIService.insertArticle({title, body})
    .then(resp => insert(resp))
    .catch(error => console.log(error))
  }
  return (
    <div>
      {article ? (
        <div className ="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control"
          placeholder="Please Enter Title"
          value={title} onChange={(e)=>setTitle(e.target.value)}
          />
          <label htmlFor="body" className="form-label">Description</label>
          <textarea type="text" className="form-control"
          placeholder="Please Enter Description"
          value={body} onChange={(e)=>setBody(e.target.value)}
          />
          {
            article.id? <button className="btn btn-success mt-3"
            onClick = {updateArticle}>Update</button>
            : <button className="btn btn-success mt-3"
            onClick = {insertArticle}>Insert</button>
          }


        </div>
      ): null
      }
    </div>
  )
}

export default Form