import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash,FaPen } from 'react-icons/fa';
import './Projects.css'
import searchImg from '../../Images/search.jpg'
const Projects = () => {
  // {to run the server we need to type this command : "npx json-server --watch db.json --port 4000" in this path "\Kaarvens-structural-consultancy\Projects-API">}
  const [projects, setProjects] = useState([]);
  // Fetch projects from API
  function getProjects() {
    fetch('http://localhost:4000/projects')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => alert('Unable to get data'));
  }

  useEffect(getProjects, []);

  function TableHead() {
    return (
      <thead className='tablehead'>
        <tr>
          <th>Id</th>
          <th>Job No</th>
          <th>Project Name</th>
          <th>Architect Name</th>
          <th>Site Location</th>
          <th>Drawings</th>
          <th>Drawing Status</th>
          <th>Revision</th>
          <th>Action</th>
        </tr>
      </thead>
    )
  }
  function TableBody() {
    return (
      <tbody className='tablebody'>
        {projects.map((project, index) => (
          project.drawings.map((drawing, dIndex) => (
            <tr className='trow' key={`${index}-${dIndex}`}>
              {/* Display project details only on the first row of each project's drawings */}
              <td>{dIndex === 0 ? project.id : ''}</td>
              <td>{dIndex === 0 ? project['job-no'] : ''}</td>
              <td>{dIndex === 0 ? project['project-name'] : ''}</td>
              <td>{dIndex === 0 ? project['architect-name'] : ''}</td>
              <td>{dIndex === 0 ? (project['site-location'] || '-') : ''}</td>
              <td>{drawing['drawing-name']}</td>
              <td>{drawing['drawing-status']}</td>
              <td>{drawing.revision || '-'}</td>
              <td>
              <FaTrash/>
              <FaPen/>
              </td>
            </tr>
          ))
        ))}
      </tbody>
    )
  }

  return (
    <div className='project-container'>
      <h2>Projects</h2>
      <div className='project-header'>
        
          <Link to="">Create Product</Link>
          <button onClick={getProjects}>Refresh</button>
          <div className='search-box'>
          <input type='text' placeholder='Search' />
          <img src={searchImg} alt="Search img"  />
          </div>    
        
      </div>
      <table className='project-body'>
          <TableHead/>
          <TableBody/>
      </table>
    </div>
  );
};

export default Projects;
